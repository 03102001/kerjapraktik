
const { servicesObj } = require('./Services')
const { errorLog } = require('../utils/logger')
const config = require('../config/wtdms.config')
const appusage = require('../services/AppUsageServices')
const moment = require("moment")


exports.getAll = async (req, res) =>{
		const user = res.locals.EmployeeID!=null?res.locals.EmployeeID:null
		
		//console.log('req.url==>', req.url)
    	const splitUrl = req.url.split('/')
		//console.log('splitUrl==>', splitUrl)
		
		const objUrl = {...splitUrl}
		//console.log('objUrl==>', objUrl)
		const services = objUrl[2].toLowerCase()		
		//console.log('services ==>', services)
		const finder = objUrl[3]		
		//console.log('finder ==>', finder)
		let servicesFinderWithParam = ""

		//console.log(`${finder}${services}`)

		if (user!==null) servicesFinderWithParam =  await servicesObj[services][finder](user)
		//await servicesObj[services][`${finder}${services.charAt(0).toUpperCase()}${services.slice(1)}`](user)
		else{
			servicesFinderWithParam = await servicesObj[services][finder]()
		}

    	try {
			const result = servicesFinderWithParam
			//const result = await servicesObj[services].getAll()
			//const result = await servicesObj[services][finder]()
			//console.log(result)
        //await res.status(200).send(JSON.stringify(result))	
		if(result == "Please Insert Today Log Delivery Plan")
		{
			var now = new Date();
			var dateString = moment(now).format('YYYY-MM-DD');

			console.log("file: GetController.js:42 | exports.getAll= | dateString:", dateString)
			console.log("file: GetController.js:42 | exports.getAll= | dateString.toString():", dateString.toString())

			var messages = "Please Insert Log Delivery Plan "+dateString.toString()
			await res.status(404).send({status: false, message:messages});   
		}
		else
		{
			await res.status(200).send(result)
			appusage.create(`${finder}`,`${services}`,`${objUrl[4]}`,'POST', new Date(), `${user}`)
		}	
		
    }
    catch (err){
        if (config.debug) console.log(`${[services]} error getAll: `, err.message)
        errorLog.error(`${req.url} - ${req.method} - ${req.user[0].UserName} - ${err.status || 404} - ${req.ip} - ${err.message}`)
        res.status(404).send({ status: false, message: err.message })
    }
}

exports.getByParam = async (req, res) => {	

	const user = res.locals.EmployeeID!=null?res.locals.EmployeeID:null
	//console.log('user==>', user)

	const splitUrl = req.url.split('/');
	console.log('splitUrl', splitUrl)

	const objUrl = {...splitUrl}
	console.log('objUrl==>', objUrl)
	const services = objUrl[2].toLowerCase()
	console.log('services==>', services)
	const finder = objUrl[3]
	console.log('finder==>', finder)
	const param = objUrl[4]	
	
	//console.log('param==>', param)

	let servicesFinderWithParam = ""

	if (user!==null) servicesFinderWithParam = await servicesObj[services][finder](param, user)
	else{
 		servicesFinderWithParam = await servicesObj[services][finder](param)
	}

	try {
		const result = servicesFinderWithParam
		//console.log(result)
		//await res.status(200).send(JSON.stringify(result))		
		await res.status(200).send(result)
		appusage.create(`${finder}`,`${services}`,`${objUrl[4]}`,'POST', new Date(), `${user}`)
	}
	catch (err){
			if (config.debug) console.log(`${services} error ${finder}: `, err.message)
			errorLog.error(`${req.url} - ${req.method} - ${req.user[0].UserName} - ${err.status || 404} - ${req.ip} - ${err.message}`)
			res.status(404).send({ status: false, message: err.message })
	}
}

exports.getByQueries = async (req, res) => {

	const user = res.locals.EmployeeID!=null?res.locals.EmployeeID:null
	//console.log('user==>', user)

	const splitUrl = req.url.split('/')
	//console.log(splitUrl)
	const objUrl = {...splitUrl}
	//console.log(objUrl)
	const services = objUrl[2].toLowerCase()
	//console.log(services)
	const finder = objUrl[3]
	//console.log(finder)
	//const params = objUrl[4].split("?")[1]	
	const params = objUrl[4]
	//console.log('params', params)
	//const param = params.split("&")
	//console.log('param', param)

	let servicesFinderWithQueries = ""

	if (user!==null) servicesFinderWithQueries = await servicesObj[services][finder](params, user)
	else{
		servicesFinderWithQueries = await servicesObj[services][finder](params)
	}
  
	try {
		//console.log(servicesObj[services][finder](params))
		//const result = await servicesObj[services][finder](params)
		const result = servicesFinderWithQueries
		//console.log('result==>', result)
		//await res.status(200).send('success')
		//await res.status(200).send(JSON.stringify(result))
		await res.status(200).send(result)
		appusage.create(`${finder}`,`${services}`,`${objUrl[4]}`,'POST', new Date(), `${user}`)
	}
	catch (err){
		if (config.debug) console.log(`${[services]} error ${[finder]} : `, err.message)
		errorLog.error(`${req.url} - ${req.method} - ${req.user[0].UserName} - ${err.status || 404} - ${req.ip} - ${err.message}`)
		res.status(404).send({ status: false, message: err.message })
	}	
}




