import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {addBoardStructure, upgradeBoardStructure} from './structure';

describe('Structure reducer (structure)', () => {
  const structure = {
    corner_id: 2,
    owner: 'red',
    player: 'Elon Musk',
    type: 'settlement'
  }

  const structure2 = {
    corner_id: 5,
    owner: 'green',
    player: 'Space Alien',
    type: 'settlement'
  }

  it('returns its initial state of an empty array', () => {
    expect(reducer(undefined, {})).to.be.empty;
    expect(reducer(undefined, {})).to.have.length(0);
  });

  it('has `addBoardStructure` action creator with structure object payload', () => {
   const addStructureFunction = {type: 'ADD_STRUCTURE', structure};
   expect(addBoardStructure(structure)).to.contain(addStructureFunction);
  });

  it('has `upgradeBoardStructure` action creator with corner_id (integer) payload', () => {
   const upgradeStructureFunction = {type: 'UPGRADE_SETTLEMENT', corner_id: structure.id};
   expect(upgradeBoardStructure(structure.id)).to.contain(upgradeStructureFunction);
  });

  it('handles ADD_STRUCTURE to add structure obj to structure array on state', () => {
    expect(reducer(undefined, {type: 'ADD_STRUCTURE', structure})).to.contain(structure);
    expect(reducer(undefined, {type: 'ADD_STRUCTURE', structure: structure2})).to.have.length(1);
    expect(reducer(undefined, {type: 'ADD_STRUCTURE', structure: structure2})).to.have.contain(structure2);
    expect(reducer([structure], {type: 'ADD_STRUCTURE', structure: structure2})).to.contain(structure,structure2);
    expect(reducer([structure, structure2, structure2], {type: 'ADD_STRUCTURE', structure})).to.have.length(4);
  });

  it('handles UPGRADE_SETTLEMENT to find settlements with matching corner_id and upgrade their type to city', () => {
    expect(reducer(undefined, {type: 'UPGRADE_SETTLEMENT', corner_id: structure.corner_id})).to.be.empty;
    expect(reducer([structure], {type:'UPGRADE_SETTLEMENT', corner_id: structure.corner_id})[0].type).to.equal('city');
    expect(reducer([structure,structure2], {type:'UPGRADE_SETTLEMENT', corner_id: structure2.corner_id})[1].type).to.equal('city');
  });

  it('handles UPGRADE_SETTLEMENT to not change amount of structures in structures array on state', () => {
    expect(reducer([structure,structure2], {type:'UPGRADE_SETTLEMENT', corner_id: structure2.corner_id})[1].type).to.equal('city');
    expect(reducer([structure,structure2], {type:'UPGRADE_SETTLEMENT', corner_id: structure.corner_id})).to.contain(structure);
    expect(reducer([structure,structure2], {})).to.have.length(2);
    expect(reducer([structure,structure2], {type:'UPGRADE_SETTLEMENT', corner_id: structure.corner_id})).to.contain(structure2);
  });

});
