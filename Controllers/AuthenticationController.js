const services = require('../services/HrEmployeeServices') 
const emplRoleServices = require('../services/EmplRoleServices')

const ActiveDirectory = require('activedirectory')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const audit = require('../services/AuditServices')
const appusage = require('../services/AppUsageServices')

const { errorLog, userLog } = require('../utils/logger')
const config = require('../config/wtdms.config')

exports.signIn = async (req, res) =>{
    try {
      const { UserName, UserPassword } = req.body    
      console.log("file: AuthenticationController.js:16 | exports.signIn= | req.body", req.body)        
      const user = await services.getByUserName(UserName.toLowerCase())    

      if (user) {     
        const payload = {
          EmployeeID: user.EmployeeID
        }
        const token = await createToken(payload)
        console.log(token)
  
        const roles = await emplRoleServices.getByEmplId(user.EmployeeID)
        console.log(roles)
  
        if (user.AuthenticationType != 'LDAP') {
  
          if (user.UserPassword == null || user.UserPassword == '') {
  
            await services.resetPassword(user.EmployeeID, {UserName: user.UserName, EmailAddress: user.EmailAddress})
  
            res.status(201).json({
              status: false,
              message: 'New User',
              isNewUser: true
            })
          }
  
          const auth = await bcrypt.compare(UserPassword, user.UserPassword)
  
          if (!auth) {
            return res.status(201).json({
              status: false,
              message: 'Invalid Credential',
              isNewUser: false
            })
          } else {
            
            //check isActive
            if (user.IsActive=='N') {
              return res.status(201).json({
                status: false,
                message: 'User Is No Longer Active',
                isNewUser: false
              })
            }
  
            //check isLock
            if (user.IsLock=='Y') {
              return res.status(201).json({
                status: false,
                message: 'User Is Locked',
                isNewUser: false
              })
            }
  
            await services.update(user.EmployeeID, {LastLogin: new Date(), IsLogged: 'Y'})
            userLog.info(`${req.url} - ${req.method} - ${req.body.UserName} - ${req.ip}`)
            audit.create('HrEmployee', "LOGIN", JSON.stringify({LoginDate: new Date(), Ip: req.ip}), user.EmployeeID, 'POST')
  
            res.status(201).json({
              status: true,
              message: 'Login Success',
              token: `Bearer ${token}`,
              user: serializeUser(user),
              role: roles
            })
          }
        } else {
          ldapAuth(UserName, UserPassword, (status) => {
            //console.log('status==>', status)
            if (!status) {
              return res.status(201).json({
                status: false,
                message: 'Invalid Credential',
                isNewUser: false
              })
            } else {
  
              //check isActive
              if (user.IsActive!='Y') {
                return res.status(201).json({
                  status: false,
                  message: 'User Is No Longer Active',
                  isNewUser: false,                
                })
              }
  
              //check isLock
              if (user.IsLock!='N') {
                return res.status(201).json({
                  status: false,
                  message: 'User Is Locked',
                  isNewUser: false
                })
              }
  
              services.update(user.EmployeeID, {LastLogin: new Date(), IsLogged: 'Y'})
              userLog.info(`${req.url} - ${req.method} - ${req.body.UserName} - ${req.ip}`)
              audit.create('HrEmployee', "LOGIN", JSON.stringify({LoginDate: new Date(), Ip: req.ip}), user.EmployeeID, 'POST') /*Temporary Turn Off Audit Log for Dev*/
              appusage.create('signIn','HrEmployee','N/A','POST', new Date(), user.EmployeeID)

              res.status(201).json({
                status: true,
                message: 'Login Success',
                token: `Bearer ${token}`,
                user: serializeUser(user),
                role: roles
              })
            }
          })
        }
      } else {
        res.status(201).json({
          status: false,
          message: 'User Does Not Exist',        
        })
      }
    }
    catch(err) {
      if (config.debug) console.log('SignIn error [HrEmployee]: ', err.message)
      errorLog.error(`${req.url} - ${req.method} - ${req.ip} - ${err.status || 404} - ${err.message}`)
      res.status(404).send({ status: false, message: err.message }) 
    }
  }
  
