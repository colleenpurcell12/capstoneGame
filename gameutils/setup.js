//Create ports array
import { moveRobber } from 'APP/app/reducers/robber'
import { addAction } from 'APP/app/reducers/action-creators'
import {incrementResource} from 'APP/app/reducers/players'
import {_} from 'lodash'
import {filter} from 'lodash.filter'

var ports = [
  {type: 'port', x: -45, y: -26, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: -45, y: 7,r: 3, ratio: '1:2', res: 'hematite'},
  {type: 'port', x: -29, y: 35, r: 3, ratio: '1:2', res: 'solar'},
  {type: 'port', x: -16, y: -43, r: 3, ratio: '1:2', res: 'ice'},
  {type: 'port', x: 0, y: 52, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 16, y: -43, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 29, y: 35, r: 3, ratio: '1:2', res: 'seeds'},
  {type: 'port', x: 45, y: -26, r: 3, ratio: '1:3', res: null},
  {type: 'port', x: 45, y: 7, r: 3, ratio: '1:2', res: 'fuel'},
]

var resources = ['solar', 'ice', 'seeds', 'hematite', 'fuel']
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

var structures = [];
// structures array is passed in from store
// how to get corners from Board? put on state

function deal(structures, corners, hexData, roll){
  // var structures = this.props.structures
  // var corners = this.props.corners
  // var hexData = this.props.hexData
  // var roll = this.props.diceRoll.d1 + this.props.diceRoll.d2
  structures.forEach(structure => {
    var num;
    if(structure.type === 'city')  num = 2;
    if(structure.type === 'settlement')  num = 1;
    var theCorner = _.filter(corners, function(corner){
      return corner.id === structure.corner_id
    })[0]
    theCorner.hexes.forEach(hex => {
      if(hexData[hex.id].token === roll){
        var resource = resources[hex.resource]
        incrementResource(structure.owner, resource, num)
      }
    })
  })
}

function setupDeal(){
  let tokens = [2,3,4,5,6,8,9,19,11,12]
  tokens.forEach(token => deal(structures, corners, token))
}

module.exports = {shuffle, deal, ports, resources, resourcesArray, tokenArray, assignHexInfo}
