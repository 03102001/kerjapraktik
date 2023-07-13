const express = require('express')
const router = express.Router()
const barangController = require('../Controllers/barangController.js')
const departmentController = require('../Controllers/departmentController.js')
const gatepassController = require('../Controllers/gatepassController.js')
const gatepassdetailController = require('../Controllers/gatepassdetailController.js')
const userController = require('../Controllers/userController.js')
const { userAuth, checkRole } = require('../middlewares/userAuth')
// const { wtdmsTransLog } = require('../middlewares/logger')
const { user } = require('../middlewares/users')

// const AuditController = require('../controllers/AuditController')
const GetController = require('../controllers/GetController')
const PostController = require('../controllers/PostController')
const PutController = require('../controllers/PutController')
const DeleteController = require('../controllers/DeleteController')
const AuthenticationController = require('../controllers/AuthenticationController')

router.get('/api/barang/getAll', barangController.getAll)
router.post('/api/barang/create', barangController.create)
router.put('/api/barang/update/:id', barangController.update)
router.delete('/api/barang/delete/:id', barangController.delete)

router.get('/api/department/getAll', departmentController.getAll)
router.post('/api/department/create', departmentController.create)
router.put('/api/department/update/:id', departmentController.update)
router.delete('/api/department/delete/:id', departmentController.delete)

router.get('/api/gatepass/getAll', gatepassController.getAll)
router.post('/api/gatepass/create', gatepassController.create)
router.put('/api/gatepass/update/:id', gatepassController.update)
router.delete('/api/gatepass/delete/:id', gatepassController.delete)

router.get('/api/gatepassdetail/getAll', gatepassdetailController.getAll)
router.post('/api/gatepassdetail/create', gatepassdetailController.create)
router.put('/api/gatepassdetail/update/:id', gatepassdetailController.update)
router.delete('/api/gatepassdetail/delete/:id', gatepassdetailController.delete)

router.get('/api/user/getAll', userController.getAll)
router.post('/api/user/create', userController.create)
router.put('/api/user/update/:id', userController.update)
router.delete('/api/user/delete/:id', userController.delete)


router.get('/api/HrBusinessUnit/getAll', userAuth, checkRole(['SYSADMIN']), GetController.getAll)
router.get('/api/HrBusinessUnit/getById/:id', userAuth, checkRole(['SYSADMIN']), GetController.getByParam)
router.get('/api/HrBusinessUnit/getByCode/:code', userAuth, checkRole(['SYSADMIN']), GetController.getByParam)
router.get('/api/HrBusinessUnit/getByStatus/:status', userAuth, GetController.getByParam)
router.post('/api/HrBusinessUnit/create', userAuth, checkRole(['SYSADMIN']), user, PostController.create)
router.put('/api/HrBusinessUnit/update/:id', userAuth, checkRole(['SYSADMIN']), user, PutController.update)
router.delete('/api/HrBusinessUnit/delete/:id', userAuth, checkRole(['SYSADMIN']), user, DeleteController.delete)

/*
==========Employee==========
status = Y | N
*/
router.get('/api/HrEmployee/getAll', userAuth, checkRole(['SYSADMIN']), GetController.getAll)
router.get('/api/HrEmployee/getAllForLookup', userAuth, GetController.getAll)
router.get('/api/HrEmployee/getAuth/:id', GetController.getByParam)
router.get('/api/HrEmployee/getById/:id', userAuth, GetController.getByParam)
router.get('/api/HrEmployee/getBySapId/:id', userAuth, checkRole(['SYSADMIN']), GetController.getByParam)
router.get('/api/HrEmployee/getByStatus/:id', userAuth, GetController.getByParam)
router.get('/api/HrEmployee/getByUserName/:id', userAuth,checkRole(['SYSADMIN']), GetController.getByParam)
router.get('/api/HrEmployee/getIsLogged/:id', userAuth, GetController.getByParam)
router.post('/api/HrEmployee/create', userAuth, checkRole(['SYSADMIN']), user, PostController.create)
router.put('/api/HrEmployee/update/:id', userAuth, checkRole(['SYSADMIN', 'MGT']), user, PutController.update)
router.delete('/api/HrEmployee/delete/:id', userAuth, checkRole(['SYSADMIN']), user, DeleteController.delete)
router.post('/api/HrEmployee/signIn/', AuthenticationController.signIn)
router.post('/api/HrEmployee/signOut/', AuthenticationController.signOut)
router.put('/api/HrEmployee/changePassword/:id', userAuth, AuthenticationController.changePassword)
router.put('/api/HrEmployee/resetPassword/:id', userAuth, checkRole(['SYSADMIN']), AuthenticationController.resetPassword)
router.put('/api/HrEmployee/forgotPassword/', AuthenticationController.forgotPassword)
router.put('/api/HrEmployee/unlockAccount/:id', userAuth, checkRole(['SYSADMIN']), AuthenticationController.unlockAccount)

/*
==========Role==========
status = Y | N
*/
router.get('/api/Role/getAll', userAuth, checkRole(['SYSADMIN']), GetController.getAll)
router.get('/api/Role/getById/:id', userAuth, checkRole(['SYSADMIN']), GetController.getByParam)
router.get('/api/Role/getByCode/:code', userAuth, checkRole(['SYSADMIN']), GetController.getByParam)
router.get('/api/Role/getByStatus/:status', userAuth, GetController.getByParam)
router.post('/api/Role/create', userAuth, checkRole(['SYSADMIN']), user, PostController.create)
router.put('/api/Role/update/:id', userAuth, checkRole(['SYSADMIN']), user, PutController.update)
router.delete('/api/Role/delete/:id', userAuth, checkRole(['SYSADMIN']), user, DeleteController.delete)

/*
==========EmplRole==========
status = Y | N
*/
router.get('/api/EmplRole/getAll', userAuth, checkRole(['SYSADMIN']), GetController.getAll)
router.get('/api/EmplRole/getById/:id', userAuth, checkRole(['SYSADMIN']), GetController.getByParam)
router.get('/api/EmplRole/getByEmplId/:id', userAuth, checkRole(['SYSADMIN']), GetController.getByParam)
router.get('/api/EmplRole/getByEmployeeId/:id', userAuth, GetController.getByParam)
router.get('/api/EmplRole/getByStatus/:status', userAuth, GetController.getByParam)
router.post('/api/EmplRole/create', userAuth, checkRole(['SYSADMIN']), user, PostController.create)
router.put('/api/EmplRole/update/:id', userAuth, checkRole(['SYSADMIN']), user, PutController.update)
router.delete('/api/EmplRole/delete/:id', userAuth, checkRole(['SYSADMIN']), user, DeleteController.delete)

/*
==========Audit==========
*/
router.get('/api/Audit/getAll',  GetController.getAll)

//api/Audit/getByCreated/?startDate=2021-09-16&endDate=2021-09-16&createdBy=EMP_210518014707
router.get('/api/Audit/getByCreated', userAuth, checkRole(['SYSADMIN','WYOperator','WYReportSupervisor','WOODYARD', 'CUSTOMER','WYOperator_FTG','DASHBOARD']), GetController.getByQueries)

//api/Audit/getByCreatedAndMethod/?startDate=2021-09-16&endDate=2021-09-16&createdBy=EMP_210518014707&method=POST
router.get('/api/Audit/getByCreatedAndMethod', userAuth, checkRole(['SYSADMIN','WYOperator','WYReportSupervisor','WOODYARD', 'CUSTOMER','WYOperator_FTG','DASHBOARD']), GetController.getByQueries)



module.exports = router;



