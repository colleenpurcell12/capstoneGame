import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {moveRobber} from './robber';

describe('Robber reducer (robberHex)', () => {

  it('returns its initial state with null value', () => {
    expect(reducer(undefined, {})).to.equal(null);
  });

  it('has `moveRobber` action creator with hexID integer payload', () => {
    const shiftRobberToTwo = { type: 'MOVE_ROBBER', hexID: 2}
    expect(moveRobber(2)).to.contain(shiftRobberToTwo);
  });

  it('handles MOVE_ROBBER to update robberHex position on state', () => {
    expect(reducer(undefined, {type:'MOVE_ROBBER', hexID:7})).to.equal(7);
    expect(reducer(7, {type:'MOVE_ROBBER', hexID: 15})).to.equal(15);
    expect(reducer(15, {type:'MOVE_ROBBER', hexID: 3})).to.equal(3);
  });

});
