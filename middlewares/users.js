const user = async (req, res, next) => {    

    res.locals.EmployeeID = req.user[0].EmployeeID != null ? req.user[0].EmployeeID : null
    res.locals.UserName = req.user[0].UserName != null ? req.user[0].UserName : null
    next()

}

module.exports = {
    user
}