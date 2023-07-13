const gatepassService = require('../services/gatepassService')

exports.getAll = async (req, res) => {

    try {
        const result = await gatepassService.getAll()

        await res.status(200).send(JSON.stringify(result))
    }
    catch (err) {
        throw err
    }
}


exports.update = async (req, res) => {
    const id = req.params.id
    try {
        await gatepassService.update(id, req.body)
        await res.status(200).send({ status: true, message: "Update Succesfully" });
    }
    catch (err) {
        throw err
    }
}

exports.create = async (req, res) => {
    try {
        await gatepassService.create(req.body)
        await res.status(200).send({ status: true, message: "Create Succesfully" });
    }
    catch (err) {
        throw err
    }
}

exports.delete = async (req, res) => {

    const id = req.params.id

    try {
        await gatepassService.delete(id)
        await res.status(200).send({ status: true, message: "Delete Succesfully" });
    }
    catch (err) {
        throw err
    }
}