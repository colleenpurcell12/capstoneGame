//Create ports array

var ports = [
  {type: 'port', x: -45, y: -26, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: -45, y: 7,r: 3, ratio: '1:2', res: 'hematite'},
  {type: 'port', x: -29, y: 35, r: 3, ratio: '1:2', res: 'solar'},
  {type: 'port', x: -16, y: -43, r: 3, ratio: '1:2', res: 'ice'},
  {type: 'port', x: 0, y: 52, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 16, y: -43, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 29, y: 35, r: 3, ratio: '1:2', res: 'seeds'},
  {type: 'port', x: 45, y: -26, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 45, y: 7, r: 3, ratio: '1:2', res: 'other'},
]

var resources = ['solar', 'ice', 'seeds', 'hematite', 'other']
var resourcesArray = [0, 0, 0, 0, 1,1,1,1,2,2,2,2,3,3,3,4,4,4, 'desert']
var tokenArray = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]

function shuffle(arr){
  var shuffled = [];
  var len = arr.length
  for(var i = 0; i < len; i ++){
    var arrIndex = Math.floor(Math.random()*arr.length)
    shuffled.push(arr.splice(arrIndex, 1)[0])
  }
  return shuffled;
}


function assignHexInfo (tokens, resources) {
  var tshuff = shuffle(tokens);
  var rshuff = shuffle(resources);
  var d = Math.floor(Math.random()*19)
  tshuff.splice(d, 0, '')
  rshuff.splice(d, 0, 'desert')
  console.log('TSHUFF', tshuff)
  console.log('RSHUFF', rshuff)
  var hexData = [];
  console.log('HEX DATA', hexData);
  for(var i = 0; i < 19; i ++){
    hexData.push({
      token : tshuff[i],
      resource : rshuff[i]
    })
  }
 return hexData;

}

// takes two svg circle elements a, and b and the current user, c
// state could save the last two clicked on ccorner nodes as well as the current player


module.exports = {shuffle, ports, resources, resourcesArray, tokenArray, assignHexInfo}
