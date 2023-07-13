const db = require("../models");
const { QueryTypes } = require("sequelize");
const upload = require("../middlewares/upload");


exports.upload = async (req, res) => {
  
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400      
  }
  
  req.url.split('/')
  const splitUrl = req.url.split('/');
	console.log('splitUrl', splitUrl)

	const objUrl = {...splitUrl}
	console.log('objUrl==>', objUrl)
	const services = objUrl[2].toLowerCase()
	console.log('services==>', services)
	const finder = objUrl[3]
	console.log('finder==>', finder)
	const param = objUrl[4]	
	console.log('param==>', param)

  const filepath = req.file.path
  const filedata = req.body
  console.log("file: InvUploadController.js:27 ~ exports.upload= ~ filedata:", filedata)
  console.log("file: InvUploadController.js:7 ~ exports.upload= ~ filepath:", filepath)
  console.log("file: InvUploadController.js:30 ~ exports.upload= ~ param:", param)

  res.send(file)
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const { execFile } = require('node:child_process');
exports.uploadCreate = async (req, res) => {
  
  const file = req.file
  console.log("file: InvUploadController.js:43 ~ exports.uploadCreate= ~ req.file:", req.file)
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400      
  }
  
  req.url.split('/')
  const splitUrl = req.url.split('/');
	console.log('splitUrl', splitUrl)

	const objUrl = {...splitUrl}
	console.log('objUrl==>', objUrl)
	const services = objUrl[2].toLowerCase()
	console.log('services==>', services)
	const finder = objUrl[3]
	console.log('finder==>', finder)

  //const filepath = file.path
  const filedata = req.body
  console.log("file: InvUpload filedata:", filedata)
  
  //service.createPic(filedata, filepath)
  //console.log("file: InvUploadController.js:63 ~ exports.uploadCreate= ~ filepath:", filepath)
  res.send(file)
};



  exports.download = (req, res) => {
    var fs = require('fs');       
    const directoryPath = "E:/DWS/Output/";

    let rawdata = fs.readFileSync("E:/DWS/Output/download.txt");
    let fileName = JSON.parse(rawdata)   
    console.log("directoryPath:", directoryPath + fileName)
  
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  };

  