const util = require("util");
const multer = require("multer");


const storageEngine = multer.diskStorage({
  destination: "E:/DWS/Input",
  
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
}
);

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 8000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const path = require("path");

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|csv/; //check extension names

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Csv!!");
  }
};

module.exports = {
  upload,storageEngine,checkFileType
};
