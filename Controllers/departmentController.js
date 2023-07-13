const departmentService = require('../services/departmentService')

exports.getAll = async (req, res) => {

    try {
        const result = await departmentService.getAll()

        await res.status(200).send(JSON.stringify(result))
    }
    catch (err) {
        throw err
    }
}


exports.update = async (req, res) => {
    const id = req.params.id
    try {
        await departmentService.update(id, req.body)
        await res.status(200).send({ status: true, message: "Update Succesfully" });
    }
    catch (err) {
        throw err
    }
}

exports.create = async (req, res) => {
    try {
        await departmentService.create(req.body)
        await res.status(200).send({ status: true, message: "Create Succesfully" });
    }
    catch (err) {
        throw err
    }
}

exports.delete = async (req, res) => {

    const id = req.params.id

    try {
        await departmentService.delete(id)
        await res.status(200).send({ status: true, message: "Delete Succesfully" });
    }
    catch (err) {
        throw err
    }
}