// exports.getAllByDatesProp2 = async (req, res) =>{
// 	const user = res.locals.EmployeeID!=null?res.locals.EmployeeID:null
	
// 	//console.log('req.url==>', req.url)
// 	const splitUrl = req.url.split('/')
	
// 	//console.log('splitUrl==>', splitUrl)
	
// 	const objUrl = {...splitUrl}
// 	//console.log('objUrl==>', objUrl)
// 	const services = objUrl[2].toLowerCase()		
// 	//console.log('services ==>', services)
// 	const finder = objUrl[3]	
// 	const paramstackingtype = objUrl[4]	
// 	const parampost = objUrl[5]	
// 	const param = objUrl[6]	
// 	const splitUrl2 = param.split('&')
// 	const paramdate = splitUrl2[0]
// 	const paramdeliverytype = splitUrl2[1]

// 	// console.log('finder ==>', finder)	
// 	// console.log('params ==>', params)	
// 	// console.log('parampost ==>', parampost)	
// 	//console.log('param ==>', paramstackingtype)		
// 	const finderAllProperties = "getAllProperties"	
// 	const finderAllPropertiesNew = "getAllPropertiesNew"		
// 	const finderHours = "getAllHoursDataPerday"
// 	const finderAllPropertiesDef = "getAllPropertiesDef"	
// 	const finderBaseLineTripDay = "getBaseLineTripDay"
	

// 	//console.log('finder ==>', finder)	
// 	let servicesGetHours = ""		
// 	let servicesAll = []

// 	//console.log(`${finder}${services}`)

// 	if (user!==null) 
// 	{			
// 		servicesGetHours = await servicesObj[services][finderHours](user)		
// 		servicesGetBaseLineTripDay = await servicesObj[services][finderBaseLineTripDay](user)
// 		servicesGetAllHoursByInputs = await servicesObj[services][finderHours](user)
// 		servicesGetAllProperties = await servicesObj[services][finderAllProperties](user)		
// 		servicesGetAllPropertiesDef = await servicesObj[services][finderAllPropertiesDef](user)		
// 		servicesGetAllPropertiesNew = await servicesObj[services][finderAllPropertiesNew](user)		
// 	}
	
// 	//await servicesObj[services][`${finder}${services.charAt(0).toUpperCase()}${services.slice(1)}`](user)
// 	else{
// 		let actualdf_id	= ""						
// 		let baseline, category
					
// 		let post = ""
		
// 		if(paramstackingtype == 'Hauling')
// 		{					
// 			servicesGetHours = await servicesObj[services][finderHours](paramdate,parampost,paramdeliverytype)			
// 			if(parampost == 'PostAllTonHour')
// 			{
// 				category = 'haulingtonhour'					
// 			}

// 			if(parampost == 'PostAllTripHour')
// 			{
// 				category = 'haulingtriphour'					
// 			}	

// 			for(let i=0;i<servicesGetHours.length;i++)
// 			{		
// 				let totalNetweight = 0							
// 				actualdf_id = servicesGetHours[i].actualdf_id					
// 				servicesAll.push(servicesGetHours[i])			
// 				servicesGetAllProperties = await servicesObj[services][finderAllProperties](parampost,actualdf_id,paramdate,paramdeliverytype)								
				
// 				// if(servicesGetAllProperties[0].netweight != undefined)
// 				// {
// 					for(let k=0;k<servicesGetAllProperties.length;k++)
// 					{
// 						totalNetweight = totalNetweight + parseInt(servicesGetAllProperties[k].netweight)					
// 					}						
// 				// }				

// 				for(let j=0;j<servicesGetAllProperties.length;j++)
// 				{										
// 					values = servicesGetAllProperties[j].props													
// 					servicesAll[i]['category'] = category
// 					servicesAll[i]['stacking_type'] = 'hauling'
// 					servicesAll[i]['delivery_type'] = paramdeliverytype						
// 					servicesAll[i]['trip'] = servicesGetAllProperties[j].trip
// 					servicesAll[i]['totalweight'] = Math.round(totalNetweight)
// 					servicesAll[i][values] = Math.round(servicesGetAllProperties[j].netweight)*1																						
// 				}													
// 			}				
// 		}			
			
// 	}
	
// 	try {
// 		const result = servicesAll
// 		//const result = await servicesObj[services].getAll()
// 		//const result = await servicesObj[services][finder]()
// 		//console.log(result)
// 	//await res.status(200).send(JSON.stringify(result))
// 	await res.status(200).send(result)
// }
// catch (err){
// 	if (config.debug) console.log(`${[services]} error getAll: `, err.message)
// 	errorLog.error(`${req.url} - ${req.method} - ${req.user[0].UserName} - ${err.status || 404} - ${req.ip} - ${err.message}`)
// 	res.status(404).send({ status: false, message: err.message })
// }
// }