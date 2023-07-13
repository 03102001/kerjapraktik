const db = require("../models");
const moment = require('moment');

exports.getAll = async () => {
    try {
        const result = await db.Gatepass.findAll({
            order: [["GatepassCode", "ASC"]],
        })

        return result
    }
    catch (err) {
        throw err
    }
}


exports.update = async (id, data) => {
    try {
        const result = await db.Gatepass.update(data, {
            where: { GatepassID: id },
        })

        return result
    }
    catch (err) {
        throw err
    }
}

exports.create = async (data) => {
    try {
        data.GatepassID = "EQP_" + moment(new Date()).format ("YYMMDDhhmmss")
        const result = await db.Gatepass.create(data)

        return result
    }
    catch (err) {
        throw err
    }
}

exports.delete = async (id) => {
    try {
        const result = await db.Gatepass.destroy({
            where: {
                GatepassID: id,
            },
        })

        return result
    }
    catch (err) {
        throw err
    }
}
