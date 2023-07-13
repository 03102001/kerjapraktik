/*const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const config = require('../config/wtdms.config');
const { errorLog, transLog } = require('../utils/logger');


const transporter = nodemailer.createTransport({
    // host: 'kercasarr01',
    // port: 25,
    host: config.smtp_server,
    port: config.smtp_port,
    secure: false,
    tls: { rejectUnauthorized: false },
    transactionLog: false,
    debug: false,
    // auth: {
    //   user: '', // ethereal user
    //   pass: '', // ethereal password
    // },
});

const options = {
    viewEngine: {   
      partialsDir: "./templates/email/partials",
      layoutsDir: "./templates/email/layouts",
      extname: ".hbs"
    },
    extName: ".hbs",
    viewPath: "templates/email"
  };

transporter.use("compile", hbs(options));

exports.sendMail = async (to, cc, subject, templates, context) => {
    
    const mailOptions = {
        from: config.from_email, 
        to: to,
        cc: cc,
        subject: subject,
        template: templates,        
        context
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            if (config.debug) console.log("sent email error: ", error);
            if (config.debug) errorLog.error(`sent email error ${error}`);            
        } else {
            if (config.debug) console.log('Email sent to: ' + info.envelope.to + ' - ' + info.response);
            if (config.debug) transLog.info(`Email sent to ${info.envelope.to} - ${info.response}`);
        }
    });
}
*/