import { addAction } from 'APP/app/reducers/action-creators';
import _ from 'lodash';
import {filter} from 'lodash.filter';
import {incrementResource} from 'APP/app/reducers/players';
import {resources} from './setup';

function deal(structures, corners, hexData, roll){
  // loops through structures array from state
  structures.forEach(structure => {
    // determines number of cards to deal based on type
    var num;
    if(structure.type === 'city')  num = 2;
    if(structure.type === 'settlement')  num = 1;

    // using the corner_id from current structure, find corner in corner array
    var theCorner = _.filter(corners, function(corner){
      return corner.id === structure.corner_id;
    })[0];

    // loops through each hex in corner.hexes
    theCorner.hexes.forEach(hex => {
      // if the hex has an id, i.e. it's a true hex and not a dummy neighbor
      // && the token matches the roll passed in, fire incrementResource action
      if(hexData[hex.id] && hexData[hex.id].token === roll){
        var resource = resources[hexData[hex.id].resource];
        var player = structure.player;
        addAction(incrementResource(player, resource, num));
      }
    });
  });
}

function setupDeal(structures, corners, hexData){
  // for every token number on the map, deal adjoining settlements
  let tokens = [2,3,4,5,6,8,9,19,11,12];
  tokens.forEach(token => deal(structures, corners, hexData, token));
}

module.exports = {deal, setupDeal};
