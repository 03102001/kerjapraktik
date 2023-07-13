let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let db = require('./models');
let app = express();
let cookieParser = require('cookie-parser');
let Routes = require('./routes/Route');
let passport = require('passport');
let helmet = require('helmet');
let fs = require('fs');
let https = require('https');
let path = require('path');

const corsOptions = {  
  origin: ['http://localhost:3003','http://172.16.3.136:3000','https://172.16.3.136:8082', 'https://localhost:8082', 'http://localhost:8003', 'https://dwsqa.globalnet.lcl:8083', 'https://dwsqa.globalnet.lcl:8002', 'https://172.16.3.136:8001', 'http://dwsqa.globalnet.lcl:8002', 'http://dwsqa.globalnet.lcl:8083', 'http://172.16.3.136:8001', 'http://172.20.63.211:3003'],
  methods: 'GET,PUT,POST,DELETE',
  // preflightContinue: false,
  // optionsSuccessStatus: 200,
  //optionsSuccessStatus": 204
  //Access-Control-Allow-Origin: "https://localhost:3001",
  //Access-Control-Allow-Credentials: true,
  //credentials: true
  //origin: "http://localhost:8002",
};

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

let ciphers = [
  'ECDHE-RSA-AES128-GCM-SHA256',
  'ECDHE-ECDSA-AES128-GCM-SHA256',
  'ECDHE-RSA-AES256-GCM-SHA384',
  'ECDHE-ECDSA-AES256-GCM-SHA384',
  'DHE-RSA-AES128-GCM-SHA256',
  'DHE-DSS-AES128-GCM-SHA256',
  'ECDHE-RSA-AES128-SHA256',
  'ECDHE-ECDSA-AES128-SHA256',
  'ECDHE-RSA-AES128-SHA',
  'ECDHE-ECDSA-AES128-SHA',
  'ECDHE-RSA-AES256-SHA384',
  'ECDHE-ECDSA-AES256-SHA384',
  'ECDHE-RSA-AES256-SHA',
  'ECDHE-ECDSA-AES256-SHA',
  'DHE-RSA-AES128-SHA256',
  'DHE-RSA-AES128-SHA',
  'DHE-DSS-AES128-SHA256',
  'DHE-RSA-AES256-SHA256',
  'DHE-DSS-AES256-SHA',
  'DHE-RSAAES256-SHA',
  '!aNULL',
  '!eNULL',
  '!EXPORT',
  '!DES',
  '!RC4',
  '!3DES',
  '!MD5',
  '!PSK'].join(':');

  const sslOptions = {
    secureProtocol: "TLSv1_2_method",
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'dwsqa.pem')),
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'dwsqa_key.pem')),
    ciphers: ciphers,
    honorCipherOrder: true,
    //rejectUnauthorized: false,
    //cert: fs.readFileSync('./ssl/cert.pem'),
    //key: fs.readFileSync('./ssl/key.pem')
  };
  
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

require('./middlewares/passport')(passport);
require('dotenv').config();

app.use(function(req, res, next) {
  res.setHeader('X-Frame-Options', 'sameorigin');
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self';");
  next();
});

app.use('/getFirstConnection', (req, res, next) => {
  res.set('Content-Type', 'text/html');
  res.send('<a href="javascript:history.back()">Go Back</a>');
  next();
})

app.use(Routes);

const PORT = process.env.PORT || 8002;
//db.sequelize.sync({ alter: true }).then(() => {  
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: https://localhost:${PORT}`);
  });

  https.createServer(sslOptions, app).listen(8089);
 //http.createServer(app).listen(8099);

});
