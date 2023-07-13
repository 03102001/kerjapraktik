const { transLog, userLog} = require('../utils/logger');
const config = require('../config/wtdms.config');


const wtdmsTransLog = (req, res, next) => {
  //console.log(req.body);

  //if (config.environment === "production" || config.environment === "test"){
    if(req.method == "GET") {
      transLog.info(`${req.url} - ${req.method} - ${req.user[0].UserName} - ${req.ip}`);
    }
    else if(req.method == "POST"){
      transLog.info(`${req.url} - ${req.method} - ${req.user[0].UserName} - ${req.ip} - ${JSON.stringify(req.body)}`);
    }
    else if(req.method == "PUT") {
      transLog.info(`${req.url} - ${req.method} - ${req.user[0].UserName} - ${req.ip} - ${JSON.stringify(req.body)}`);
    }
    else if(req.method == "DELETE") {
      transLog.info(`${req.url} - ${req.method} - ${req.user[0].UserName} - ${req.ip} - ${JSON.stringify(req.body)}`);
    }
  //}

  next();    
}

const wtdmsUserLog = (req, res, next) => {
  //if (config.environment === "production" || config.environment === "test"){
    userLog.info(`${req.url} - ${req.method} - ${req.body.UserName} - ${req.ip}`);
  //}
  
  next();   
}

// const wtdmsErrorLog = (req, res, next) => {
//   errorLog.info(`${req.url} - ${req.method} - ${req.body.UserName}`);
//   next();   
// }

module.exports = {
  wtdmsTransLog,
  wtdmsUserLog,
  //wtdmsErrorLog
};
