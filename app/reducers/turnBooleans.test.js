import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import {isFirstRound, isSettingUp, turnArray, nextRound, nextRoundStep2, shiftTurns, startNormGamePlay} from './turnBooleans';

describe('turnBooleans reducers (isFirstRound, isSettingUp, turnArray)', () => {

  describe('isFirstRound reducer', () => {

    it('returns its initial state of true', () => {
      expect(isFirstRound(undefined, {})).to.equal(true);
    });

    it('has `nextRound` action creator with no payload', () => {
      const nextRoundFunction = {type: 'NEXT_ROUND'};
      expect(nextRound()).to.contain(nextRoundFunction);
    });

    it('handles NEXT_ROUND to update isFirstRound to false on state', () => {
      expect(isFirstRound(undefined, {type: 'NEXT_ROUND'})).to.equal(false);
    });

  });

  describe('isSettingUp reducer', () => {

    it('returns its initial state of true', () => {
      expect(isSettingUp(undefined, {})).to.equal(true);
    });

    it('has `startNormGamePlay` action creator with no payload', () => {
     const startGameFunction = {type: 'START_GAME_PLAY'};
     expect(startNormGamePlay()).to.contain(startGameFunction);
    });

    it('handles START_GAME_PLAY to update isSettingUp to false on state', () => {
      expect(isSettingUp(undefined, {type: 'START_GAME_PLAY'})).to.equal(false);
    });

  });

  describe('turnArray reducer', () => {

    it('returns its initial state of an array with 2,3,4', () => {
      expect(turnArray(undefined, {})).to.contain(2,3,4);
      expect(turnArray(undefined, {})).to.have.length(3);
    });

    it('has `shiftTurns` action creator with no payload', () => {
     const shiftTurnsFunction = {type: 'SHIFT_TURNS'};
     expect(shiftTurns()).to.contain(shiftTurnsFunction);
    });

    it('handles NEXT_ROUND_STEP2 to update the turnArray to only [3,2,1] on state', () => {
      expect(turnArray(undefined, {type: 'NEXT_ROUND_STEP2'})).to.contain(3,2,1);
      expect(turnArray(undefined, {type: 'NEXT_ROUND_STEP2'})).to.have.length(3);
      expect(turnArray([5,6,7,8], {type: 'NEXT_ROUND_STEP2'})).to.contain(3,2,1);
      expect(turnArray([1,2,3,4,5,6,7,8,9], {type: 'NEXT_ROUND_STEP2'})).to.have.length(3);
    });

    it('handles SHIFT_TURNS to update the turnArray to an array containing everything except first element', () => {
      expect(turnArray(undefined, {})).to.contain(2,3,4);
      expect(turnArray(undefined, {type:'SHIFT_TURNS'})).to.contain(3,4);
      expect(turnArray([3,4,5,6], {type:'SHIFT_TURNS'})).to.contain(4,5,6);
      expect(turnArray([3,4,5,6], {type:'SHIFT_TURNS'})).to.have.length(3);
    });

  });

});
