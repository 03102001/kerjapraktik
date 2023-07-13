const db = require("../models");
const moment = require('moment');

exports.getAll = async () => {
    try {
        const result = await db.User.findAll({
            order: [["UserName", "ASC"]],
        })

        return result
    }
    catch (err) {
        throw err
    }
}


exports.update = async (id, data) => {
    try {
        const result = await db.User.update(data, {
            where: { UserID: id },
        })

        return result
    }
    catch (err) {
        throw err
    }
}

exports.create = async (data) => {
    try {
        data.UserID = "EQP_" + moment(new Date()).format("YYMMDDhhmmss")
        const result = await db.User.create(data)

        return result
    }
    catch (err) {
        throw err
    }
}

exports.delete = async (id) => {
    try {
        const result = await db.User.destroy({
            where: {
                UserID: id,
            },
        })

        return result
    }
    catch (err) {
        throw err
    }
}
