import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {drawCard, initializeDeck} from './pioneerCards';
import {deck, makeDeck} from 'APP/gameutils/pioneerCardConfig'
import {shuffle} from 'APP/gameutils/setup'

describe('PioneerCards reducer', () => {

  it('returns empty array before initialization', () => {
    expect(reducer(undefined, {}).length).to.equal(0);
  });

  it('has `initializeDeck` action creator with shuffled deck payload', () => {
    var shuffled = shuffle(makeDeck(deck))
    const deckaction = {type: 'INITIALIZE_DECK', deck: shuffled};
    expect(initializeDeck(shuffled)).to.contain(deckaction);
  });

  it('handles SET_NEXT_TURN when passed a single integer value to update turnInfo on state', () => {
    var test = ['a', 'b', 'c']
    expect(reducer(test, {type:'DRAW_CARD', null })[0]).to.equal('b')
  });

});
