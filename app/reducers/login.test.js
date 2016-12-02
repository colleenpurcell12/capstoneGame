import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {loginUser} from './login';

describe('login reducer', () => {

  it('returns the initial state with loggedInUser value of null', () => {
    expect(reducer(undefined, {})).to.equal(null)
  });

  it('should have a loginUser action creator to set the loggedInUser on state', () => {
    const user = {name: 'Elon Musk'};
    const loggedInUser = { type: 'SET_CURRENT_USER', loggedInUser: user}
    expect(loginUser(user)).to.contain(loggedInUser);
  });

  it('should handle SET_CURRENT_USER when passed user info', () => {
    const user = {name: 'Space Alien'};
    expect(reducer(undefined, {type:'SET_CURRENT_USER', loggedInUser: user})).to.contain(user);
  });

  it('should handle SET_CURRENT_USER when passed null value', () => {
    const user = {name: 'Ice Cap'}
    expect(reducer(undefined, {type:'SET_CURRENT_USER', loggedInUser: user})).to.contain(user);
    expect(reducer(user, {type:'SET_CURRENT_USER', loggedInUser: null})).to.equal(null);
  });

});
