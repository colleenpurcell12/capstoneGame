import {expect} from 'chai'
import {assignHexInfo, tokenArray, resourcesArray, generate, resources} from 'APP/gameutils/setup'
import {incrementResource, addPlayer } from 'APP/app/reducers/players';
import {boardConfig} from 'APP/gameutils/boardConfig'
import {deal, setupDeal} from 'APP/gameutils/deal'
import reducer from 'APP/app/reducers/players.js'
import sinon from 'sinon'


let grid = generate(boardConfig);
var corners = grid.corners
var hexData = resourcesArray.map((res, i) => {
  return {token: tokenArray[i], resource: res }
})

describe('Deal', () => {

  describe('actions', () => {
    it('should create an action to increment Resources', () => {
      let structures = [ {owner: 'red', corner_id: 12, type: 'settlement', player: 'Sami Lugar' }]
      let player = structures[0].player
      let resource = hexData[2].resource
      const expectedAction = {
        type: 'INCREMENT_RESOURCE',
        player,
        resource,
        count: 1
      }
      expect(incrementResource(player, resource, 1)).to.deep.equal(expectedAction)
    })
  })

  describe('deal with one structure', () => {
    var roll = hexData[2].token // corner 12 is on hex #3
    var structures = [ {owner: 'red', corner_id: 12, type: 'settlement', player: 'Sami Lugar' }]
    var dealt = deal(structures, corners, hexData, roll)
    console.log('DEALT', dealt)
    it('returns an array', () => {
      expect(dealt).to.instanceof(Array)
    })
    it('returns array of length 1 when called with 1 settlement', () => {
      expect(dealt.length).to.be.equal(1)
    })
    it('returned array has objects with properites player, resource, and num', () =>{
      expect(dealt[0]).to.have.property('player')
      expect(dealt[0]).to.have.property('resource')
      expect(dealt[0]).to.have.property('num')
    })
    it('returns objects that match structures array', ()=>{
      let resNum = hexData[2].resource
      let resource = resources[resNum]
      expect(dealt[0].player).to.be.equal(structures[0].player)
      expect(dealt[0].resource).to.be.equal(resource)
      expect(dealt[0].num).to.be.equal(1)
    })
  })

  describe('deal with multiple structures and cities', () => {
    var roll = 6
    // 7: {token: 6, resource: 1}
    // 8: {token: 6, resource: 2}
    var structures = [
      {owner: 'red', corner_id: 25, type: 'settlement', player: 'Sami Lugar' }, // on hex 7
      {owner: 'red', corner_id: 12, type: 'settlement', player: 'Sami Lugar' }, // does not touch a 6
      {owner: 'blue', corner_id: 29, type: 'city', player: 'Colleen Purcell' } // on hex 8
    ]
    var dealt = deal(structures, corners, hexData, roll)
    console.log('DEALT', dealt)
    it('returns an array', () => {
      expect(dealt).to.instanceof(Array)
    })
    it('returns array of length 2 when called with settlements array with 2 matches', () => {
      expect(dealt.length).to.be.equal(2)
    })
    it('returns array where first object = first match', ()=>{
      let res7 = hexData[7].resource
      let resource7 = resources[res7]
      expect(dealt[0].player).to.be.equal(structures[0].player)
      expect(dealt[0].resource).to.be.equal(resource7)
      expect(dealt[0].num).to.be.equal(1)
    })
    it('returns object with num: 2 for city matches', ()=>{
      let res8 = hexData[8].resource
      let resource8 = resources[res8]
      expect(dealt[1].player).to.be.equal(structures[2].player)
      expect(dealt[1].resource).to.be.equal(resource8)
      expect(dealt[1].num).to.be.equal(2)
    })
  })

  describe('setupDeal', () => {
    // 7: {token: 6, resource: 1}
    // 8: {token: 6, resource: 2}
    var structures = [
      {owner: 'red', corner_id: 26, type: 'settlement', player: 'Sami Lugar' }, // on hex 7, 12
      {owner: 'green', corner_id: 12, type: 'settlement', player: 'Colleen Purcell' }, // on hex 3
      {owner: 'blue', corner_id: 29, type: 'settlement', player: 'Sharon Choe' }, // on hex 8 ,12, 13
      {owner: 'brown', corner_id: 17, type: 'settlement', player: 'Deborah Kwon' } // on hex 3

    ]
    var dealt = setupDeal(structures, corners, hexData)
    console.log('DEALT', dealt)
    it('returns an array', () => {
      expect(dealt).to.instanceof(Array)
    })
    it('returns array of length 7', () => {
      expect(dealt.length).to.be.equal(7)
    })
    it('returns one inc obj for corners on one hex', ()=>{
      var found = dealt.filter(inc=>{
        return inc.player === 'Sami Lugar'
      })
      expect(found.length).to.be.equal(2)
    })
    it('returns two inc objs for corners on 2 hexes', ()=>{
      var found = dealt.filter(inc=>{
        return inc.player === 'Colleen Purcell'
      })
      expect(found.length).to.be.equal(1)
    })
    it('returns three inc objs for corners on 3 hexes', ()=>{
      var found = dealt.filter(inc=>{
        return inc.player === 'Sharon Choe'
      })
      expect(found.length).to.be.equal(3)
    })
  })

  describe('setupDeal gives appropriate resource if hex resources are the same', () => {
    // 7: {token: 6, resource: 1}
    // 8: {token: 6, resource: 2}
    var structures = [
      {owner: 'red', corner_id: 7, type: 'settlement', player: 'Sami Lugar' }, // on hex 1, 2, 5
      {owner: 'red', corner_id: 12, type: 'settlement', player: 'Sami Lugar' }, // on hex 3
    ]
    var dealt = setupDeal(structures, corners, hexData)
    console.log('DEALT', dealt)

    it('returns array of length 7', () => {
      expect(dealt.length).to.be.equal(4)
    })
    it('returns one inc obj for corners on one hex', ()=>{
      var found = dealt.filter(inc=>{
        return inc.player === 'Sami Lugar'
      })
      expect(found.length).to.be.equal(4)
    })
  })

    // ,
    // color: action.color
  describe('players reducer', () => {
    let initialState = reducer(undefined, addPlayer('Sami Lugar'))


    it('is incremented using results form deal', () => {
      let structures = [ {owner: 'red', corner_id: 12, type: 'settlement', player: 'Sami Lugar' }]
      let resource = 'crops'
      let newState = reducer(initialState, incrementResource('Sami Lugar', 'crops', 1))
      expect(newState[0].cardsTotal()).to.be.equal(1)
      expect(newState[0].cardsResource.crops).to.be.equal(1)
    })
    it('works for multiple settlements', () => {
      var structures = [
        {owner: 'red', corner_id: 26, type: 'settlement', player: 'Sami Lugar' }, // on hex 7, 12
        {owner: 'green', corner_id: 12, type: 'settlement', player: 'Colleen Purcell' }, // on hex 3
        {owner: 'blue', corner_id: 29, type: 'settlement', player: 'Sharon Choe' }, // on hex 8 ,12, 13
        {owner: 'brown', corner_id: 17, type: 'settlement', player: 'Deborah Kwon' } // on hex 3
      ]
      var nextState = initialState
      for(var i = 1; i < 4; i ++){
         nextState = reducer(nextState, addPlayer(structures[i].player))
      }

      var dealt = deal(structures, corners, hexData, 12)
      dealt.map(inc => {
        nextState = reducer(nextState, incrementResource(inc.player, inc.resource, inc.num))
      })
      console.log('NEXTSTATE', nextState)
      expect(nextState).to.have.length(4)
      expect(nextState[0].cardsTotal()).to.be.equal(1)
      expect(nextState[1].cardsTotal()).to.be.equal(0)
      expect(nextState[2].cardsTotal()).to.be.equal(1)
      expect(nextState[3].cardsTotal()).to.be.equal(0)
    })
  })

})
