import React, { Component } from 'react';
import * as firebase from 'firebase'
import { Link } from 'react-router';
import store from '../store'
import { addAction } from '../reducers/action-creators'


export class Structures extends Component {
	constructor(props) {
    super(props);
    this.state = {
      //wool: 0
    };
  }
  componentDidMount() {

  }
  isAvailable(type, cornerIDs){  
    let { everyStructure, selections, turnInfo, players } = this.props  
    let userIndex = --turnInfo 
    let matching
    if(type==='settlement'){
      let corner_id = cornerIDs
      let everySettlement = everyStructure.filter((struc) => struc.type==='settlement')
      //console.log("everySettlement",everySettlement)
      matching = everySettlement.find(function(struc){ 
        return struc.cornerId===corner_id
      })
    }
    else{ //road
      let startCornerID = cornerIDs[0]
      let endCornerID = cornerIDs[1]
      let everyRoad = everyStructure.filter((struc) => struc.type==='road')
      //console.log("everyRoad",everyRoad)
      matching = everyRoad.find(function(struc){ 
        //both end points have to match, start to end or end to start
          if( ( struc.corners[0]=== startCornerID && struc.corners[1]=== endCornerID)
            || (struc.corners[0]=== endCornerID && struc.corners[1]=== startCornerID) ) {
            return true
          }
      })
    }
    if (!matching){ return true }
    else { 
      console.log(`That ${type} is taken, it's ${matching}`)
        let message = { name: "Space Station",
        text: `${initials(players[userIndex].name)}, that ${type} is already taken.`}
        this.props.addMessage(message);
        return false 
     }
   }

  isConnected(type, cornerIDs){  //Roads validation, should be connected by corner to either a road or settlement
    //if is setting up, shouldn't get here
    let { everyStructure, players, turnInfo } = this.props
    let userIndex =  turnInfo-1
    if(type==='settlement'){
      let corner_id = cornerIDs
      let matching = everyStructure.filter( function(struc) {
        if(struc.type==='road' && (struc.corners[0]===corner_id || struc.corners[1]===corner_id) && struc.userID===turnInfo ){
          return true
        }
      })
      if (matching.length>0){ return true }
      else if (matching.length===0) {
        console.log("That settlement is not connected to any of your roads.")
        let message = { name: "Space Station",
        text: `${initials(players[userIndex].name)}, that corner is not connected to any of your roads.`}
        this.props.addMessage(message);
        return false
      }
    }
    else{ //if type road
      let startCornerID = cornerIDs[0]
      let endCornerID = cornerIDs[1]

      let allMatchingRoadCorners = everyStructure.filter(function(struc){
          if(struc.type==='road' && struc.userID===turnInfo
            && ( struc.corners[0]=== startCornerID || struc.corners[0]=== endCornerID
            || struc.corners[1]=== startCornerID || struc.corners[1]=== endCornerID) ) {
            return true
          }
      })
      let allMatchingSettlementCorners = everyStructure.filter(function(struc){
          if (struc.type==='settlement' &&  struc.userID===turnInfo
            && (struc.cornerId=== startCornerID || struc.cornerId=== endCornerID)){
            return true
          }
      })
      if (allMatchingRoadCorners.length>0 || allMatchingSettlementCorners.length>0){
        return true
      } 
      else {
        console.log("That road is not connected.")
        let message = { name: "Space Station",
        text: `${initials(players[userIndex].name)}, that corner is not connected.`}
        this.props.addMessage(message);
        return false
      }
    }
  }

  isAfforable(type){
    let { turnInfo, players } = this.props //userArray
    let player = players[--turnInfo]
    let userCards = player.cardsResource
    let { ice, solar, fuel, crops, iron } = userCards

    if(  (type==='road'       && ice>=1 && solar>=1 )
      || (type==='settlement' && ice>=1 && solar>=1 && fuel>=1 && crops>=1)
      || (type==='city'       && fuel>=2 && iron>=3) ){
          return true
    }
    console.log(`${initials(player.name)} can't afford a ${type}.`)//XXX
    let message = { name: "Space Station",
    text: `${initials(player.name)} can't afford a ${type}.`}
    this.props.addMessage(message);
    return false
  }

