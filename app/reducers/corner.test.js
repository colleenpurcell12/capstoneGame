import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {putCorners} from './corner';

describe('Corner reducer (corners)', () => {

  const cornerSet = {
    '0,0,0:0,1,-1:1,0,-1': {
      id: 32,
      hex: [{id:14},{id:10},{id:9}],
      neighbors: [20,31,33]
    }
  }

  const cornerSet2 = {
    '0,1,-1:0,2,-2:1,1,-2': {
      id: 31,
      hex: [{id:14},{id:9},{id:13}],
      neighbors: [30,32,42]
    }
  }


  it('returns its initial state of an empty array', () => {
    expect(reducer(undefined, {})).to.be.empty;
  });

  it('should have a `putCorners` action creator to update robberHex position on state', () => {
    const cornersToAdd = { type: 'PUT_CORNERS', corners: cornerSet};
    expect(putCorners(cornerSet)).to.contain(cornersToAdd);
  });

  it('should handle PUT_CORNERS when passed a single integer value', () => {
    expect(reducer(undefined, {type:'PUT_CORNERS', corners: cornerSet})).to.equal(cornerSet);
    expect(reducer(cornerSet, {type:'PUT_CORNERS', corners: cornerSet2})).to.equal(cornerSet2);
  });

});
