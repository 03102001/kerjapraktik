const db = require('../models')
const moment = require('moment')
const { QueryTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
const passHistServices = require('../services/PasswordHistServices')
const email = require('../utils/email')
const { randomString } = require('../utils/randomString')

exports.getAll = async () => {
  try {
    const result = await db.HrEmployee.findAll({
      attributes: { exclude: ['UserPassword'] },
      include: {
        model: db.HrBusinessUnit,
        as: 'BusinessUnit'
      },
      order: [['EmployeeName', 'ASC']]
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getAllForLookup = async () => {
  try {
    const result = await db.HrEmployee.findAll({
      attributes: { exclude: ['UserPassword'] },
      include: {
        model: db.HrBusinessUnit,
        as: 'BusinessUnit'
      },
      order: [['EmployeeName', 'ASC']]
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getAuth = async (employeeId) => {
  try {
    const query =
      'SELECT emp.employee_id as "EmployeeID",emp.employee_name as "EmployeeName", emp.empl_sap_id as "EmployeeSapId", ' +
      'emp.user_name as "UserName", emp.email_address as "EmailAddress", rol.role_name as "RoleName" ' +
      'FROM emplrole er ' +
      'JOIN hremployee emp on er.employee_id = emp.employee_id ' +
      'JOIN role rol on er.role_id = rol.role_id ' +
      "WHERE emp.employee_id = '" + employeeId + "' ";

    const result = await db.sequelize.query(query, {
      type: QueryTypes.SELECT
    })

    return result
  } catch (err) {    
    throw err
  }
}

exports.getById = async (id) => {  
  try {
    console.log("file: HrEmployeeServices.js:67 | exports.getById= | id:", id)
    const result = await db.HrEmployee.findByPk(id, {
      attributes: { exclude: ['UserPassword'] },
      include: {
        model: db.HrBusinessUnit,
        as: 'BusinessUnit'
      }
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

// exports.getByUserName2 = async (userName) => {  
//   try {
//     const result = await db.HrEmployee.findOne({
//       //attributes: { exclude: ['UserPassword'] },
//       where: { EmployeeName: userName },
//       include: {
//         model: db.HrBusinessUnit,
//         as: 'BusinessUnit'
//       }
//     })
    
//     return result
//   }
//   catch (err) {    
//     throw err
//   }
// }

exports.getByUserName = async (userName) => {  
  try {
    const result = await db.HrEmployee.findOne({
      //attributes: { exclude: ['UserPassword'] },
      where: { UserName: userName },
      include: {
        model: db.HrBusinessUnit,
        as: 'BusinessUnit'
      }
    })
    
    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getBySapId = async (sapId) => {
  try {
    const result = await db.HrEmployee.findOne({
      attributes: { exclude: ['UserPassword'] },
      where: { EmplSapId: sapId },
      include: {
        model: db.HrBusinessUnit,
        as: 'BusinessUnit'
      }
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getByStatus = async (status) => {
  try {
    const result = await db.HrEmployee.findAll({
      attributes: { exclude: ['UserPassword'] },
      where: { IsActive: status },
      order: [['EmployeeName', 'ASC']]
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getIsLogged = async (params) =>{

  const para = params.split('&')
  const status = para[0]
  const employeeId = para[1]

  try{
    const result = await db.HrEmployee.findOne({
      where: { 
        EmployeeID: employeeId
        // [Op.And]:[
        //   //{ IsLogged: 'Y'},
        //   { EmployeeID: employeeId}
        // ]
      },
    })

    return result
  }
  catch(err){    
    throw err
  }
}

exports.changePassword = async (id, data) => {
  try {
      //check new password and confirm password
      if (data.UserPassword != data.ConfirmPassword) throw Error('New Password and Confirm Password is NOT Match')

      //check old password      
      const user = await this.getByUserName(data.UserName)
      const auth = await bcrypt.compare(data.OldPassword, user.UserPassword)
      if (!auth) throw Error('Invalid Old Password')

      //check password compliance
      //(?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character.
      //(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character.
      //(?=.*[0-9])	The string must contain at least 1 numeric character.
      //(?=.*[!@#\$%\^&\*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict.
      //(?=.{8,})	The string must be eight characters or longer.

      const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
      const compliance = strongRegex.test(data.UserPassword)
      if (!compliance) throw Error('Password Is Not Comply')

      //check history password
      const checkPasswordHist = await passHistServices.getByEmployeeId(user.EmployeeID)
      for (let elem of checkPasswordHist) {
        await checkPasswordPreviously(data.UserPassword, elem.UserPassword)
      }

      //change password
      const salt = await bcrypt.genSalt()
      const newPassword = await bcrypt.hash(data.UserPassword, salt)
      const password = {
        UserPassword: newPassword
      }

      const result = await db.HrEmployee.update(password, {
        where: { EmployeeID: id }
      })

      const passHistDate = {
        EmployeeID: user.EmployeeID,
        UserPassword: newPassword,
        PassChangeDate: new Date()
      }

      await passHistServices.create(passHistDate, user.EmployeeID)

      return result
    }

  catch (err) {    
    throw err
  }
}

exports.forgotPassword = async (data) => {
  try {
    //check user name
    const user = await this.getByUserName(data.UserName.toLowerCase())
    if (!user) throw new Error ("User Does Not Exist")

    //check password
    if (user.EmailAddress!=data.EmailAddress) throw new Error("Invalid Email Address")

    const randomPassword = randomString()

    //change password
    const salt = await bcrypt.genSalt()
    const newPassword = await bcrypt.hash(randomPassword, salt)

    const result = await db.HrEmployee.update({UserPassword:newPassword}, {
      where: { EmployeeID: user.EmployeeID }
    })

    const contextMail = {
      userName: data.UserName,
      password: randomPassword
    }
  
    await email.sendMail(data.EmailAddress, '', 'Forgot Password', 'reset_password', contextMail )      

    return result
  }
  catch (err){    
    throw err
  }
}

exports.resetPassword = async (id, data) => {
  try {
    const randomPassword = randomString()

    //change password
    const salt = await bcrypt.genSalt()
    const newPassword = await bcrypt.hash(randomPassword, salt)

    const result = await db.HrEmployee.update({UserPassword: newPassword}, {
      where: { EmployeeID: id }
    })

    const contextMail = {
      userName: data.UserName,
      password: randomPassword
    }
  
    await email.sendMail(data.EmailAddress,'', 'Reset Password', 'reset_password', contextMail )      

    return result
  }
  catch (err){    
    throw err
  }
}

const checkPasswordPreviously = async (UserPassword, UserPasswordDB) => {
  const isSame = await bcrypt.compare(UserPassword, UserPasswordDB)
  if (isSame) throw Error("Password Has Been Same As Previously")
}

exports.unlockAccount = async (id) => {
  try {
    const result = await db.HrEmployee.update({IsActive:"Y", IsLock:"N"}, {
      where: { EmployeeID: id }
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.create = async (data) => {
  try {
    data.EmployeeID = 'EMP_' + moment(new Date()).format('YYMMDDhhmmss')
    const result = await db.HrEmployee.create(data)
    
    return result
  }
  catch (err) {    
    throw err
  }
}

exports.update = async (id, data) => {  
  try {
    const result = await db.HrEmployee.update(data, {
      where: { EmployeeID: id }
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.delete = async (id) => {
  try {
    const result = await db.HrEmployee.destroy({
      where: {
        EmployeeID: id
      }
    })

    return result
  }
  catch (err) {    
    throw err
  }
}