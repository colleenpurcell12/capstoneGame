import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Link} from 'react-router';

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
    let userCards = userArray[this.props.turnInfo].cards

    if(type==='road'){ //cost lumber and 1 brick
      //type1 = lumber type2 = brick
      //type3 = wool type4 = grain
     return userCards.type1>=1 && userCards.type2>=1
    } else { //settlement cost 1L+1B+1G+1W
      return (  userCards.type1>=1 && userCards.type2>=1
              && userCards.type4>=1 && userCards.type3>=1  )
    }
  }
  isFarEnough(){
    return true
  }
  addingARoad(){
    // need to know the hexagon state data structure
    // the user array structure to find the color by ID
    // ensure that the 1-2 selected corners are stored somewhere
    let {  userArray } = store.getState()
    let userID = this.props.turnInfo
    let userColor = userArray[userID].color
    let selectedCorners = userArray[userID].selection
    let hasAlreadyPurchased = userArray[userID].startRoad
    if( selectedCorners.length===2 && this.isConnected(coord) && this.isFarEnough()
      && this.isAvailable(type,coordinates)  && (this.isAfforable('road', userID) || 
      (this.isDuringSetUp() && !hasAlreadyPurchased ) ) ){ 
      let roadObj = { type: 'road', points: 0, coordinates: selectedCorners, 
                      associatedHexs: [], color: userColor, userID: userID }
      if( this.isDuringSetUp() ) { 
        userArray[userID].hasBoughtARoad=true
      }
      this.props.addRoad(roadObj)
    }
    else{
      alert('Please pick two valid end points for your new road and try again')
    }
  }
  addingASettlement(){
    let {  userArray } = store.getState()
    let userID = userID
    let userColor = userArray[userID].color
    let selectedCorner = [1] //userArray[userID].selection
    let alreadyPurchased = userArray[userID].startSettlement
    if( selectedCorner.length===1 && isValidSetUpMove  
      && this.isAvailable() && this.isFarEnough() && (this.isAfforable('settlement') || 
      (this.isDuringSetUp() && !alreadyPurchased ) ) ){ //<--no settlement has been registered/added so far in this set up round, if in set up phase
      let settlementObj = { type: 'settlement', points: 1 , color: userColor, userID: userID, 
                            coordinates: selectedCorner,  associatedHexs: []   }
      if( this.isDuringSetUp() ) { 
        userArray[userID].hasBoughtASettlement=true
      }
      this.props.addRoad(settlementObj)
    }
  }
  render() {
    return (
      <div>
    		<button type='submit' onClick={() => this.registerSettlement()}> Add Settlement </button>
    		<button type='submit' onClick={() => this.registerRoad()}> Add Road </button>
      </div>
    	)
	}
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { addRoad, addSettlement } from '../reducers/everyStructure'; 
//bring in other results from reducers as necessary**

const mapState = ({ turnInfo }) => ({turnInfo}); 
// might need userArray[userID][selection] or userArray[userID][startRoad]  startSettlement
const mapDispatch = { addRoad, addSettlement };

export default connect(
  null,
  null
)(Structures)
