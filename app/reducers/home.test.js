import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {startGame} from './home';

describe('Home reducer (inProgress)', () => {

  it('returns the initial state with default inProgress value', () => {
    expect(reducer(undefined, {})).to.equal(false)
  })

  it('should have a `startGame` action creator to start gameplay', () => {
    const bool = true;
    const setsGameInMotion = { type: 'INITIALIZE_GAME', bool}
    expect(startGame(bool)).to.contain(setsGameInMotion);
  })

  it('should handle INITIALIZE_GAME when passed true', () => {
    expect(reducer(undefined, {type:'INITIALIZE_GAME', bool: true})).to.equal(true);
    expect(reducer(false, {type:'INITIALIZE_GAME', bool: true})).to.equal(true);
    expect(reducer(true, {type:'INITIALIZE_GAME', bool: true})).to.equal(true);
  })

  it('should handle INITIALIZE_GAME when passed false', () => {
    expect(reducer(undefined, {type:'INITIALIZE_GAME', bool: false})).to.equal(false);
    expect(reducer(false, {type:'INITIALIZE_GAME', bool: false})).to.equal(false);
    expect(reducer(true, {type:'INITIALIZE_GAME', bool: false})).to.equal(false);
  })

});

