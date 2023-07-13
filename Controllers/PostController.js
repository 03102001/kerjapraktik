const { servicesObj } = require('./Services')
const auditTrail = require('../services/AuditServices')
const { errorLog, transLog } = require('../utils/logger')
const config = require('../config/wtdms.config')
const appusage = require('../services/AppUsageServices')


exports.create = async (req, res) => {    
    const user = res.locals.EmployeeID!=null?res.locals.EmployeeID:null
    const splitUrl = req.url.split('/')
    const services = splitUrl[2].toLowerCase()    
    const action = splitUrl[3]      

    req.body.CreatedBy = user

    console.log("file: PostController.js:16 | exports.create= | req.body.CreatedBy:", req.body.CreatedBy)

    
    //req.body.SubmittedBy = user
    //req.body.SubmittedById = user

    //console.log('post controller ==>', req.body)
    
    try {        
        console.log('services',services)
        console.log('action',action)
        const result = await servicesObj[services][action](req.body)
                
        if(services == 'unitprestartinspection')
        {
          if(result == 0)
          {
            await auditTrail.create(`${services}`,'NEW', JSON.stringify(req.body), `${user}`, 'POST')            
            appusage.create(`${action}`,`${services}`,`${splitUrl[4]}`,'POST', new Date(), `${user}`)
            transLog.info(`${req.url} - ${req.method} - ${user} - ${req.ip} - ${JSON.stringify(req.body)}`)
            await res.status(200).send({status: true, message:"Create Successfully"});
          }          
          if(result == 1) await res.status(200).send({status: true, message:"Failed Create, Data Already Exist"});             
        }        
        if(action =='createJson')
        { 
          console.log("result from controll:", result)         
          console.log("result.is_success:", result.is_success)
          console.log("result.message:", result.message)
          if(result.is_success == '0')
          await res.status(404).send({status: false, message:result.message});             
          if(result.is_success == '1')
          await res.status(200).send({status: true, message:"Create Successfully", result});
          if(result == "Python Error")
          await res.status(404).send({status: false, message:"Python Modeling Error"});             
          if(result == "Json Error")
          await res.status(404).send({status: false, message:"Json Input Error"});  
        }                
        else
        {
          await auditTrail.create(`${services}`,'NEW', JSON.stringify(req.body), `${user}`, 'POST')
          appusage.create(`${action}`,`${services}`,`${splitUrl[4]}`,'POST', new Date(), `${user}`)
          transLog.info(`${req.url} - ${req.method} - ${user} - ${req.ip} - ${JSON.stringify(req.body)}`)
          await res.status(200).send({status: true, message:"Create Successfully"});
        }
       

    }
    catch(err){
      if (config.debug) console.log(`Create error ${[services]}: `, err.message);
      errorLog.error(`${req.url} - ${req.method} - ${user} - ${err.status || 404} - ${req.ip} - ${err.message || 'Duplicate'}`);
      res.status(404).send({ status: false, message: err.message || 'Duplicate Data' });
    }
}
