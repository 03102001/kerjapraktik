const audit = require('../services/AuditServices')

const auditTrail = async (req, res, next) => {

    
    const splitUrl = req.url.split('/')
    //console.log('splitUrl==>', splitUrl)

    const objUrl = {...splitUrl}
   // console.log('objUrl==>', objUrl)

    const table = objUrl[2]
    //console.log('table==>', table)

    const method = req.method
    //console.log('method==>', method)

    const createdBy = req.user[0].EmployeeID
    //console.log('createdBy==>', createdBy)

    const data = req.body
    //console.log('data==>', data)

    audit.create(table, 'old data', JSON.stringify(data), createdBy, method)

    // const table = req.url.split('/')[2]
    // //console.log('table', table)

    // const data = req.body
    // //console.log('data', data)

    // const createdBy = req.user[0].EmployeeID
    // //console.log(createdBy)

    // const method = req.method
    // //console.log('method', method)

    // if (method == "POST") audit.createAudit(table,'NEW', JSON.stringify(data), createdBy, 'POST')
    // else if (method == "PUT") {
    //     const splitUrl = req.url.split('/');
    //     const services = splitUrl[2]
    //     const id = splitUrl[4]

    //     //newUrl[3] = 'getById';
    //     //console.log(newUrl[3])
    //     //console.log(newUrl.join('/'))

    //     let result = ""

    //     switch(services.toLowerCase()) {
    //         case 'barge': 
    //             result = barge.getById(id)
    //             break;
    //         case 'barge': 
    //             result = barge.getById(id)
    //             break;
    //         case 'contractor': 
    //             result = contractor.getById(id)
    //             break;
    //         case 'barge': 
    //             result = barge.getById(id)
    //             break;
    //         case 'barge': 
    //             result = barge.getById(id)
    //             break;
    //         case 'barge': 
    //             result = barge.getById(id)
    //             break;
    //         case 'barge': 
    //             result = barge.getById(id)
    //             break;
    //         case 'barge': 
    //             result = barge.getById(id)
    //             break;
    //         case 'barge': 
    //             result = barge.getById(id)
    //             break;
    //         case 'barge': 
    //             result = barge.getById(id)
    //             break;                
    //         case 'barge': 
    //             result = barge.getById(id)
    //             break;
    //         case 'section':
    //             result = await section.getById(id)
    //             break;
            
    //         default:
    //             console.log('Services Is Not Available')

    //     }


    //     audit.createAudit(table, JSON.stringify(result), JSON.stringify(data), createdBy, 'PUT')
    // }
    // else audit.createAudit(table, 'DELETE', 'DELETE', createdBy, 'DELETE')   
    
    next()
}

module.exports = {
    auditTrail
}