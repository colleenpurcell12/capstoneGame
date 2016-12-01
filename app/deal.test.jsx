import {expect} from 'chai'
import {deal, setupDeal} from 'APP/gameutils/setup'
import { addAction } from 'APP/app/reducers/action-creators'

// structures, corners, and hexData are passed in from store
// how to get corners from Board? put on state
// var roll = this.props.diceRoll.d1 + this.props.diceRoll.d2
var structures
var corners
var hexData 

describe('Deal', () => {
  describe(' loops over the structures array', () => {
    it('that calls incrementResource for each corners hex that matches token', () => {
      var roll = 4;
      deal(structures, corners, hexData, roll)
      var playerstats = store.getState(players)
      var total = playerstats[2].cardsTotal()
      expect(total).to.be.equal(1)
    })
  })
})
