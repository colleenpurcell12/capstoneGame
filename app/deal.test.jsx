import {expect} from 'chai'
import {deal} from 'APP/gameutils/setup'
import {thecorners} from 'APP/app/components/Board'

// import {incrementResource} from 'APP/app/reducers/players'


describe('Deal', () => {
  describe(' loops over the structures array', () => {
    const structures = [{corner_id: 32, owner: 'red', type: 'settlement'}]
    const hexData = [
      {token: 6, resource: 3},
      {token: 6, resource: 3},
      {token: 4, resource: 3}
    ]
    const corners = {
      '0,0,0:0,1,-1:1,0,-1': {
        hexes: [
          {id: 0},
          {id: 1},
          {id: 2}
        ],
        id: 32,
        neighbors: [],
        x: 5.5,
        y: 9.526279441628825,
      }
    }

    it('that calls incrementResource for each corners hex that matches token', () => {
      var roll = 6;
      var inc = 0
      deal(structures, corners, hexData, roll, inc)
      expect(inc).to.be.equal(2)
    })
  })
})
