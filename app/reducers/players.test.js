import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')());
import reducer, {addPlayer, incrementResource, decrementResource, addPoint, subtractPoint, hasBought} from './players';

describe('Players reducer (players)', () => {
  let player, player2, resource;
  beforeEach('set up new player and player2', () => {
    player = {
      name: 'The Martian',
      cardsResource: {crops:0, fuel:0, ice:0, iron:0, solar:0},
      points: 0,
      pioneerCards: {
        knights: 0,
        vp: 0,
        rb: 0,
        monopoly: 0,
        yop: 0,
      },
      army: 0,
    }
    player2 = {
      name: 'Space Dog',
      cardsResource: {crops:0, fuel:0, ice:0, iron:0, solar:0},
      points:0,
      pioneerCards: {
        knights: 0,
        vp: 0,
        rb: 0,
        monopoly: 0,
        yop: 0,
      },
      army: 0,
    }
    resource = "fuel";
  });

  it('returns its initial state of an empty array', () => {
    expect(reducer(undefined, {})).to.be.empty;
    expect(reducer(undefined, {})).to.have.length(0);
    expect(reducer(undefined, {})).to.eql([]);
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

  it('has `subtractPoint` action creator with player (string of their name) and points (int)', () => {
    const subtractFunction = {type: 'SUBTRACT_POINT', player: player.name, points: 1};
    expect(subtractPoint(player.name, 1)).to.contain(subtractFunction);
  });

  it('has `hasBought` action creator with name (string of player name) and property(string type of property purchase) payloads', () => {
    const hasBoughtFunction = {type: 'HAS_BOUGHT', name: player.name, property: 'hasBoughtASettlement'};
    expect(hasBought(player.name, 'hasBoughtASettlement')).to.contain(hasBoughtFunction);
  });

  it('handles ADD_PLAYER to add incoming player as an obj with their name to players array on state', () => {
    expect(reducer(undefined, {type: 'ADD_PLAYER', player: 'Elon Musk'})).to.have.length(1);
    expect(reducer(undefined, {type: 'ADD_PLAYER', player: 'Elon Musk'})[0].name).to.equal('Elon Musk');
    expect(reducer([player], {type: 'ADD_PLAYER', player: 'Space Cat'})[0].name).to.equal('The Martian');
    expect(reducer([player], {type: 'ADD_PLAYER', player: 'Space Cat'})[1].name).to.equal('Space Cat');
    expect(reducer([player, player, player], {type: 'ADD_PLAYER', player: 'Space Cat'})).to.have.length(4);
    expect(reducer([player, player, player,player, player], {type: 'ADD_PLAYER', player: 'Space Cat'})).to.have.length(6);
  });

  it('handles ADD_PLAYER to add incoming players as an obj with cardsTotal property that is a function', () => {
    expect(reducer(undefined, {type: 'ADD_PLAYER', player})).to.have.length(1);
    expect(reducer(undefined, {type: 'ADD_PLAYER', player})[0].cardsTotal()).to.equal(0);
    expect(reducer([player], {type: 'ADD_PLAYER', player: player2})[1].cardsTotal()).to.equal(0);

  });

  it('handles ADD_PLAYER to add incoming players as an obj with points property', () => {
    expect(reducer(undefined, {type: 'ADD_PLAYER', player: 'Elon Musk'})[0].points).to.equal(0);
    expect(reducer([player], {type: 'ADD_PLAYER', player: 'Space Cat'})[1].points).to.equal(0);
    expect(reducer([player, player2], {type: 'ADD_PLAYER', player: 'Space Cat'})[0].points).to.equal(0);
  });

  it('handles ADD_PLAYER to add incoming players as an obj with hasBoughtASettlement and hasBoughtARoad properties', () => {
    expect(reducer(undefined, {type: 'ADD_PLAYER', player: 'Elon Musk'})).to.have.length(1);
    expect(reducer(undefined, {type: 'ADD_PLAYER', player: 'Elon Musk'})[0].hasBoughtASettlement).to.equal(false);
    expect(reducer(undefined, {type: 'ADD_PLAYER', player: 'Elon Musk'})[0].hasBoughtARoad).to.equal(false);
    expect(Object.keys(reducer(undefined, {type: 'ADD_PLAYER', player: 'Elon Musk'})[0]).includes('hasBoughtARoad')).to.equal(true);
    expect(Object.keys(reducer(undefined, {type: 'ADD_PLAYER', player: 'Elon Musk'})[0]).includes('hasBoughtASettlement')).to.equal(true);
  });

  it('handles INCREMENT_RESOURCE to increase single resource type on players cardsResource state', () => {
    expect(reducer([player, player2], {type: 'INCREMENT_RESOURCE', player: 'Space Dog', resource: 'crops', count:2})[1].name).to.equal('Space Dog');
    expect(reducer([player, player2], {})[1].cardsResource['crops']).to.equal(2);
    expect(reducer([player, player2], {type: 'INCREMENT_RESOURCE', player: 'Space Dog', resource: 'fuel', count:5})[1].cardsResource['fuel']).to.equal(5);
    expect(reducer([player,player2], {})[1].cardsResource['ice']).to.equal(0);
    expect(reducer([player,player2], {})[1].cardsResource['iron']).to.equal(0);
    expect(reducer([player,player2], {})[1].cardsResource['solar']).to.equal(0);
    expect(reducer([player,player2], {})[0].cardsResource['crops']).to.equal(0);
    expect(reducer([player, player2], {type: 'INCREMENT_RESOURCE', player: 'The Martian', resource: 'crops', count:4})[0].cardsResource['crops']).to.equal(4);
    expect(reducer([player, player2], {type: 'INCREMENT_RESOURCE', player: 'The Martian', resource: 'solar', count:10})[0].cardsResource['solar']).to.equal(10);
  });

  it('handles DECREMENT_RESOURCE to decrease single resource type on players cardsResource state', () => {
    expect(reducer([player, player2], {})[0].cardsResource['solar']).to.equal(0);
    player.cardsResource['solar'] = 2;
    expect(reducer([player, player2], {type: 'DECREMENT_RESOURCE', player: player.name, resource: 'solar', count:1})[0].name).to.equal('The Martian');
    expect(reducer([player,player2], {})[0].cardsResource['solar']).to.equal(1);
    player.cardsResource['solar'] = 5;
    expect(reducer([player, player2], {type: 'DECREMENT_RESOURCE', player: player.name, resource: 'solar', count:2})[0].cardsResource['solar']).to.equal(3);
  });

  it('handles ADD_POINT to add a single point to player on state', () => {
    expect(reducer([player, player2], {})[0].points).to.equal(0);
    expect(reducer([player, player2], {type: 'ADD_POINT', player: player.name})[0].points).to.equal(1);
    expect(reducer([player, player2], {type: 'ADD_POINT', player: player2.name})[1].points).to.equal(1);
    expect(reducer([player, player2], {type: 'ADD_POINT', player: player2.name})[1].points).to.equal(2);
    expect(reducer([player, player2], {type: 'ADD_POINT', player: player2.name})[1].points).to.equal(3);
    expect(reducer([player, player2], {type: 'ADD_POINT', player: player.name})[0].points).to.equal(2);
  })

  it('handles SUBTRACT_POINT to point(s) from a player on state', () => {
    expect(reducer([player, player2], {})[0].points).to.equal(0);
    player.points = 10;
    player2.points = 25;
    expect(reducer([player, player2], {type: 'SUBTRACT_POINT', player: player.name, points: 1})[0].points).to.equal(9);
    expect(reducer([player, player2], {type: 'SUBTRACT_POINT', player: player2.name, points: 3})[1].points).to.equal(22);
    expect(reducer([player, player2], {type: 'SUBTRACT_POINT', player: player2.name, points: 5})[1].points).to.equal(17);
    expect(reducer([player, player2], {type: 'SUBTRACT_POINT', player: player2.name, points: 1})[1].points).to.equal(16);
    expect(reducer([player, player2], {type: 'SUBTRACT_POINT', player: player.name, points: 8})[0].points).to.equal(1);
  })

  it('handles HAS_BOUGHT to set player hasBoughtASettlement or hasBoughtARoad to true', () => {
    expect(reducer(undefined, addPlayer('Ford'))[0].hasBoughtARoad).to.equal(false);
    expect(reducer(undefined, addPlayer('Ford'))[0].hasBoughtASettlement).to.equal(false);
    expect(reducer([player], addPlayer('Ford'))[1].hasBoughtARoad).to.equal(false);
    expect(reducer([{name: 'Ford', hasBoughtARoad: false, hasBoughtASettlement: false}], hasBought('Ford', 'hasBoughtARoad'))[0].hasBoughtARoad).to.equal(true);
    expect(reducer([{name: 'Ford', hasBoughtARoad: true, hasBoughtASettlement: false}], hasBought('Ford', 'hasBoughtASettlement'))[0].hasBoughtASettlement).to.equal(true);
  })
  it('adds empty pioneerCards hand on start', () => {
    expect(reducer(undefined, addPlayer('Ford'))[0].pioneerCards['knights']).to.equal(0);
  })
  it('handles ADD_PIONEER_CARD  to increment appropriate card', () => {
    expect(reducer([player, player2], {type: 'ADD_PIONEER_CARD', player: 'Space Dog', card: 'knights'})[1].name).to.equal('Space Dog');
    expect(reducer([player, player2], {})[1].pioneerCards['knights']).to.equal(1);
    expect(reducer([player, player2], {type: 'ADD_PIONEER_CARD', player: 'Space Dog', card: 'vp'})[1].pioneerCards['vp']).to.equal(1);
    expect(reducer([player,player2], {})[1].pioneerCards['yop']).to.equal(0);
    expect(reducer([player,player2], {})[1].pioneerCards['monopoly']).to.equal(0);
    expect(reducer([player,player2], {})[1].pioneerCards['rb']).to.equal(0);
    expect(reducer([player, player2], {type: 'ADD_PIONEER_CARD', player: 'The Martian', card: 'yop'})[0].pioneerCards['yop']).to.equal(1);
    expect(reducer([player, player2], {type: 'ADD_PIONEER_CARD', player: 'The Martian', card: 'yop'})[0].pioneerCards['yop']).to.equal(2);
  })

  it('handles USE_PIONEER_CARD to use player usePioneerCard and decrement cards', () => {
    expect(reducer([player, player2], {})[0].pioneerCards['knights']).to.equal(0);
    player.pioneerCards['knights'] = 2;
    expect(reducer([player, player2], {type: 'USE_PIONEER_CARD', player: player.name, card: 'knights'})[0].name).to.equal('The Martian');
    expect(reducer([player, player2], {})[0].pioneerCards['knights']).to.equal(1);
    player.pioneerCards['vp'] = 5;
    expect(reducer([player, player2], {type: 'USE_PIONEER_CARD', player: player.name, card: 'vp'})[0].pioneerCards['vp']).to.equal(4);
  })

  it('handles ADD_KNIGHT_TO_ARMY to increment army', () => {
    expect(reducer([player, player2], {type: 'ADD_KNIGHT_TO_ARMY', player: 'Space Dog'})[1].name).to.equal('Space Dog');
    expect(reducer([player, player2], {})[1].army).to.equal(1);
    expect(reducer([player, player2], {})[0].army).to.equal(0);
  })

});