exports.signOut = async (req, res) => {

	const user = await services.getBySapId(req.body.UserName.EmplSapId)
	await services.update(user.EmployeeID, {LastLogout: new Date(), IsLogged: 'N'})

	userLog.info(`${req.url} - ${req.method} - ${req.body.UserName} - ${req.ip}`)
	audit.create('HrEmployee', "LOGOUT", JSON.stringify({LogoutDate: new Date(), Ip: req.ip}), user.EmployeeID, 'POST')
  appusage.create('signOut','HrEmployee','N/A','POST', new Date(), user.EmployeeID)

	res.status(201).json({
		status: true,
		message: 'Logout Success',    
	})

}

exports.forgotPassword = (req, res) => {
  services
    .forgotPassword(req.body)
    .then((num) => {
      if (num == 1) {
        res.status(200).send({status: true, message:"Forgot Password Successfully"})
        appusage.create('signIn','HrEmployee','N/A','POST', new Date(), user.EmployeeID)
      }
    })
    .catch((err) => {
      if (config.debug) console.log('forgotPassword error [HrEmployee]: ', err.message)
      errorLog.error(`${req.url} - ${req.method} - ${req.ip} - ${err.status || 404} - ${err.message}`)
      res.status(202).send({ status: false, message: err.message })
    })
}

exports.resetPassword = (req, res) => {
  const id = req.params.id

  services
    .resetPassword(id, req.body)
    .then((num) => {
      if (num == 1) {
        res.status(200).send({status: true, message:"Reset Password Successfully"})
        appusage.create('signIn','HrEmployee','N/A','POST', new Date(), user.EmployeeID)
      }
    })
    .catch((err) => {
      if (config.debug) console.log('resetPassword error [HrEmployee]: ', err.message)
      errorLog.error(`${req.url} - ${req.method} - ${req.ip} - ${err.status || 404} - ${err.message}`)
      res.status(404).send({ status: false, message: err.message })
    })
}

exports.changePassword = (req, res) => {
  const id = req.params.id
  // console.log('id', id)
  // console.log('req.body', req.body)

  services
    .changePassword(id, req.body)
    .then((num) => {
      if (num == 1) {
        res.status(200).send({status: true, message:"Password Changed Successfully"})
        appusage.create('signIn','HrEmployee','N/A','POST', new Date(), user.EmployeeID)
      }
    })
    .catch((err) => {
      if (config.debug) console.log('changePassword error [HrEmployee]: ', err.message)
      errorLog.error(`${req.url} - ${req.method} - ${req.user[0].UserName} - ${err.status || 404} - ${req.ip} - ${err.message}`)
      res.status(202).send({ status: false, message: err.message })
    })
}

exports.unlockAccount = async (req, res) => {
  //console.log('req', req)
  const id = req.params.id
  //console.log('unloack account id', id)

  services
  .unlockAccount(id)
  .then((num) => {
    if (num == 1) {
      res.status(200).send({status: true, message:"Unlock Account Successfully"})
      appusage.create('signIn','HrEmployee','N/A','POST', new Date(), user.EmployeeID)
    }
  })
  .catch((err) => {
    if (config.debug) console.log('unlockAccount error [HrEmployee]: ', err.message)
    errorLog.error(`${req.url} - ${req.method} - ${req.user[0].UserName} - ${err.status || 404} - ${req.ip} - ${err.message}`)
    res.status(404).send({ status: false, message: err.message })
  })
}

const maxAge = 15 * 60000
const createToken = async (payload) => {
	//console.log(payload)
	return jwt.sign({ payload }, config.secret, {
		expiresIn: maxAge
	})
}
    
async function ldapAuth(userName, userPassword, callback) {
	try {
		const ad = new ActiveDirectory(config.url_ldap)
		await ad.authenticate(userName + '@' + config.domain, userPassword, function (err, auth) {
				if (err) {
					callback(false)
				}
				if (auth) {
					callback(true)
				}
			}
		)
	} catch (err) {
		if (config.debug) console.log('ldapAuth error [HrEmployee]: ', err.message)
		errorLog.error(`${req.url} - ${req.method} - ${req.ip} - ${err.status || 404} - ${err.message}`)
		res.status(404).send({ status: false, message: err.message })    
	}
}
  
const serializeUser = (user) => {
	return {
		EmployeeID: user.EmployeeID,
		EmplSapId: user.EmplSapId,
		EmployeeName: user.EmployeeName,
		UserName: user.UserName,
		AuthenticationType: user.AuthenticationType,
		EmailAddress: user.EmailAddress,
		IsActive: user.IsActive,
		IsLock: user.IsLock,
		LastLogin: user.LastLogin
	}
} 
