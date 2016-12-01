//Create ports array
import { addAction } from 'APP/app/reducers/action-creators'
import _ from 'lodash'
import {filter} from 'lodash.filter'
import {incrementResource} from 'APP/app/reducers/players'
import {resources} from './setup'

function deal(structures, corners, hexData, roll){
  structures.forEach(structure => {
    var num;
    if(structure.type === 'city')  num = 2;
    if(structure.type === 'settlement')  num = 1;
    var theCorner = _.filter(corners, function(corner){
      return corner.id === structure.corner_id
    })[0]
    theCorner.hexes.forEach(hex => {
      if(hexData[hex.id] && hexData[hex.id].token === roll){
        var resource = resources[hexData[hex.id].resource]
        var player = structure.player
        addAction(incrementResource(player, resource, num))
      }
    })
  })
}

function setupDeal(structures, corners, hexData){
  let tokens = [2,3,4,5,6,8,9,19,11,12]
  tokens.forEach(token => deal(structures, corners, hexData, token))
}

module.exports = {deal, setupDeal}
