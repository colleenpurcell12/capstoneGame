import {expect} from 'chai'
import makeBoard from './board'

describe('makeBoard(levels, origin)', () => {
  describe('with 0 levels', () => {
    const board = makeBoard(0)

    xit('just emits one hex at 0,0,0', () => {
      expect(board.hexes).to.have.length(1)
      const hex = board.hexes[0]
      expect(hex.id).to.eql(0)
      expect(hex.coords).to.deep.equal([0, 0, 0])
      expect(hex.corners).to.have.length(6)
      hex.corners.forEach((corner, i) => {
        expect(corner.hex).to.eql(hex)
        expect(corner.corner).to.eql(i)
      })
    })

    xit('with 0 levels, emits corners for the hex at 0,0,0', () => {
      expect(board.corners).to.deep.equal(board.hexes[0].corners)
    })
  })
    // expect(board).to.deep.equal({
    //   hexes: [
    //     {
    //       id: 0,
    //       coords: [0, 0, 0],
    //       corners: [0, 1, 2, 3, 4, 5]
    //     },
    //   ],
    //   corners: [
    //     { id: 0, hexes: [{id: 0, corner: 0}], edges: [0, 5]},
    //     { id: 1, hexes: [{id: 0, corner: 1}], edges: [0, 1]},
    //     { id: 2, hexes: [{id: 0, corner: 2}], edges: [1, 2]},
    //     { id: 3, hexes: [{id: 0, corner: 3}], edges: [2, 3]},
    //     { id: 4, hexes: [{id: 0, corner: 4}], edges: [3, 4]},
    //     { id: 5, hexes: [{id: 0, corner: 5}], edges: [4, 5]},
    //   ],
    //   edges: [
    //     {id: 0, from: 0, to: 1},
    //     {id: 1, from: 1, to: 2},
    //     {id: 2, from: 2, to: 3},
    //     {id: 3, from: 3, to: 4},
    //     {id: 4, from: 4, to: 5},
    //     {id: 5, from: 5, to: 0},
    //   ],
    // })
})
