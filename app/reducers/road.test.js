import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {addRoadsToRoads} from './road';

describe('Road reducer (roads)', () => {

  it('returns its initial state of an empty array (no selected roads)', () => {
    expect(reducer(undefined, {})).to.be.empty;
  });

  xit('should have a `setNextTurn` action creator to update turnInfo on state', () => {
    const nextPlayer = { type: 'SET_NEXT_TURN', player: 2};
    expect(setNextTurn(2)).to.contain(nextPlayer);
  });

  xit('should handle SET_NEXT_TURN when passed a single integer value', () => {
    const playerTurnsArray = [2,3,4,4,3,2,1];
    expect(reducer(undefined,{})).to.equal(1);
    expect(reducer(1, {type:'SET_NEXT_TURN', player: playerTurnsArray.shift()})).to.equal(2);
    expect(reducer(2, {type:'SET_NEXT_TURN', player: playerTurnsArray.shift()})).to.equal(3);
    expect(reducer(3, {type:'SET_NEXT_TURN', player: playerTurnsArray.shift()})).to.equal(4);
    expect(reducer(4, {type:'SET_NEXT_TURN', player: playerTurnsArray.shift()})).to.equal(4);
    expect(reducer(4, {type:'SET_NEXT_TURN', player: playerTurnsArray.shift()})).to.equal(3);
    expect(reducer(3, {type:'SET_NEXT_TURN', player: playerTurnsArray.shift()})).to.equal(2);
    expect(reducer(2, {type:'SET_NEXT_TURN', player: playerTurnsArray.shift()})).to.equal(1);
  });

});
