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
    it('works for multiple settlements on the same hex', () => {
      var structures = [
        {owner: 'red', corner_id: 27, type: 'settlement', player: 'Sami Lugar' }, // on hex 7, 12
        {owner: 'green', corner_id: 12, type: 'settlement', player: 'Colleen Purcell' }, // on hex 3
        {owner: 'blue', corner_id: 29, type: 'settlement', player: 'Sharon Choe' }, // on hex 8 ,12, 13
        {owner: 'brown', corner_id: 17, type: 'settlement', player: 'Deborah Kwon' } // on hex 3
      ]
      var nextState = initialState
      for(var i = 1; i < 4; i ++){
         nextState = reducer(nextState, addPlayer(structures[i].player))
      }

      var dealt = deal(structures, corners, hexData, 6)
      dealt.map(inc => {
        nextState = reducer(nextState, incrementResource(inc.player, inc.resource, inc.num))
      })
      expect(nextState).to.have.length(4)
      expect(nextState[0].cardsTotal()).to.be.equal(3) // 1 crops from first test, 1 crop, 1 solar from current
      expect(nextState[1].cardsTotal()).to.be.equal(0)
      expect(nextState[2].cardsTotal()).to.be.equal(1)
      expect(nextState[3].cardsTotal()).to.be.equal(0)
    })
  })
  describe('setupDeal increments player reducer when given array of 8 settlements', ()=>{
    var structures = [
      {owner: 'red', corner_id: 27, type: 'settlement', player: 'Sami Lugar' }, // on hex 7, 8, 12 => 3 resources
      {owner: 'green', corner_id: 12, type: 'settlement', player: 'Colleen Purcell' }, // on hex 2 => 1 resource
      {owner: 'blue', corner_id: 29, type: 'settlement', player: 'Sharon Choe' }, // on hex 8 ,12, 13 => 3 resources
      {owner: 'brown', corner_id: 17, type: 'settlement', player: 'Deborah Kwon' }, // on hex 3 => 1 resource
      {owner: 'brown', corner_id: 14, type: 'settlement', player: 'Deborah Kwon' }, // on hex 3, 7 => 2 resources
      {owner: 'blue', corner_id: 8, type: 'settlement', player: 'Sharon Choe' }, // on hex 1, 3 => 2 resources
      {owner: 'green', corner_id: 30, type: 'settlement', player: 'Colleen Purcell' }, // on hex 8, 9, 13 => 3 resources
      {owner: 'red', corner_id: 40, type: 'settlement', player: 'Sami Lugar' }, //on hex  12, 13, 16 => 3 resources
    ]
    //set initial state to have empty hands
    let initialState = reducer(undefined, addPlayer('Sami Lugar'))
    let nextState = initialState
    for(let i = 1; i < 4; i ++){
       nextState = reducer(nextState, addPlayer(structures[i].player))
    }
    // creates array of players to be incremented
    var setupDealArray = setupDeal(structures, corners, hexData)

    //increments using incrementResource
    setupDealArray.forEach(inc => {
      nextState = reducer(nextState, incrementResource(inc.player, inc.resource, inc.num))
    })

    it('setupDeal returns array of 18', () => {
      expect(setupDealArray).to.have.length(18)
    })
    it('increments Resources on a with a for Each for total cards of 18', ()=>{
      //count totalCards
      var totalCards = 0;
      for(let j = 0; j < nextState.length; j ++){
        totalCards += nextState[j].cardsTotal()
      }
      expect(totalCards).to.be.equal(18)
    })
  })
  describe('Solar is incremented', () => {
    var structures = [
      {owner: 'green', corner_id: 12, type: 'settlement', player: 'Colleen Purcell' }, // on hex 2 { token: 3, resource: 0}=> 1 resource
      {owner: 'brown', corner_id: 17, type: 'settlement', player: 'Deborah Kwon' }, // on hex 3 {token: 4, resource: 0}=> 1 resource
      {owner: 'blue', corner_id: 8, type: 'settlement', player: 'Sharon Choe' }, // on hex 1 {token: 3, resource: 0}, 2 {token: 3, resource: 0} => 2 resources
      {owner: 'brown', corner_id: 14, type: 'settlement', player: 'Sami Lugar' }, // on hex 3 {token: 4, resource: 0}, 7 {token: 6, resource: ??}=> 2 resource
    ]
    //set initial state to have empty hands
    var startState
    beforeEach(function(){
      let initialState = reducer(undefined, addPlayer('Colleen Purcell'))
      startState = initialState
      for(let i = 1; i < 4; i ++){
        startState = reducer(startState, addPlayer(structures[i].player))
      }
    })
    it('adds 1 solar to each card on deal', ()=> {
      let nextState = startState
      var dealt = deal(structures, corners, hexData, 3)
      dealt.map(inc => {
        nextState = reducer(nextState, incrementResource(inc.player, inc.resource, inc.num))
      })
      expect(nextState[0].cardsTotal()).to.be.equal(1) // 1 crops from first test, 1 crop, 1 solar from current
      expect(nextState[1].cardsTotal()).to.be.equal(0)
      expect(nextState[2].cardsTotal()).to.be.equal(2)
      expect(nextState[3].cardsTotal()).to.be.equal(0)
    })
    it('adds 1 solar to each card on setupDeal', ()=> {
      // creates array of players to be incremented
      var setupDealArray = setupDeal(structures, corners, hexData)
      let nextState = startState
      //increments using incrementResource
      setupDealArray.forEach((inc, i) => {
        nextState = reducer(nextState, incrementResource(inc.player, inc.resource, inc.num))

      })
      expect(nextState[0].cardsResource.solar).to.be.equal(1)
      expect(nextState[1].cardsResource.solar).to.be.equal(1)
      expect(nextState[2].cardsResource.solar).to.be.equal(2)
      expect(nextState[3].cardsResource.solar).to.be.equal(1)
    })
  })

})
