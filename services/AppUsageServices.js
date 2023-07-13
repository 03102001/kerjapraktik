const db = require("../models")
const moment = require("moment")
const { Op } = require("sequelize")
const { QueryTypes } = require("sequelize")

exports.getAll = async () => {
  try {
    const result = await db.AppUsage.findAll({      
      order: [["createdBy", "ASC"]],
    })

    return result
  } catch (err) {    
    throw err
  }
}

// exports.getByCreated = async (queries) => {
//   //console.log(queries)
//   const arParams = queries.split("&")
//   //console.log(arParams)
//   const dtStartDate = arParams[0].split('=')[1]
//   //console.log('startDate==>', dtStartDate)
//   const dtEndDate = arParams[1].split('=')[1]
//   //console.log('dtEndDate==>', dtEndDate)
//   const createdBy = arParams[2].split('=')[1]
//   //console.log('createdBy==>', createdBy)
//   //startDate, endDate, createdBy
//   // const arParams = params.split("&")
// 	// const startDate = arParams[0] + " 00:00:00";
//   // const endDate = arParams[1] + " 23:59:59";
// 	// const createdBy = arParams[2]

//   // const dtStartDate = new Date(startDate)
//   // const dtEndDate = new Date(endDate)

//   // console.log(dtStartDate)
//   // console.log(dtEndDate)
//   // console.log(createdBy)
  
  
//   try {
//     const result = await db.Audit.findAll({   
// 			where: {
//         createdAt: { [Op.between]: [dtStartDate + " 00:00:00", dtEndDate + " 23:59:59"] },
//         CreatedBy: createdBy
//         // [Op.and]:[					
// 				// 	{
// 				// 		createdAt: { [Op.between]: [dtStartDate, dtEndDate] }
// 				// 	},
// 				// 	{
// 				// 		CreatedBy: createdBy
// 				// 	}         
//         // ]
//       },
//       order: [["AuditID", "DESC"]], 
//     })

//     return result
//   } catch (err) {    
//     throw err
//   }
// }

// exports.getByCreatedAndMethod = async (queries) => {
//   //startDate, endDate, createdBy, method
//   //console.log('queries', queries)
//   const arParams = queries.split("&")
//   //console.log(arParams)
//   const dtStartDate = arParams[0].split('=')[1]
//   //console.log('startDate==>', dtStartDate)
//   const dtEndDate = arParams[1].split('=')[1]
//   //console.log('dtEndDate==>', dtEndDate)
//   const createdBy = arParams[2].split('=')[1]
//   //console.log('createdBy==>', createdBy)
//   const method = arParams[3].split('=')[1]
  

//   // const arParams = params.split("&")
// 	// const startDate = arParams[0] + " 00:00:00";
//   // const endDate = arParams[1] + " 23:59:59";
// 	// const createdBy = arParams[2]
// 	// const method = arParams[3]	
  
//   try {
//     const result = await db.Audit.findAll({   
// 			where: {
//         createdAt: { [Op.between]: [dtStartDate + " 00:00:00", dtEndDate + " 23:59:59"] },
//         CreatedBy: createdBy,
//         Method: method
//         // [Op.and]:[
// 				// 		{
// 				// 			CreatedBy: createdBy
// 				// 		},
// 				// 		{
// 				// 			Method: method
// 				// 		},						
//         //     {
//         //       createdAt: { [Op.between]: [startDate,endDate] }
//         //     }         
//         // ]
//       }, 
//       order: [["AuditID", "DESC"]], 
//     })

//     return result
//   } catch (err) {    
//     throw err
//   }
// }

exports.create = async (api_name, table_name, param_name, method, usage_date, createdBy) => {
  console.log("AppUsage :",api_name+'-'+table_name+'-'+method+'-'+usage_date+'-'+createdBy)

  try {
    // const query =
    // 'select count(appusage_id) as count FROM public.appusage';
    // const result1 = await db.sequelize.query(query, {
    //     type: QueryTypes.SELECT
    // })   

    // console.log("file: AppUsageServices.js:121 | exports.create= | result1:", parseInt(result1[0].count)+1)

    
    const data = {
      //AppUsageID: 'APU_' + moment(new Date()).format('YYMMDDhhmmss'),
      APIName: api_name,
      TableName: table_name,
      ParamName: param_name,
      Method: method,
      UsageDate: usage_date,
      CreatedBy: createdBy,      
    }

    const result = db.AppUsage.create(data)
    return result
  } catch (err) {    
    throw err
  }
}
