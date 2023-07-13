const winston = require('winston')
require('winston-daily-rotate-file');
const { createLogger, transports, format } = winston;

const transactionOption = new winston.transports.DailyRotateFile({         
    filename: './logs/transactions/transaction-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    //maxFiles: '1d',
    level: 'info',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    ),
  });

  const userOption = new winston.transports.DailyRotateFile({         
    filename: './logs/users/user-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    //maxFiles: '365d',
    level: 'info',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    ),
  });

  const errorOption = new winston.transports.DailyRotateFile({         
    filename: './logs/errors/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    //maxFiles: '1d',
    level: 'info',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    ),
  });


const errorLog = createLogger({
    transports: [
       errorOption  
    ]
})

const transLog = createLogger({
    transports: [
        transactionOption           
    ]
})

const userLog = createLogger({
    transports: [
        userOption    
    ]
})

module.exports = {
 errorLog,
 transLog,
 userLog      
}    
