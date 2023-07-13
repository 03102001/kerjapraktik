const db = require("../models")
const moment = require("moment")

exports.getAll = async () => {
  try {
    const result = await db.PasswordHist.findAll({
      order: [["PassChangeDate", "DESC"]],
    })

    return result
  } catch (err) {    
    throw err
  }
}

exports.getById = async (id) => {
  try {
    const result = await db.PasswordHist.findByPk(id)

    return result
  } catch (err) {    
    throw err
  }
}

exports.getByEmployeeId = async (id) => {
  try {
    const result = await db.PasswordHist.findAll({
      limit: 12,
      where: { EmployeeID: id },
      order: [["PassChangeDate", "DESC"]],
    })

    return result
  } catch (err) {    
    throw err
  }
}

exports.create = async (data, createdBy) => {
  try {
    data.CreatedBy = createdBy;
    data.PasswordHistID = "PAH_" + moment(new Date()).format("YYMMDDhhmmss")
    const result = await db.PasswordHist.create(data)
    
    return result
  } catch (err) {    
    throw err
  }
}
