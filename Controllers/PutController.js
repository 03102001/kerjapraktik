const { servicesObj } = require('./Services')
const auditTrail = require('../services/AuditServices')
const { errorLog, transLog } = require('../utils/logger')
const config = require('../config/wtdms.config')
const appusage = require('../services/AppUsageServices')

exports.update = async (req, res) => {
    const user = res.locals.EmployeeID!=null?res.locals.EmployeeID:null

    const splitUrl = req.url.split('/')    
    console.log('splitUrl', splitUrl)

    const objUrl = {...splitUrl}
		console.log('objUrl==>', objUrl)

    const services = objUrl[2].toLowerCase()   
    console.log('services ==>', services)

    const action = objUrl[3]
    console.log('action==>', action)

    const id = objUrl[4]
    console.log('id ==>', id)

    req.body.ModifiedBy = user
    // req.body.ApprovedBy = user
    // req.body.SubmittedBy = user
    // req.body.SubmittedById = user
    // req.body.SetByActualUnloadingPointID = user
    // req.body.SetByActualLoadingPointID = user


    // console.log('putController', id)
    //console.log('putController', req.body)
    

    try {        
        const prevValues = await servicesObj[services].getById(id)
        //console.log('prevValues', prevValues)
        const result = await servicesObj[services][action](id, req.body)
        if (result == 1) {
          auditTrail.create(`${services}`, JSON.stringify(prevValues.dataValues), JSON.stringify(req.body), `${user}`, 'PUT')          
          appusage.create(`${action}`,`${services}`,`${objUrl[4]}`,'PUT', new Date(), `${user}`)
          transLog.info(`${req.url} - ${req.method} - ${user} - ${req.ip} - ${JSON.stringify(req.body)}`)

          await res.status(200).send({status: true, messsage:"Update Successfully"})
        }
        else res.status(200).send({status: false, messsage:"Update IS NOT Successfully"})      
    }
    catch(err){
      if (config.debug) console.log(`Update error ${[services]}: `, err.message);
      errorLog.error(`${req.url} - ${req.method} - ${user} - ${err.status || 404} - ${req.ip} - ${err.message}`);
      res.status(404).send({ status: false, message: err.message });
    }
}

