import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {games, join, listen} from './game';

describe("Game reducer's", () => {
  let gamesObj;

  beforeEach('set up games obj', () => {
    gamesObj = {'RANDOM_KEY': 'gameWithFriends', 'ANOTHER_KEY': 'gameWithFamiy'}
  });

  describe('`gameID` reducer', () => {

    it('returns initial state of null for gameID', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });

    it('has `join` action creator with gameID payload (string)', () => {
      const joinActionFunction = {type: 'JOIN_GAME', gameID: 'RANDOM_KEY'};
      expect(join('RANDOM_KEY')).to.contain(joinActionFunction);
    });

    it('handles JOIN_GAME to update gameID on state', () => {
      expect(reducer(undefined, {})).to.equal(null);
      expect(reducer(undefined, {type:'JOIN_GAME', gameID: 'XYZ'})).to.equal('XYZ');
      expect(reducer(undefined, {type:'JOIN_GAME', gameID: 'ABC'})).to.equal('ABC');
    });
  })

  describe('`games` reducer (games)', () => {

    it('returns initial state of an empty object for games', () => {
      expect(games(undefined, {})).to.be.empty;
    });

    it('has `listen` action creator with games payload (obj)', () => {
      const listenFunction = {type: 'LOAD_GAMES', games: gamesObj};
      expect(listen(gamesObj)).to.contain(listenFunction);
    });

    it('handles LOAD_GAMES to update games obj on state', () => {
      expect(Object.keys(games(undefined, {}))).to.have.length(0);
      expect(Object.keys(games(undefined, {type: 'LOAD_GAMES', games: gamesObj}))).to.have.length(2);
      expect(games(undefined, {type: 'LOAD_GAMES', games: gamesObj})['RANDOM_KEY']).to.equal('gameWithFriends');
      expect(games(undefined, {type: 'LOAD_GAMES', games: gamesObj})['ANOTHER_KEY']).to.equal('gameWithFamiy');
    });
  })


})
