import React, { Component } from 'react';
import { addAction } from '../reducers/action-creators';
import { addBoardStructure, upgradeBoardStructure } from '../reducers/structure';
import { addRoadToRoads } from '../reducers/road';
import { addRoadToEveryStructure, addSettlementToEveryStructure, addCityToEveryStructure } from '../reducers/everyStructure';
import { clearSelection } from '../reducers/selection'
import { addPoint, hasBought, incrementResource, decrementResource } from '../reducers/players';
import { initials } from '../reducers/helperFunctions'


export class Structures extends Component {
	constructor(props) {
    super(props);
  }

  isAvailable(type, cornerIDs){  //WORKS 
    //return true //for testing
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
    if (!matching){ 
        console.log("That settlement is available.")
        let message = { name: "Space Station",
        text: `${initials(players[userIndex].name)}, that corner is available.`}
        this.props.addMessage(message);
        return true 
      }
      else  { 
        console.log("That settlement is already taken. Should be something here:",matching)
        let message = { name: "Space Station",
        text: `${initials(players[userIndex].name)}, that corner is already taken.`}
        this.props.addMessage(message);
        return false 
      }
    if (!matching ){ 
      console.log(`That ${type} is available.`)
      let message = { name: "Space Station",
      text: `${initials(players[userIndex].name)}, that road is available.`}
      this.props.addMessage(message);
      return true 
    } 
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
      if (matching.length>0){ 
        console.log("That settlement is connected to",matching[0])
        let message = { name: "Space Station",
        text: `${initials(players[userIndex].name)}, that corner is connected to your other infrastructure.`}
        this.props.addMessage(message);
        return true 
      }
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
        if(allMatchingRoadCorners.length>0){
          console.log("That road is connected to road:",allMatchingRoadCorners[0])
        } else{console.log("That road is connected to settlement",allMatchingSettlementCorners[0])}
        let message = { name: "Space Station",
        text: `${initials(players[userIndex].name)}, that corner is connected to your other infrastructure.`}
        this.props.addMessage(message);
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
  isFarEnough(coord){
    let {  turnInfo, selections, everyStructure, corners } = this.props
    var cornerNeighbors =  selections[0].neighbors
    // check that neighbors corners dont have another player's structures
      let tooCloseStructure;
      for(var i = 0 ; i<cornerNeighbors.length ; i++){
        tooCloseStructure = everyStructure.filter( (struc) =>
          (struc.cornerId === cornerNeighbors.id )
          && (struc.type==='settlement' || struc.type==='city')
          && struc.userID!==turnInfo
            ) 
      } 
      if( tooCloseStructure.length>0 ){
        console.log("Is not far enought from someone else's settlement")
        return false
      }
    return true
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
    let {  players, turnInfo, selections, userArray } = this.props //userArray

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
      let userIndex = turnInfo-1
      let userID = turnInfo
      let player = players[userIndex] //let userObj = players[userIndex]
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
        if( this.props.isSettingUp ) {  addAction(hasBought(player.name, 'hasBoughtARoad')) } 
        else{ this.takePayment('road') }
        addAction(clearSelection())
        //send off to the everyStructures array used for validation, with firebase
        addAction(addRoadToEveryStructure(roadObj)) //formerly addRoad()

        //to the road state used for rending visuals
        var roadObj = { color: userColor, corners:  [cornerA.id, cornerB.id] , userID: userID,
                     coordinates: coord  }
        addAction(addRoadToRoads(roadObj)) //formerly: this.props.addBoardRoad
      }
      //else{ console.log('Road was not registered.') }    
  }
 
