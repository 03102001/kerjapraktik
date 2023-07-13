const db = require("../models");
const moment = require('moment');

exports.getAll = async () => {
    try {
        const result = await db.GatepassDetail.findAll({
            order: [["BarangID", "ASC"]],
        })

        return result
    }
    catch (err) {
        throw err
    }
}


exports.update = async (id, data) => {
    try {
        const result = await db.GatepassDetail.update(data, {
            where: { GatepassDetailID: id },
        })

        return result
    }
    catch (err) {
        throw err
    }
}

exports.create = async (data) => {
    try {
        data.GatepassDetailID = "EQP_" + moment(new Date()).format("YYMMDDhhmmss")
        const result = await db.GatepassDetail.create(data)

        return result
    }
    catch (err) {
        throw err
    }
}

exports.delete = async (id) => {
    try {
        const result = await db.GatepassDetail.destroy({
            where: {
                GatepassDetailID: id,
            },
        })

        return result
    }
    catch (err) {
        throw err
    }
}
