import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {addSelection, removeSelection, clearSelection} from './selection';

describe('Selection reducer (selections)', () => {

  const firstSelection = {
    hexes: [{id:4,q:-1,r:0,s:1},{id:1,q:-2,r:1,s:1},{id:0,q:-2,r:0,s:2}],
    neighbors: [1,3,6],
    id: 2,
    x: -27.5,
    y: -9.5,
  };

  const secondSelection = {
    hexes: [{id:4,q:-1,r:0,s:1},{id:1,q:-2,r:1,s:1},{id:0,q:-2,r:0,s:2}],
    neighbors: [1,3,6],
    id: 4,
    x: -27.5,
    y: -9.5,
  };

  it('returns its initial state of an empty array (no selections)', () => {
    expect(reducer(undefined, {})).to.be.empty;
  });

  it('has `addSelection` action creator with `selection` object payload', () => {
    const selectionToAdd = { type: 'ADD_SELECTION', selection: firstSelection};
    expect(addSelection(firstSelection)).to.contain(selectionToAdd);
  });

  it('has `removeSelection` action creator with `id` payload', () => {
    const selectionToRemove= { type: 'REMOVE_SELECTION', id: firstSelection.id};
    expect(removeSelection(firstSelection.id)).to.contain(selectionToRemove);
  });

  it('has `clearSelection` action creator with no payload to update selections state (emptying)', () => {
    expect(reducer(undefined, addSelection(firstSelection))).to.contain(firstSelection);
    expect(reducer([firstSelection], addSelection(secondSelection))).to.contain(firstSelection,secondSelection);
    expect(clearSelection()).to.contain({type:'CLEAR_SELECTION'});
    expect(reducer([firstSelection,secondSelection], clearSelection())).to.be.empty;
  });

  it('handles ADD_SELECTION when passed a selection object to add to selections state', () => {
    expect(reducer(undefined, addSelection(firstSelection))).to.contain(firstSelection);
    expect(reducer(undefined, addSelection(secondSelection))).to.not.contain(firstSelection);
    expect(reducer(undefined, addSelection(secondSelection))).to.contain(secondSelection);
    expect(reducer(undefined,{})).to.have.length(0);
    expect(reducer(undefined, addSelection(firstSelection))).to.have.length(1);
    expect(reducer([firstSelection,secondSelection], addSelection(firstSelection))).to.have.length(3);
    expect(reducer([firstSelection,secondSelection,firstSelection,secondSelection], addSelection(secondSelection))).to.have.length(5);
  })

  it('handles REMOVE_SELECTION when passed a selection id to delete from selections state', () => {
    expect(reducer([firstSelection], removeSelection(firstSelection.id))).to.have.length(0);
    expect(reducer([secondSelection], removeSelection(secondSelection.id))).to.be.empty;
    expect(reducer([firstSelection,secondSelection], removeSelection(firstSelection.id))).to.not.contain(firstSelection);
    expect(reducer([firstSelection, secondSelection, secondSelection, firstSelection,firstSelection], removeSelection(firstSelection.id))).to.have.length(2);
    expect(reducer([firstSelection, secondSelection, secondSelection, firstSelection, firstSelection], removeSelection(secondSelection.id))).to.have.length(3);
  })

  it('handles CLEAR_SELECTION to empty selections state', () => {
    expect(reducer(undefined, clearSelection())).to.be.empty;
    expect(reducer([firstSelection, secondSelection, secondSelection, firstSelection,firstSelection], clearSelection())).to.be.empty;
    expect(reducer([secondSelection], clearSelection())).to.have.length(0);
  })

});
