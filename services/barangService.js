const db = require("../models");
const moment = require('moment');

exports.getAll = async () => {
    try {
        const result = await db.Barang.findAll({
            order: [["BarangName", "ASC"]],
        })

        return result
    }
    catch (err) {
        throw err
    }
}


exports.update = async (id, data) => {
    try {
        const result = await db.Barang.update(data, {
            where: { BarangID: id },
        })

        return result
    }
    catch (err) {
        throw err
    }
}

exports.create = async (data) => {
    console.log("data: ", data)
    try {
        data.BarangID = "EQP_" + moment(new Date()).format("YYMMDDhhmmss")
        const result = await db.Barang.create(data)
        console.log("hasil: ", result)
        return result
    }
    catch (err) {
        throw err
    }
}

exports.delete = async (id) => {
    try {
        const result = await db.Barang.destroy({
            where: {
                BarangID: id,
            },
        })

        return result
    }
    catch (err) {
        throw err
    }
}
