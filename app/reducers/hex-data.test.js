import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {assignHexData} from './hex-data';

describe('Hex-data reducer (hexData)', () => {
  const hexes = [{resource:2, token:5},{resource:1, token:3},{resource:1, token:8}];
  const otherHexes = [{resource:1, token:3},{resource:4, token:5}];

  it('returns its initial state of an empty array', () => {
    expect(reducer(undefined, {})).to.be.empty;
    expect(reducer(undefined, {})).to.eql([]);
  })

  it('has `assignHexData` action creator with hexes array payload', () => {
    const updateHexes = { type: 'ASSIGN_HEX_DATA', hexes}
    expect(assignHexData(hexes)).to.contain(updateHexes)
  })

  it('handles ASSIGN_HEX_DATA to update hexData array of hex objects ({resource:int, token:int) on state', () => {
    expect(reducer(undefined, {type:'ASSIGN_HEX_DATA', hexes})).to.contain(hexes[0],hexes[1],hexes[2]);
    expect(reducer(hexes, {type:'ASSIGN_HEX_DATA', hexes: otherHexes})).to.contain(otherHexes[0],otherHexes[1]);
    expect(reducer(hexes, {type:'ASSIGN_HEX_DATA', hexes: otherHexes})).to.have.length(2);
    expect(reducer(hexes, {type:'ASSIGN_HEX_DATA', hexes: otherHexes})).to.not.contain(hexes[0],hexes[1],hexes[2]);
  })

});
