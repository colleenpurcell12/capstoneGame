import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {loginUser} from './login';

describe('Login reducer (loggedInUser)', () => {

  it('returns the initial state with loggedInUser value of null', () => {
    expect(reducer(undefined, {})).to.equal(null)
  });

  it('has a `loginUser` action creator with loggedInUser object payload', () => {
    const user = {name: 'Elon Musk'};
    const loggedInUser = { type: 'SET_CURRENT_USER', loggedInUser: user}
    expect(loginUser(user)).to.contain(loggedInUser);
  });

  it('handles SET_CURRENT_USER to update loggedInUser on state', () => {
    const user = {name: 'Space Alien'};
    expect(reducer(undefined, {type:'SET_CURRENT_USER', loggedInUser: user})).to.contain(user);
  });

  it('handles SET_CURRENT_USER to set the loggedInUser to null on state', () => {
    const user = {name: 'Ice Cap'}
    expect(reducer(undefined, {type:'SET_CURRENT_USER', loggedInUser: user})).to.contain(user);
    expect(reducer(user, {type:'SET_CURRENT_USER', loggedInUser: null})).to.equal(null);
  });

});
