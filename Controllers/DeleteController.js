const { servicesObj } = require('./Services')
const auditTrail = require('../services/AuditServices')
const { errorLog, transLog } = require('../utils/logger')
const config = require('../config/wtdms.config')

exports.delete = async (req, res) => {
  const user = res.locals.EmployeeID!=null?res.locals.EmployeeID:null

  const splitUrl = req.url.split('/')        
  //console.log('splitUrl', splitUrl)
  const services = splitUrl[2].toLowerCase()   
  //console.log('services', services)
  const action = splitUrl[3]
  //console.log('action', action)
  const id = splitUrl[4]    
  //console.log('id', id)

  try {        
      const prevValues = await servicesObj[services].getById(id)

      const result = await servicesObj[services][action](id)      

      if(result >= 1) {
        
        auditTrail.create(`${services}`, JSON.stringify(prevValues), 'DELETE', `${user}`, 'DELETE')        
        transLog.info(`${req.url} - ${req.method} - ${user} - ${req.ip} - ${JSON.stringify(prevValues)}`)

        await res.status(200).send({status: true, messsage:"Remove Successfully"})
      }
      else res.status(200).send({status: false, messsage:"Remove IS NOT Successfully"})       
  }
  catch(err){
    if (config.debug) console.log(`Remove error ${[services]}: `, err.message)
    errorLog.error(`${req.url} - ${req.method} - ${user} - ${err.status || 404} - ${req.ip} - ${err.message}`)
    res.status(404).send({ status: false, message: err.message })
  }
}

