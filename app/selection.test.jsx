import {expect} from 'chai'
import { tokenArray, resourcesArray, generate} from 'APP/gameutils/setup'
import {boardConfig} from 'APP/gameutils/boardConfig'
import {addSelection, removeSelection, clearSelection} from 'APP/app/reducers/selection'
import sinon from 'sinon'

let grid = generate(boardConfig);
var corners = grid.corners
var hexData = resourcesArray.map((res, i) => {
  return {token: tokenArray[i], resource: res }
})

describe('selectCorner', () => {

  describe('new corner', () => {
    it('should create an action to increment Resources', () => {
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
