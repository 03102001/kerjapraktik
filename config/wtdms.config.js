require('dotenv').config();

module.exports = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  secret: process.env.SECRET,
  encrypt_key: process.env.ENCRYPT_KEY,
  url_ldap: process.env.URL_LDAP,
  smtp_server: process.env.SMTP_SERVER,
  smtp_port: process.env.SMTP_PORT,
  from_email: process.env.FROM_EMAIL,
  percentage_tolerance_truck_allocation: process.env.TOLERANCE_TRUCK_ALLOCATION,
  domain: process.env.DOMAIN,
  dispatcher_email: process.env.DISPATCHER_EMAIL,
  cc_email: {
    WOOD: process.env.CC_EMAIL_WOOD,
    PULP : process.env.CC_EMAIL_PULP
  },  
  debug: Boolean(true)
};


