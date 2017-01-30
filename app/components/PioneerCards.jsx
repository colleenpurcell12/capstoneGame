import React, { Component } from 'react'
import * as firebase from 'firebase'
import { addAction } from 'APP/app/reducers/action-creators'

import { deck, makeDeck } from 'APP/gameutils/pioneerCardsConfig'
import {shuffle} from './setup.js'

import {
  addPioneerCard,
  usePioneerCard,
  addKnightToArmy,
  decrementResource,
  incrementResource,
  addPoint,
} from '../reducers/player.js'

import {
  drawCard,
  initializeDeck,
} from '../reducers/pioneerCards.js'

export class PioneerCards extends Component {
  constructor(){

  }

  componentWillMount(){
    if(!this.props.pioneerCards.length){
      addAction(initializeDeck(shuffle(makeDeck(deck))))
    }
  }

  render(){
    {players, loggedInUser, pioneerCards} = this.props
    let hand = players[loggedInUser.displayName].pioneerCards
    return (
      <div>
        <strong>Pioneer Cards</strong>
        <button onPress={() => buyCard(playerName, pioneerCards)}>Buy Card</button>
        <p>Your cards: </p>
        <div>Knights: {hand.knights}</div>
        <div>Victory Points: {hand.knights}</div>
        <div>Year of Plenty: {hand.knights}</div>
        <div>Monopoly: {hand.knights}</div>
        <div>Road Building: {hand.knights}</div>
      </div>
    )
  }
}

//TODO: refine hand display in the future

const buyCard = (userName, deck) => {
  // TODO: check for resources
  // TODO: disable when not current player
  ['fuel', 'crops', 'ore'].forEach(res => {
    addAction(decrementResource(userName, res, 1))
  })
  let card = deck[0]
  addAction(addPioneerCard(userName, card))
  addAction(drawCard())
  return card
  // TODO: show card to user?
}

const playCard = (card, user) => {
  if(!hasCard(user, card)){
    //TODO: throw some sort of error
    return null
  }
  switch(card.name){
    case "knights":
      playKnight(user)
      break
    case "vp":
      playVP(user)
      break
    case "monopoly":
      playMonopoly(user)
      break
    case "yop":
      playYearOfPlenty(user)
      break
    case "rb":
      playRoadBuilding(user)
      break
  }
  addAction(usePioneerCard(user, card.name))
  // TODO: alert the messenger
}

// takes card name as short name
const hasCard = (user, card) => {
  return user.pioneerCards[card].total > 0 ? true : false
}

const playKnight = (user) => {
  // TODO: prompt to move robber
  // wait for move
  addAction(addKnightToArmy(user))
}

const playVP = (user) => {
  addAction(addPoint(user))
}

const playMonopoly = (player, players) => {
  // TODO: prompt to select resource
  let selection = ''
  // all other players' resources are dec to 0
  let total = 0
  players.forEach(p => {
    if(p.name != player.name){
      total += p.cardsResource[resource]
      addAction(decrementResource(player, selection, p.cardsResource[resource]))
    }
  })
}

const playRoadBuilding = (user) => {
  // TODO: use setup functionality? hasBought to zero?
}

// no functionality currently due to honor system rules
// TODO: add before +/- resources are locked
const playYearOfPlenty = (user) => {
  let selected = []
  //TODO: prompt user to pick 2 cards w/ submit
  selected.forEach(res => {
    addAction(incrementResource(user, res, 1))
  })
}


/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux'

const mapState = ({ loggedInUser, pioneerCards, players }) => ({ loggedInUser, pioneerCards, players }); //userArray, colors

const mapDispatch = { }

export default connect(
  mapState,
  mapDispatch
)(PioneerCards)

export { PioneerCards as PurePioneerCards }; //this is for testing, do not remove unless updating test suite
