import {expect} from 'chai'
import {assignHexInfo, tokenArray, resourcesArray, generate} from 'APP/gameutils/setup'
import { addAction } from 'APP/app/reducers/action-creators'
import {incrementResource } from 'APP/app/reducers/players';
import {boardConfig} from 'APP/gameutils/boardConfig'
import {deal, setupDea} from 'APP/gameutils/deal'
import sinon from 'sinon'

let grid = generate(boardConfig);
var corners = grid.corners
var hexData = resourcesArray.map((res, i) => {
  return {token: tokenArray[i], resource: res }
})

describe('Deal', () => {

  var roll = hexData[2].token // corner 12 is on hex #3
  var structures = [ {owner: 'red', corner_id: 12, type: 'settlement', player: 'Sami Lugar' }]

  describe('actions', () => {
    it('should create an action to increment Resources', () => {
      let player = structures[0].player
      let resource = 'crops'
      const expectedAction = {
        type: 'INCREMENT_RESOURCE',
        player,
        resource,
        count: 1
      }
      expect(incrementResource(player, resource, 1)).to.deep.equal(expectedAction)
    })
  })

  describe(' loops over the structures array', () => {
    it('that calls incrementResource for each corners hex that matches token', () => {
      var check = sinon.spy(incrementResource)
      deal(structures, corners, hexData, roll)
      expect(check.called).to.be.true
    })
  })

})
