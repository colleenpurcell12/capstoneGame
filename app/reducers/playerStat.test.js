import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {setNextTurn} from './playerStat';

describe('PlayerStat reducer (turnInfo)', () => {

  it('returns its initial state of 1 (for first player)', () => {
    expect(reducer(undefined, {})).to.equal(1);
  });

  it('has `setNextTurn` action creator with player integer payload', () => {
    const nextPlayer = { type: 'SET_NEXT_TURN', player: 2};
    expect(setNextTurn(2)).to.contain(nextPlayer);
  });

  it('handles SET_NEXT_TURN when passed a single integer value to update turnInfo on state', () => {
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
