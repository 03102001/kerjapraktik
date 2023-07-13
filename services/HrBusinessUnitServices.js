const db = require("../models")
const moment = require("moment")

exports.getAll = async () => {
  try {
    const result = await db.HrBusinessUnit.findAll({
      order: [["BuCode", "ASC"]],
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getById = async (id) => {
  try {
    const result = await db.HrBusinessUnit.findByPk(id)

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getByCode = async (code) => {
  try {
    const result = await db.HrBusinessUnit.findOne({
      where: { BuCode: code },
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.getByStatus = async (status) => {
  try {
    const result = await db.HrBusinessUnit.findAll({
      where: { IsActive: status },
      order: [["BuCode", "ASC"]],
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.create = async (data) => {
  try {
    data.BuID = "BUS_" + moment(new Date()).format("YYMMDDhhmmss")

    const result = await db.HrBusinessUnit.create(data)
    return result
  }
  catch (err) {    
    throw err
  }
}

exports.update = async (id, data) => {
  try {
    const result = await db.HrBusinessUnit.update(data, {
      where: { BuID: id },
    })

    return result
  }
  catch (err) {    
    throw err
  }
}

exports.delete = async (id) => {
  try {
    const result = await db.HrBusinessUnit.destroy({
      where: {
        BuID: id,
      },
    })

    return result
  }
  catch (err) {    
    throw err
  }
}
