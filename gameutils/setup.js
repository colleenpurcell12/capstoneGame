//Create ports array
import { moveRobber } from 'APP/app/reducers/robber'
import { addAction } from 'APP/app/reducers/action-creators'
import {incrementResource} from 'APP/app/reducers/players'

var ports = [
  {type: 'port', x: -45, y: -26, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: -45, y: 7,r: 3, ratio: '1:2', res: 'hematite'},
  {type: 'port', x: -29, y: 35, r: 3, ratio: '1:2', res: 'solar'},
  {type: 'port', x: -16, y: -43, r: 3, ratio: '1:2', res: 'ice'},
  {type: 'port', x: 0, y: 52, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 16, y: -43, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 29, y: 35, r: 3, ratio: '1:2', res: 'crops'},
  {type: 'port', x: 45, y: -26, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 45, y: 7, r: 3, ratio: '1:2', res: 'fuel'},
]

var resources = ['solar', 'ice', 'crops', 'hematite', 'fuel']
var resourcesArray = [0, 0, 0, 0, 1,1,1,1,2,2,2,2,3,3,3,4,4,4]
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
  addAction(moveRobber(d))
  var hexData = [];
  for(var i = 0; i < 19; i ++){
    hexData.push({
      token : tshuff[i],
      resource : rshuff[i]
    })
  }
 return hexData;
}

const neighborDirections = [
    {q: 0, r: -1,s: +1},
    {q: 1, r: -1,s: 0},
    {q: 1, r: 0, s:-1},
    {q: 0, r: 1, s:-1},
    {q: -1,r:  1,s: 0},
    {q: -1,r:  0,s: 1},
]


module.exports = {
  shuffle,
  ports,
  resources,
  resourcesArray,
  tokenArray,
  assignHexInfo,
  neighborDirections}
