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

xdescribe('selectCorner', () => {

  describe('new corner', () => {
    var corner = {

    }
    it('should create an action to addSelection', () => {

      const expectedAction = {
        type: 'ADD_SELECTION',
        corner
      }
      expect(addSelection(corner)).to.deep.equal(expectedAction)
    })
    it('should create an action to removeSelection', () => {

      const expectedAction = {
        type: 'REMOVE_SELECTION',
        id
      }
      expect(removeSelection(corner)).to.deep.equal(expectedAction)
    })
    it('should create an action to removeSelection', () => {
      const expectedAction = {
        type: 'CLEAR_SELECTION',
        id
      }
      expect(clearSelection(corner)).to.deep.equal(expectedAction)
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
