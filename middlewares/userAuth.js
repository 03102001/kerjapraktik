const passport = require('passport');

const userAuth = passport.authenticate('jwt', { session: false });

const checkRole = (roles) => (req, res, next) => {
  //console.log('req==>', req.user);

  let emplRoles = [];

  for (let elem of req.user) {
    emplRoles.push(elem.RoleName);
  }

  //console.log(emplRoles);

  const status = getStatus(emplRoles, roles);
  //console.log(status);
  if (status) {
    //console.log('ada')
    next();
  }
  else {
    //console.log('after')
    res.status(401).json('Unauthorized');
  }
};

const getStatus = (emplRoles, authRoles) => {
  // console.log('emplRoles ==>', emplRoles);
  // console.log('authRoles ==>', authRoles);

  for (let authRole of authRoles) {
    if (emplRoles.filter(item => item == authRole).length > 0) return true
  }
  return false
};

module.exports = {
  userAuth,
  checkRole
};
