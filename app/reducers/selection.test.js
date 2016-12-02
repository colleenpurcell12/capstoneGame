import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {addSelection, removeSelection, clearSelection} from './selection';

describe('Selection reducer (selections)', () => {

  const selectionObj = {
    hexes: [{id:4,q:-1,r:0,s:1},{id:1,q:-2,r:1,s:1},{id:0,q:-2,r:0,s:2}],
    neighbors: [1,3,6],
    id: 2,
    x: -27.5,
    y: -9.5,
  };

  it('returns its initial state of an empty array (no selections)', () => {
    expect(reducer(undefined, {})).to.be.empty;
  });

  xit('should have a `addSelection` action creator to update selections state', () => {

    const newRoad = { type: 'ADD_SELECTION', selection: selectionObj};
    expect(addRoadToRoads(roadObj)).to.contain(newRoad);

  });

  xit('should handle ADD_ROAD to have an array of all selections', () => {


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
