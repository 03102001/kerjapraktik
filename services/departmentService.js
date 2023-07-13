const db = require("../models");
const moment = require('moment');

exports.getAll = async () => {
    try {
        const result = await db.Department.findAll({
            order: [["DepartmentRef", "ASC"]],
        })

        return result
    }
    catch (err) {
        throw err
    }
}


exports.update = async (id, data) => {
    try {
        const result = await db.Department.update(data, {
            where: { DepartmentID: id },
        })

        return result
    }
    catch (err) {
        throw err
    }
}

exports.create = async (data) => {
    try {
        data.DepartmentID = "EQP_" + moment(new Date()).format("YYMMDDhhmmss")
        const result = await db.Department.create(data)

        return result
    }
    catch (err) {
        throw err
    }
}

exports.delete = async (id) => {
    try {
        const result = await db.Department.destroy({
            where: {
                DepartmentID: id,
            },
        })

        return result
    }
    catch (err) {
        throw err
    }
}
