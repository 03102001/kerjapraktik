
const random = require('random')

exports.randomString = () => {
  //console.log(str)
  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+{}|<>?/';
  var charactersLength = characters.length;
  let min = 0;
  let max = 1;
  
  for ( var i = 0; i < 20; i++ ) {
    var randomValue = random.float((min), (max));    
    result.push(characters.charAt(Math.floor(randomValue * charactersLength)));
  } 

  return result.join('');
}