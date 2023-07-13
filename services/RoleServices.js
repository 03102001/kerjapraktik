const db = require('../models')
const moment = require('moment')

exports.getAll = async () => {
  try {
    const result = await db.Role.findAll({
      order: [['RoleName', 'ASC']]
    })

    return result
  }
  catch (err) {
    throw err
  }
}

exports.getById = async (id) => {
  try {
    const result = await db.Role.findByPk(id)

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getByCode = async (code) => {
  try {
    const result = await db.Role.findOne({
      where: { RoleName: code }
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getByStatus = async (status) => {
  try {
    const result = await db.Role.findAll({
      where: { IsActive: status },
      order: [['RoleName', 'ASC']]
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.create = async (data) => {
  try {
    data.RoleID = 'ROL_' + moment(new Date()).format('YYMMDDhhmmss')
    const result = await db.Role.create(data)

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.update = async (id, data) => {
  try {
    const result = await db.Role.update(data, {
      where: { RoleID: id }
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.delete = async (id) => {
  try {
    const result = await db.Role.destroy({
      where: {
        RoleID: id
      }
    })

    return result
  }
  catch (err) {    
    throw err
  }
}
