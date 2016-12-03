import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {startGame} from './home';

describe('Home reducer (inProgress)', () => {

  it('returns the initial state with default inProgress value', () => {
    expect(reducer(undefined, {})).to.equal(false)
  })

  it('has `startGame` action creator with bool (boolean) payload', () => {
    const bool = true;
    const setsGameInMotion = { type: 'INITIALIZE_GAME', bool}
    expect(startGame(bool)).to.contain(setsGameInMotion);
  })

  it('handles INITIALIZE_GAME when passed true to set game inProgress to true on state', () => {
    expect(reducer(undefined, {type:'INITIALIZE_GAME', bool: true})).to.equal(true);
    expect(reducer(false, {type:'INITIALIZE_GAME', bool: true})).to.equal(true);
    expect(reducer(true, {type:'INITIALIZE_GAME', bool: true})).to.equal(true);
  })

  it('handles INITIALIZE_GAME when passed false and does not set inProgress to true on state', () => {
    expect(reducer(undefined, {type:'INITIALIZE_GAME', bool: false})).to.equal(false);
    expect(reducer(false, {type:'INITIALIZE_GAME', bool: false})).to.equal(false);
    expect(reducer(true, {type:'INITIALIZE_GAME', bool: false})).to.equal(false);
  })

});

