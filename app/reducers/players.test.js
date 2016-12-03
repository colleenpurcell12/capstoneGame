import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {addPlayer, incrementResource, decrementResource, addPoint, hasBought} from './players';

describe('Players reducer (players)', () => {
  const player = {
    name: 'The Martian'
  }
  const player2 = {
    name: 'Space Dog',
    cardsResource: {crops:0, fuel:0, ice:0, iron:0, solar:0}
  }
  const resource = "fuel";

  it('returns its initial state of an empty array', () => {
    expect(reducer(undefined, {})).to.be.empty;
    expect(reducer(undefined, {})).to.have.length(0);
  });

  it('has `addPlayer` action creator with player payload (string of their name)', () => {
   const addPlayerFunction = {type: 'ADD_PLAYER', player: player.name};
   expect(addPlayer(player.name)).to.contain(addPlayerFunction);
  });

  it('has `incrementResource` action creator with player (obj), resource(str), count(int) payloads', () => {
    const incrementFunction = {type: 'INCREMENT_RESOURCE', player, resource, count:1};
    expect(incrementResource(player,resource,1)).to.contain(incrementFunction);
  });

  it('has `decrementResource` action creator with player (obj), resource(str), count(int) payloads', () => {
    const decrementFunction = {type: 'DECREMENT_RESOURCE', player, resource, count:2};
    expect(decrementResource(player,resource,2)).to.contain(decrementFunction);
  });

  it('has `addPoint` action creator with player payload (string of their name', () => {
    const addPointFunction = {type: 'ADD_POINT', player: player.name};
    expect(addPoint(player.name)).to.contain(addPointFunction);
  });

  it('has `hasBought` action creator with name (string of player name) and property(string type of property purchase) payloads', () => {
    const hasBoughtFunction = {type: 'HAS_BOUGHT', name: player.name, property: 'hasBoughtASettlement'};
    expect(hasBought(player.name, 'hasBoughtASettlement')).to.contain(hasBoughtFunction);
  });


  it('handles ADD_PLAYER to add incoming player to players array on state', () => {
    expect(reducer(undefined, {type: 'ADD_PLAYER', player: 'Elon Musk'})).to.have.length(1);
    expect(reducer(undefined, {type: 'ADD_PLAYER', player: 'Elon Musk'})[0].name).to.equal('Elon Musk');
    expect(reducer([player], {type: 'ADD_PLAYER', player: 'Space Cat'})[1].name).to.equal('Space Cat');
    expect(reducer([player], {type: 'ADD_PLAYER', player: 'Space Cat'})[0].name).to.equal('The Martian');
    expect(reducer([player, player, player], {type: 'ADD_PLAYER', player: 'Space Cat'})).to.have.length(4);
    expect(reducer([player, player, player,player, player], {type: 'ADD_PLAYER', player: 'Space Cat'})).to.have.length(6);
  });

  it('handles INCREMENT_RESOURCE to return player with increased resource on state', () => {
    expect(reducer([player, player2], {type: 'INCREMENT_RESOURCE', player: 'Space Dog', resource: 'crops', count:2})[1].name).to.equal('Space Dog');
    expect(reducer([player, player2], {type: 'INCREMENT_RESOURCE', player: 'Space Dog', resource: 'crops', count:3})[1].cardsResource['crops']).to.equal(5);
  });



});