   //CITY/SETTLEMENT VALIDATION
  isFarEnough(){
    let {  turnInfo, selections, everyStructure, players} = this.props //corners
    let userIndex=turnInfo-1
    let player = players[userIndex]
    var cornerNeighbors =  selections[0].neighbors
    
      let isTooClose=[]
      let additional 
      // check that neighbors corners dont have another player's structures
      let allBuidlings = everyStructure.filter((struc) => (struc.type==='settlement' || struc.type==='city'))
      for(var i = 0 ; i<cornerNeighbors.length ; i++){ //
        additional = allBuidlings.filter((struc) => struc.cornerId===cornerNeighbors[i] && struc.userID!==turnInfo ) 
        isTooClose = isTooClose.concat(additional)
      } 
      if( isTooClose.length>0 ){
        console.log("Is not far enought from someone else's settlement:",isTooClose)
        let message = { name: "Space Station",
           text: `${initials(player.name)}, that corner is not far enough from someone else's settlement.`}
        this.props.addMessage(message);
        return false
      }
      else{ return true }
  }
  isValidRoad(cornerIDs, userIndex, coord){
    let { players } = this.props
    let player = players[userIndex]
    if(!this.isConnected('road', cornerIDs)){
        return false;
    }
    if(!this.props.isSettingUp){
      return this.isAfforable('road')
    }
    return true
  }
  registerRoad(){
    let {  players, turnInfo, selections, userArray } = this.props
    let userIndex = turnInfo-1
    let player = players[userIndex]

    if(selections.length<2) {
      console.log('Please select two corners for your new road and try again')
      let message = { name: "Space Station",
       text: `${initials(player.name)} must select two corners to add a road.`}
      this.props.addMessage(message);
      return ;
    }
      var cornerA = selections[0], cornerB = selections[1]
      var coord = [ [cornerA.x, cornerA.y], [cornerB.x, cornerB.y] ] //x1,y1,x2,y2
      var cornerIDs = [ cornerA.id, cornerB.id ]
      let userID = turnInfo
      let userColor = userArray[userIndex].color

      let associatedHexs = []
      for(var i = 0 ; i < 3 ; i++){ //some corners are on coast lines, in which case the hex is a string not obj
        if(typeof cornerA.hexes[i] !== 'string'){ associatedHexs.push(cornerA.hexes[i].id) }
        if(typeof cornerB.hexes[i] === 'object'){ associatedHexs.push(cornerB.hexes[i].id) }
      }
      if(this.props.isSettingUp){
        if(!player.hasBoughtASettlement){
          console.log("Must place settlement first.")
          let message = { name: "Space Station",
           text: `${initials(player.name)} must place their settlement before choosing a road.`}
          this.props.addMessage(message);
          return ;   
        }
        else if(player.hasBoughtARoad) { 
          console.log(player.name,"has already bought a road in this round.")
          let message = { name: "Space Station",
            text: `${initials(player.name)} has already bought a road in this round.`}
          this.props.addMessage(message);
          return; //break out of registering road
        }
      }
      if( !this.isAvailable('road',cornerIDs) ){ return; }
      if(this.isValidRoad(cornerIDs, userIndex, coord)){
        let roadObj = { type: 'road', points: 0, coordinates: coord,
                        corners:  [cornerA.id, cornerB.id],
                        associatedHexs: associatedHexs, color: userColor, userID: userID } //XXX
        //so user can't select/register another road during this round of set up
        if( this.props.isSettingUp ) {  addAction(this.props.hasBought(player.name, 'hasBoughtARoad')) } 
        else{ this.takePayment('road') }
        addAction(this.props.clearSelection())
        //send off to the everyStructures array used for validation, with firebase
        addAction(this.props.addRoadToEveryStructure(roadObj)) //formerly addRoad()

        //to the road state used for rending visuals
        var roadObj = { color: userColor, corners:  [cornerA.id, cornerB.id] , userID: userID,
                     coordinates: coord  }
        addAction(this.props.addRoadToRoads(roadObj)) //formerly: this.props.addBoardRoad
      }
      //else{ console.log('Road was not registered.') }    
  }
 
