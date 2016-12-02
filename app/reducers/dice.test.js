import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {newDiceRoll} from './dice';

describe('Dice reducer (diceRoll)', () => {

  it('returns its initial state with null d1 and d2 values', () => {
    expect(reducer(undefined, {})).to.contain({d1: null, d2: null})
  })

  it('should have a `newDiceRoll` action creator to update dice rolls', () => {
    const diceRoll = {d1:5, d2:7};
    const updateDice = { type: 'DICE_ROLL', diceRoll}
    expect(newDiceRoll(diceRoll)).to.contain(updateDice)
  })

  it('should handle a DICE_ROLL', () => {
    expect(reducer(undefined, {type:'DICE_ROLL', diceRoll: {d1:1, d:2}})).to.contain({d1:1, d:2});

    expect(reducer({d1:1, d:2}, {type:'DICE_ROLL', diceRoll: {d1:7, d:3}})).to.contain({d1:7, d:3});

    expect(reducer({d1:7, d:3}, {type:'DICE_ROLL', diceRoll: {d1:2, d:2}})).to.contain({d1:2, d:2});

  })

});
