import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Link} from 'react-router';
import store from '../store'

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
  isAvailable(type,coord){
    let {  everyStructure } = store.getState()
    if(type==='road'){
      let everyRoad = everyStructure.filter( (struc) => struc.type==='road')
      let sameRoad = everyStructure.filter( (struc) => struc.coordinates===coord)
      if(!sameRoad){ return true }
      else { return false }
    }  
    else { //settlement
      let everySettlement = everyStructure.filter( (struc) => struc.type==='settlement')
      let sameSettlement = everyStructure.filter( (struc) => struc.coordinates===coord)
      if(!sameSettlement){ return true }
      else { return false }
    }
  }
  isConnected(coord){
    //false if there isn't a structure that shares a coordinate
    let {  everyStructure } = store.getState()
    // MAP OVER TO CHECK
    // ...
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
    let {  userArray, turnInfo } = store.getState()
    let userID = turnInfo
    let userObj = userArray[userID]
    //console.log("userObj in the structure component from the props", userObj)
    let userColor = userObj.color
    let selectedCorners = userObj.selection    
    let hasAlreadyPurchased = userObj.startRoad //true or false
    let coordinates =  [[11,-19],[5,-9]] //x1,y1,x2,y2 
    //[[boardObject.roads[1].x1, boardObject.roads[1].y1],[.roads[1].x2, boardObject.roads[1].y2]
    console.log("this.isAfforable('road', userID)",this.isAfforable('road', userID))
    console.log("this.isAvailable('road', userID)",this.isAvailable('road',coordinates) ) //x1,y1,x2,y2 from board state object

    if( selectedCorners.length===2 && this.isConnected(coord) && this.isFarEnough('road')
      && this.isAvailable('road',coordinates)  && (this.isAfforable('road', userID) || 
      (this.isDuringSetUp() && !hasAlreadyPurchased ) ) ){ 
      let roadObj = { type: 'road', points: 0, coordinates: selectedCornersCoord, 
                      corners:  [],
                      associatedHexs: [], color: userColor, userID: userID }
      if( this.isDuringSetUp() ) { 
        userObj.hasBoughtARoad=true
      }
      //might have to add the coordinates instead of the corner IDs
      this.props.addBoardRoad({color: userObj.color, cornerArr: [32,31], coordinates: [] })
      this.props.addRoad(roadObj)
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
    let alreadyPurchased = userObj.startSettlement
    let coordinates =  [[11,-19],[5,-9]]
    console.log("this.isAfforable('road', userID)",this.isAfforable('settlement', userID))
    console.log("this.isAvailable('road', userID)",this.isAvailable('settlement', coordinates) ) 


    // coordinates will be x and y of the corner
    // associated hexes will be corner[0,0,0:0,1,-1:1,0,-1:].hexes

    if( selectedCorner.length===1 && isValidSetUpMove  
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
      this.props.addSettlement(settlementObj)
    }
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
import { addRoad, addSettlement } from '../reducers/everyStructure'; 
import { addBoardStructure } from '../reducers/structure'; 
import { addBoardRoad } from '../reducers/road'; 

//bring in other results from reducers as necessary**

const mapState = ({ turnInfo }) => ({turnInfo}); 
// might need userArray[userID][selection] or userArray[userID][startRoad]  startSettlement
const mapDispatch = { addRoad, addSettlement, addBoardStructure, addBoardRoad};

export default connect(
  null,
  null
)(Structures)
