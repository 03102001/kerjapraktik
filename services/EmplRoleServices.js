const moment = require('moment')
const db = require('../models')
const { QueryTypes } = require('sequelize')

exports.getAll = async () => {
  try {
    const result = await db.EmplRole.findAll({
      include: [
        {
          model: db.HrEmployee,
          as: 'Employees'
        },
        {
          model: db.Role,
          as: 'Roles'
        }
      ]
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getById = async (id) => {
  try{
    return db.EmplRole.findByPk(id, {
      include: [
        {
          model: db.HrEmployee,
          as: 'Employees'
        },
        {
          model: db.Role,
          as: 'Roles'
        }
      ]
    })
  }
  catch(err){    
    throw err
  }
}

exports.getByStatus = async (status) => {
  try {
    const result = await db.EmplRole.findAll({
      where: { Status: status },
      include: [
        {
          model: db.HrEmployee,
          as: 'Employees'
        },
        {
          model: db.Role,
          as: 'Roles'
        }
      ]
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getByEmplId = async (id) => {
  try {

    const query =
      'SELECT rl.role_name as "RoleName" ' +
      'FROM emplrole er ' +
      'JOIN hremployee em on er.employee_id=em.employee_id ' +
      'JOIN role rl on er.role_id=rl.role_id ' +
      "WHERE er.employee_id = '" + id + "' ";

    const result = await db.sequelize.query(query, {
      type: QueryTypes.SELECT
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getByEmployeeId = async (id) => {
  try {

    const query =
      'SELECT er.empl_role_id, em.employee_id, em.bu_id, em.empl_sap_id, em.employee_name, em.user_name, em.authentication_type, em.is_active, em.is_lock, em.last_login, ' +
      'rl.role_id, rl.role_name as "RoleName", rl.role_desc ' +
      'FROM emplrole er ' +
      'JOIN hremployee em on er.employee_id=em.employee_id ' +
      'JOIN role rl on er.role_id=rl.role_id ' +
      "WHERE er.employee_id = '" + id + "' ";

    const result = await db.sequelize.query(query, {
      type: QueryTypes.SELECT
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.create = async (data) => {
  try {
    data.EmplRoleID = 'ERL_' + moment(new Date()).format('YYMMDDhhmmss')
    const result = await db.EmplRole.create(data)

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.update = async (id, data) => {
  try {
    const result = await db.RoleID.update(data, {
      where: { EmplRoleID: id }
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.delete = async (id) => {
  try {
    const result = await db.EmplRole.destroy({
      where: {
        EmplRoleID: id
      }
    })

    return result
  }
  catch (err) {    
    throw err
  }
}
