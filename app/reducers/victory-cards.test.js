import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {assignVictoryCards} from './victory-cards';

describe('Victory-cards reducer (victoryCards)', () => {
  let player1, player2, player3;

  beforeEach('assigns player1 and player2 variables', () => {
    player1 = 'Dolores Abernathy';
    player2 = 'Bernard Lowe';
    player3 = 'Wyatt';
  });

  it('returns initial state of an obj with `road` and `army` properties with values of false', () => {
    expect(Object.keys(reducer(undefined, {}))).to.have.length(2);
    expect(Object.keys(reducer(undefined, {}))[0]).to.equal('road');
    expect(Object.keys(reducer(undefined, {}))[1]).to.equal('army');
    expect(reducer(undefined, {})['road']).to.be.false;
    expect(reducer(undefined, {})['army']).to.be.false;
  });

  it('has `assignVictoryCards` action creator with assignedPlayers payload (obj with name for road and army)', () => {
    const assignedPlayers = {road: player1, army: player2}
    const assignVictoryFunction = {type: 'ASSIGN_VICTORY_CARDS', assignedPlayers };
    expect(assignVictoryCards(assignedPlayers)).to.contain(assignVictoryFunction);
  })

  it('handles ASSIGN_VICTORY_CARDS to update name of Victory Card holder', () => {
    expect(reducer(undefined, {})['road']).to.equal(false);
    expect(reducer(undefined,{type: 'ASSIGN_VICTORY_CARDS', assignedPlayers: {road:player1, army: player1}})['road']).to.equal(player1);
    expect(reducer({road:player1, army:player1}, {type: 'ASSIGN_VICTORY_CARDS', assignedPlayers: {road:player2, army: player1}})['road']).to.equal(player2);
    expect(reducer({road:player2, army:player1}, {type: 'ASSIGN_VICTORY_CARDS', assignedPlayers: {road:player2, army: player2}})['army']).to.equal(player2);
    expect(reducer({road:player2, army:player2}, {type: 'ASSIGN_VICTORY_CARDS', assignedPlayers: {road:player2, army: player3}})['army']).to.equal(player3);
  })

});