  registerSettlement(){
    if( !this.isFarEnough() ){ return; }
    let { players, turnInfo, selections, userArray } = this.props //userArray,
    let corner = selections[0]
    if( !this.isAvailable('settlement',corner.id) ){ return; }
    let userIndex = turnInfo-1
    let player = players[userIndex]
    let associatedHexs = []
      for(var i = 0 ; i < 3 ; i++){ //some corners are on coast lines
        if(typeof corner.hexes[i] !== 'string'){ associatedHexs.push(corner.hexes[i].id) }
      }
    let coord = [selections[0].x, selections[0].y]
    if(this.props.isSettingUp){
        if(player.hasBoughtASettlement) { 
          console.log("You have already bought a settlement in this round")
          let message = { name: "Space Station",
          text: `${initials(player.name)} has already bought a settlement in this round.`}
          this.props.addMessage(message);
          return ; 
        }
      }    
    if ( selections.length!==1 ){
      console.log('Please make sure you have selected a valid corner for your new structure and try again')
      let message = { name: "Space Station",
         text: `${initials(player.name)} make sure you only have one corner selected.`}
      this.props.addMessage(message);
      return;
    }
    let cornerID = selections[0].id
    if(! this.props.isSettingUp ) {  //tests for only normal game play 
      if(!this.isAfforable('settlement') || !this.isConnected('settlement',cornerID)){
        console.log("about to break out")
        return; //break out if either is false
      }
    }
    let userColor = userArray[userIndex].color
    let settlementObj = { type: 'settlement', points: 1, color: userColor,
                            userID: turnInfo, cornerId: selections[0].id,
                            coordinates: coord, associatedHexs: associatedHexs
                          }
      
    if( this.props.isSettingUp ) {  
      addAction(this.props.hasBought(player.name, 'hasBoughtASettlement'))// sets player.hasBoughtASettlement = true 
    }
    else { this.takePayment('settlement') }//decrement relevant cards from userArray user object's card resources

    addAction(this.props.clearSelection())

    //everyStructure used for movie validation dispatched with firebase
    addAction(this.props.addSettlementToEveryStructure(settlementObj))   
    addAction( this.props.addPoint(player.name))  //player score DOESN"T WORK

    //structure used for rending visual
    
    var settleObj = {owner: userColor, corner_id: corner.id, type: 'settlement', player: player.name } //userObj
    addAction( this.props.addBoardStructure(settleObj) )
  }

takePayment(type){
    let {  turnInfo, players } = this.props 
    let userIndex = turnInfo-1
    let playerName = players[userIndex].name
      if(type==='road'){ 
      this.props.decrementResource( playerName, 'ice', 1)
      this.props.decrementResource( playerName, 'solar', 1)
    } else if (type==='settlement') { 
      this.props.decrementResource( playerName, 'ice', 1)
      this.props.decrementResource( playerName, 'solar', 1)
      this.props.decrementResource( playerName, 'fuel', 1)
      this.props.decrementResource( playerName, 'crops', 1)
    } else{ 
      this.props.decrementResource( playerName, 'fuel', 2)
      this.props.decrementResource( playerName, 'iron', 3)
    }
  }
  //UPGRADE TO A CITY LOGIC
  //validation check
  isSettlementPlayerAlreadyOwns(cornerID, userID){ //WORKS
    //cornerID = 20; userID = 2; //TESTING
    var theSettlementCurrPlayerOwnsOnThisCorner = this.props.everyStructure.filter( (struc) =>
      struc.userID === userID
      && struc.type[0] === 'settlement'
      && struc.cornerId === cornerID)
    console.log("theSettlementCurrPlayerOwnsOnThisCorner",theSettlementCurrPlayerOwnsOnThisCorner)
    if(theSettlementCurrPlayerOwnsOnThisCorner){
      return true
    }
    else { return false }
  }
  //handles validation and updates the settlement structure to be type='city' if valid
	upgradeSettlement(){
    let { turnInfo, selections } = this.props
    let cornerID = selections[0].id
    let userID = turnInfo
    let userIndex = userID-1
    //cornerID = 20; userID = 2; //TESTING
    if( selections.length === 1
      && this.isSettlementPlayerAlreadyOwns(cornerID, userID)
      && this.isAfforable('city')
      && !this.props.isSettingUp
       ) {
      this.takePayment('city') // take away the cards afforded
      addAction(this.props.clearSelection())
      addAction( this.props.upgradeBoardStructure(cornerID) )
      addAction( this.props.addCityToEveryStructure(cornerID) )
      //also increment player's points in userArray
      console.log("before addPoint for city, userIndex",userIndex)
      addAction( this.props.addPoint(userIndex))
    }
    else{
      // if(!this.isAfforable('city')){
      //   console.log("Can't afford a city.")
      // } if(!this.isSettlementPlayerAlreadyOwns(cornerID) ){
      //   console.log("You dont already own a settlement at cornerID:",cornerID)
      // } if( this.props.isSettingUp ){
      //   console.log("It's set up, so choose a settlement, cant purchase a city right now.")
      // } if(selections.length !== 1){
      //   console.log("Make sure you only have one corner selected")
      // } console.log('Make sure you have selected a single corner on which you already own a settlment and try again')
    }
	}

  render() {
    //console.log("Passed from Board, selected corners are :",this.props.selected)
    return (
      <div>
    		<button type='submit' onClick={() => this.registerSettlement()}> Add Structure </button>
    		<button type='submit' onClick={() => this.registerRoad()}> Add Road </button><br></br>
        <button type='submit' onClick={() => this.upgradeSettlement()}> Upgrade Settlement to a City</button>
      </div>
    	)
	}
}
/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { addBoardStructure, upgradeBoardStructure } from '../reducers/structure';
import { addRoadToRoads } from '../reducers/road';
import { addRoadToEveryStructure, addSettlementToEveryStructure, addCityToEveryStructure } from '../reducers/everyStructure';
import { clearSelection } from '../reducers/selection'
import { addPoint, hasBought, incrementResource, decrementResource } from '../reducers/players';
import { addMessage } from '../reducers/chatroom'
import { initials } from '../reducers/helperFunctions'

const mapState = ({ isSettingUp, turnInfo, userArray, selections, everyStructure, players }) => ({isSettingUp, turnInfo, userArray, selections, everyStructure, players });
const mapDispatch = { addBoardStructure, upgradeBoardStructure, addRoadToRoads, addRoadToEveryStructure, addSettlementToEveryStructure, addCityToEveryStructure, addPoint, clearSelection, incrementResource, decrementResource, addMessage, hasBought};

export default connect(
  mapState,
  mapDispatch
)(Structures)
