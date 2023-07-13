const servicesObj = {
	audit: require('../services/AuditServices'),
	role: require('../services/RoleServices'),
	hrbusinessunit: require('../services/HrBusinessUnitServices'),
	hremployee: require('../services/HrEmployeeServices'),
	emplrole: require('../services/EmplRoleServices'),
	appusage: require('../services/AppUsageServices'),
}

module.exports = {
    servicesObj
}