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
  isAfforable(type){
    if(type==='road'){ //cost lumber and 1 brick
     return userArray[turnInfo][cards][lumber]>=1 && userArray[turnInfo][cards][brick]>=1
    } else { //settlement cost 1L+1B+1G+1W
      return (  userArray[turnInfo][cards][lumber]>=1 && userArray[turnInfo][cards][brick]>=1
              && userArray[turnInfo][cards][grain]>=1 && userArray[turnInfo][cards][wool]>=1  )
    }
  }
  isFarEnough(){

  }
  addingARoad(){
    // need to know the hexagon state data structure
    // the user array structure to find the color by ID
    // ensure that the 1-2 selected corners are stored somewhere
    let {  userArray } = store.getState()
    let userColor = userArray[turnInfo][color]
    let selectedCorners = userArray[turnInfo][selection]
    let alreadyPurchased = userArray[turnInfo][startRoad]
    if( selectedCorners.length===2 && this.isConnected(coord)
      && this.isAvailable(type,coordinates) && this.isFarEnough() && (this.isAfforable('road') || 
      (this.isDuringSetUp() && alreadyPurchased === null) ) ){ //<--no road has been registered/added so far in this set up round, if in set up phase

      let roadObj = {type: 'Road', points: 0, coordinates: this.userArray[turnInfo][selection], associatedHexs = [h1, h2], color: userColor, userID: this.turnInfo}]

      this.props.addRoad(roadObj)
    }
    else{
      alert('Please pick two valid end points for your new road and try again')
    }
  }
  addingASettlement(){
    let {  userArray } = store.getState()
    let userColor = userArray[turnInfo][color]
    let selectedCorner = userArray[turnInfo][selection]
    let alreadyPurchased = userArray[turnInfo][startSettlement]
    if( selectedCorner.length===1 && isValidSetUpMove  
      && this.isAvailable() && this.isFarEnough() && (this.isAfforable('settlement') || 
      (this.isDuringSetUp() && alreadyPurchased === null) ) ){ //<--no settlement has been registered/added so far in this set up round, if in set up phase
    let settlementObj = {type: 'Settlement', points: 1 , 
          coordinates: selectedCorner, associatedHexs = [h1, h2, h3],  
          color: userColor, userID: this.turnInfo}]

    this.props.addRoad(settlementObj)
  }
  render() {
    return (
		<button type='submit' onClick={() => this.registerSettlement()}> Add Settlement </button>
		<button type='submit' onClick={() => this.registerRoad()}> Add Road </button>
    	)
	}
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { addRoad, addSettlement } from '../reducers/everyStructure'; 
//bring in other results from reducers as necessary**

const mapState = ({ turnInfo }) => ({turnInfo}); 
// might need userArray[turnInfo][selection] or userArray[turnInfo][startRoad]  startSettlement
const mapDispatch = { addRoad, addSettlement };

export default connect(
  null,
  null
)(Structures)
