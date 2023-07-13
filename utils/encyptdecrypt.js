const CryptoJS = require('crypto-js');
const config = require('../config/wtdms.config');

exports.encrypt = (planText) => {

    const encryptedString = CryptoJS.AES.encrypt(planText, config.encrypt_key).toString();   
    
    return encryptedString;     
}


exports.decrypt = (chipText) => {

    var bytes  = CryptoJS.AES.decrypt(chipText, config.encrypt_key);
    var decryptedString = bytes.toString(CryptoJS.enc.Utf8);    

    return decryptedString;

}