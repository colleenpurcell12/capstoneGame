import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer from './usersArray';

describe('UsersArray reducer (userArray)', () => {

  const user1 = { id: 0,  color: 'red' };
  const user2 = { id: 1,  color: 'blue' };
  const user3 = { id: 2,  color: 'green' };
  const user4 = { id: 3,  color: 'brown' };

  it('returns its initial state of an array of user objects (`id`=>int from 0-3 and unique `color`=>string property)', () => {
    expect(reducer(undefined, {})).to.contain({ id: 0,  color: 'red' });
    expect(reducer(undefined, {})).to.contain({ id: 1,  color: 'blue' });
    expect(reducer(undefined, {})).to.contain({ id: 2,  color: 'green' });
    expect(reducer(undefined, {})).to.contain({ id: 3,  color: 'brown' });
  })

  it('has only four user spaces', () => {
    expect(reducer(undefined, {})).to.have.length(4);
  })

});
