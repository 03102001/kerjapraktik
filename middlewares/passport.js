const employeeServices = require('../Services/HrEmployeeServices');
const config = require('../config/wtdms.config');
const { Strategy, ExtractJwt } = require('passport-jwt');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
};

module.exports = (passport) => {  
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await employeeServices
        .getAuth(payload.payload.EmployeeID)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(null, false);
        });
    })
  );
};
