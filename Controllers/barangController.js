const barangService = require('../services/barangService')

exports.getAll = async (req, res) => {

    try {
        const result = await barangService.getAll()

        await res.status(200).send(JSON.stringify(result))
    }
    catch (err) {
        throw err
    }
}


exports.update = async (req, res) => {
    const id = req.params.id
    console.log("req: ", req)
    try {
        await barangService.update(id, req.body)
        await res.status(200).send({ status: true, message: "Update Succesfully" });
    }
    catch (err) {
        throw err
    }
}

exports.create = async (req, res) => {
    console.log("req.body: ", req.body)
    // console.log("res: ", res)
    try {
        const result = await barangService.create(req.body)
        console.log("result: ", result)
        await res.status(200).send({ status: true, message: "Create Succesfully" });
    }
    catch (err) {
        throw err
    }
}

exports.delete = async (req, res) => {

    const id = req.params.id

    try {
        await barangService.delete(id)
        await res.status(200).send({ status: true, message: "Delete Succesfully" });
    }
    catch (err) {
        throw err
    }
}