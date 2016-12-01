//Create ports array
import { moveRobber } from 'APP/app/reducers/robber'
import { addAction } from 'APP/app/reducers/action-creators'
import _ from 'lodash'
import {filter} from 'lodash.filter'
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

// function deal(structures, corners, hexData, roll){
//   structures.forEach(structure => {
//     var num;
//     if(structure.type === 'city')  num = 2;
//     if(structure.type === 'settlement')  num = 1;
//     var theCorner = _.filter(corners, function(corner){
//       return corner.id === structure.corner_id
//     })[0]
//     theCorner.hexes.forEach(hex => {
//       if(hexData[hex.id] && hexData[hex.id].token === roll){
//         var resource = resources[hexData[hex.id].resource]
//         console.log('structure', structure)
//         var player = structure.player || 'Sami Lugar'
//         addAction(incrementResource(structure.player, resource, num))
//       }
//     })
//   })
// }
//
// function setupDeal(){
//   let tokens = [2,3,4,5,6,8,9,19,11,12]
//   tokens.forEach(token => deal(token))
// }

module.exports = {shuffle, ports, resources, resourcesArray, tokenArray, assignHexInfo, }