  registerSettlement(){
    let { players, turnInfo, selections, userArray } = this.props //userArray,
    let userIndex = turnInfo-1
    let userID = turnInfo
    let player = players[userIndex]
    let userColor = userArray[userIndex].color
    let associatedHexs = []
    let corner = selections[0]
      for(var i = 0 ; i < 3 ; i++){ //some corners are on coast lines

        if(typeof corner.hexes[i] !== 'string'){ associatedHexs.push(corner.hexes[i].id) }
      }
    let coord = [selections[0].x, selections[0].y]
    //XXX
    console.log("this.isFarEnough('settlement')", this.isFarEnough('settlement') )

    if(this.props.isSettingUp){
        if(player.hasBoughtASettlement) { 
          console.log("You have already bought a settlement in this round")
          let message = { name: "Space Station",
          text: `${initials(player.name)} has already bought a settlement in this round.`}
          this.props.addMessage(message);
          return ; 
        } else{
          console.log("Player's first settlement of this round.")
          let message = { name: "Space Station",
          text: `${initials(player.name)}'s first settlement of this round.`}
          this.props.addMessage(message);
        }
      }

    if( !this.isAvailable('settlement',corner.id) ){ return; }
    if ( selections.length===1 && this.isFarEnough('settlement', coord)  ){

      if(! this.props.isSettingUp ) {  //tests for only normal game play 
        if(this.isAfforable('settlement') && this.isConnected('settlement',cornerID)){
          return; //break out
        }
      }
      let settlementObj = { type: 'settlement', points: 1,
                            color: userColor,
                            userID: userID,
                            cornerId: selections[0].id,
                            coordinates: coord,
                            associatedHexs: associatedHexs
                          }
      
      if( this.props.isSettingUp ) {  
        addAction(hasBought(player.name, 'hasBoughtASettlement'))// sets player.hasBoughtASettlement = true 
      }
      else { this.takePayment('settlement') }//decrement relevant cards from userArray user object's card resources

      addAction(clearSelection())

      //everyStructure used for movie validation dispatched with firebase
      addAction(addSettlementToEveryStructure(settlementObj))
       // console.log("player",player,"name",player.name )
       // console.log(this.props.addPoint(player) )
      
      addAction(addPoint(player.name))  //player score DOESN"T WORK

      //structure used for rending visual
      var settleObj = {owner: userColor, corner_id: corner.id, type: 'settlement', player: player.name } //userObj
      addAction(dBoardStructure(settleObj))
    }
    else {
      console.log('Please make sure you have selected a valid corner for your new structure and try again')
      if (selections.length===2){
        let message = { name: "Space Station",
         text: `${initials(player.name)} make sure you only have one corner selected.`}
         this.props.addMessage(message);
      } else{
        // let message = { name: "Space Station",
        //  text: `${initials(player.name)} selected an invalid corner.`}
        //  this.props.addMessage(message);
      }
    }
  }

takePayment(type){
    let {  turnInfo, players } = this.props 
    let userIndex = turnInfo-1
    let playerName = players[userIndex].name
      if(type==='road'){ 
      addAction(decrementResource( playerName, 'ice', 1))
      addAction(decrementResource( playerName, 'solar', 1))
    } else if (type==='settlement') { 
      addAction(decrementResource( playerName, 'ice', 1))
      addAction(decrementResource( playerName, 'solar', 1))
      addAction(decrementResource( playerName, 'fuel', 1))
      addAction(decrementResource( playerName, 'crops', 1))
    } else{ 
      addAction(decrementResource( playerName, 'fuel', 2))
      addAction(decrementResource( playerName, 'iron', 3))
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
      addAction(clearSelection())
      addAction(upgradeBoardStructure(cornerID) )
      addAction(addCityToEveryStructure(cornerID) )
      //also increment player's points in userArray
      console.log("before addPoint for city, userIndex",userIndex)
      addAction(addPoint(userIndex))
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
    		<button type='submit' onClick={() => this.registerRoad()}> Add Road </button>
        <button type='submit' onClick={() => this.upgradeSettlement()}> Upgrade Settlement to a City</button>
      </div>
    	)
	}
}
/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { addMessage } from '../reducers/chatroom'

const mapState = ({ isSettingUp, turnInfo, userArray, selections, everyStructure, players }) => ({isSettingUp, turnInfo, userArray, selections, everyStructure, players });
const mapDispatch = { addMessage };

export default connect(
  mapState,
  mapDispatch
)(Structures)
