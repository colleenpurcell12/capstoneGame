import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {addRoadToRoads} from './road';

describe('Road reducer (roads)', () => {

  it('returns its initial state of an empty array (no selected roads)', () => {
    expect(reducer(undefined, {})).to.be.empty;
  });

  it('has `addRoadsToRoads` action creator with road object payload', () => {
    const roadObj = {
      color: 'red',
      coordinates: [[11,19],[11,21]],
      corners: [33,33],
      userId: 1

    }
    const newRoad = { type: 'ADD_ROAD', road: roadObj};
    expect(addRoadToRoads(roadObj)).to.contain(newRoad);

  });

  it('handles ADD_ROAD to update roads on state to have all road additions', () => {
    const road1 = {
      color: 'red',
      coordinates: [[11,19],[11,21]],
      corners: [33,33],
      userId: 1
    }
    const road2 = {
      color: 'red',
      coordinates: [[11,19],[11,21]],
      corners: [33,33],
      userId: 1
    }
    const road3 = {
      color: 'red',
      coordinates: [[11,19],[11,21]],
      corners: [33,33],
      userId: 1
    }

    expect(reducer(undefined, {type:'ADD_ROAD', road: road1})).to.contain(road1);
    expect(reducer([road1], {type:'ADD_ROAD', road: road2})).to.contain(road1,road2);
    expect(reducer([road1,road2], {type:'ADD_ROAD', road: road3})).to.contain(road1,road2,road3);
  });

});
