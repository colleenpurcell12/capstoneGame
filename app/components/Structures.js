import React, { Component } from 'react';
import * as firebase from 'firebase'
import { Link } from 'react-router';
import store from '../store'
import { addAction } from '../reducers/action-creators'
import { addRoadToEveryStructure, addSettlementToEveryStructure } from '../reducers/everyStructure'; 

export class Structures extends Component {
	constructor(props) {
    super(props);
    this.state = {
      //wool: 0
    };
  }
  componentDidMount() {
  }
  isDuringSetUp(){
    let {  isSettingUp } = store.getState()
    return isSettingUp
  }
  isAvailable(type, coord){
    return true
    // let {  everyStructure } = store.getState()
    // if(type==='road'){
    //   let everyRoad = everyStructure.filter( (struc) => struc.type==='road')
    //   let sameRoad = everyStructure.filter( (struc) => struc.coordinates===coord)
    //   if(!sameRoad){ return true }
    //   else { return false }
    // }
    // else { //settlement
    //   let everySettlement = everyStructure.filter( (struc) => struc.type==='settlement')
    //   let sameSettlement = everyStructure.filter( (struc) => struc.coordinates===coord)
    //   if(!sameSettlement){ return true }
    //   else { return false }
    // }
  }
  isConnected(coord){
    //false if there isn't a structure that shares a coordinate
    let {  everyStructure } = store.getState()
    // MAP OVER TO CHECK
    // ...
    return true
  }
  isAfforable(type, userID){
    let {  userArray } = store.getState()
    let userCards = userArray[userID].cardsResource
    console.log("userCards defined?", userCards)
    if(type==='road'){ //cost lumber and 1 brick
      //type1 = lumber type2 = brick
      //type3 = wool type4 = grain
     return userCards.type1>=1 && userCards.type2>=1
    } else { //settlement cost 1L+1B+1G+1W
      return (  userCards.type1>=1 && userCards.type2>=1
              && userCards.type4>=1 && userCards.type3>=1  )
    }
  }
  isFarEnough(type){
    // if road, neither of the corners of it's end points have non-owned settlements/cities
    if(type==='road'){
      //check seleected corner
    }
    // check that neighbors corners dont have non-owned settlements/cities
    if(type==='settlement'){
      // look in everyStructure for settlements/cities
      // then try to "match" the settlements by ??? to the neighbor corners by either name or coordinates
    }
    return true
  }
  registerRoad(){
    // need to know the hexagon state data structure
    // the user array structure to find the color by ID
    // ensure that the 1-2 selected corners are stored somewhere
    let {  userArray, turnInfo, selections } = store.getState()

    //corners in 2 element selections array:


      // [0,0,0:0,1,-1:1,0,-1:]:
      // { hexes: [resource: '', token: 0, id: 30],
      //   id: ,
      //   neighbors: [], //cID1, cID2
      //   x: ,
      //   y:
      // }
    var coord = [ [selections[0].x, selections[0].y],
                  [selections[1].x, selections[1].y] ] //[[11,-19],[5,-9]] //x1,y1,x2,y2 
    let userID = turnInfo
    let userObj = userArray[userID]
    let userColor = userObj.color
    let hasAlreadyPurchased = userObj.hasBoughtARoad //true or false
    let associatedHexsCorner1 = selections[0].hexes
    let associatedHexs = associatedHexsCorner1.concat( selections[1].hexes )

    console.log("this.isConnected(coord) ",this.isConnected(coord)  )
    console.log("this.isFarEnough('road')", this.isFarEnough('road') ) 
    console.log("this.isAvailable('road', userID)",this.isAvailable('settlement', coord) )
    console.log("this.isAfforable('road', userID)",this.isAfforable('settlement', userID) )
    console.log("this.isDuringSetUp() && !hasAlreadyPurchased", this.isDuringSetUp() && !hasAlreadyPurchased )

    if( selections.length===2 
      && this.isConnected(coord) 
      && this.isFarEnough('road')
      && this.isAvailable('road',coord)  
      && ( this.isAfforable('road', userID) || (this.isDuringSetUp() && !hasAlreadyPurchased) ) 
      ){ 

      let roadObj = { type: 'road', points: 0, coordinates: coord,
                      corners:  [selections[0].id, selections[1].id],
                      associatedHexs: associatedHexs, color: userColor, userID: userID }
      //so user can't select/register another road during this round of set up
      if( this.isDuringSetUp() ) { userObj.hasBoughtARoad = true }

      //to the road state used for rending visuals      
      addAction(addRoadToRoads({
                          color: userColor,
                          corners: [selections[0].id, selections[1].id],  //ids
                          coordinates: coord, //corner coords [[x1,y1],[x2,y2]]
                          owner: userID
                           }))
      //formerly: this.props.addBoardRoad(

      //send off to the everyStructures array used for validation
      //firebase
      addAction(addRoadToEveryStructure(roadObj))
      //Formerly with dispatcher: this.props.add Road(roadObj)  

    }
    else{
      alert('Please pick two valid end points for your new road and try again')
    }
  }
  registerSettlement(){
    //first check if it's a city, as in there is already a settlement of same owner on the single selected corner

    let {  userArray, turnInfo } = store.getState()
    //console.log("the userArray[1] is", userArray[1])
    let userID = turnInfo-1
    //console.log("the current turn is #this.props.turnInfo", turnInfo)
    //console.log("the current player is #userID", userID)

    let userObj = userArray[userID]

    let userColor = userObj.color
    let selectedCorner = [1] //userObj.selection
    let alreadyPurchased = userObj.hasBoughtASettlement
    let coordinates =  [[11,-19],[5,-9]]
    console.log("this.isAfforable('road', userID)",this.isAfforable('settlement', userID))
    console.log("this.isAvailable('road', userID)",this.isAvailable('settlement', coordinates) )

    // coordinates will be x and y of the corner
    // associated hexes will be corner[0,0,0:0,1,-1:1,0,-1:].hexes

    if( selectedCorner.length===1 //&& isValidSetUpMove  
      && this.isAvailable() && this.isFarEnough('settlement') && (this.isAfforable('settlement') || 

      (this.isDuringSetUp() && !alreadyPurchased ) ) ){ //<--no settlement has been registered/added so far in this set up round, if in set up phase
      let settlementObj = { type: 'settlement', points: 1 , color: userColor, userID: userID,
                            coordinates: selectedCorner,  associatedHexs: []   }
      if( this.isDuringSetUp() ) {
        userObj.hasBoughtASettlement=true
      }

      //structure used for rending visual
      this.props.addBoardStructure({color: userObj.color, corner_id: 32, type: 'settlement'})

      //everyStructure used for validateion
      //firebase 
      addAction(addSettlementToEveryStructure(settlementObj))
      //Formerly with dispatcher: this.props.addSettlement(settlementObj)
    }

  }
	upgradeSettlement(){
		//add logic for upgrading to city here
	}
  render() {
    console.log("Passed from Board, selected corners are :",this.props.selected)
    return (
      <div>
    		<button type='submit' onClick={() => this.registerSettlement()}> Add Structure </button>
    		<button type='submit' onClick={() => this.registerRoad()}> Add Road </button>
      </div>
    	)
	}
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
//Dont need dispatchers: import { addRoad, addSettlement } from '../reducers/everyStructure';
import { addBoardStructure, upgrade } from '../reducers/structure';
import { addRoadToRoads } from '../reducers/road';

//bring in other results from reducers as necessary**

const mapState = ({ turnInfo }) => ({turnInfo});
// might need userArray[userID][selection] or userArray[userID][startRoad]  startSettlement
const mapDispatch = { addBoardStructure, addRoadToRoads};

export default connect(
  null,
  null
)(Structures)
