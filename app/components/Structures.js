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
  isDuringSetUp(){
    return this.props.isSettingUp
  }
  isAvailable(type, coord){           

    //return true //for testing
    let { everyStructure } = this.props
    if(type==='road'){
      let everyRoad = everyStructure.filter( (struc) => struc.type==='road')
      //console.log("everyRoad have only roads in everyStructure, but it's:", everyRoad)
      let sameRoad = everyStructure.filter( (struc) => struc.coordinates===coord)
      //console.log("XXX sameRoad should be empty cause no match in everyStructure, but it's:",sameRoad)

      if(!sameRoad){ return true }
      else { return false }
    }
    else { //settlement
      let everySettlement = everyStructure.filter( (struc) => struc.type==='settlement')
      //console.log("everySettlement have only settlements in everyStructure, but it's:", everySettlement)
      let sameSettlement = everyStructure.filter( (struc) => struc.coordinates===coord)
      //console.log("sameSettlement should be empty cause no match in everyStructure, but it's:",sameSettlement) //WORKS
      if(!sameSettlement){ return true }
      else { return false }
    }
  }
  isConnected(coord){ //only for registering roads

    //Check if there is a settlement/city or a road that you own, which shares a corner
    //aka matches on one of the coordinates of the road you are adding, coord.
    let {  everyStructure } = this.props
    let shareCorner1 = everyStructure.filter( (struc) => struc.coordinates[0]===coord)
    let shareCorner2 = everyStructure.filter( (struc) => struc.coordinates[1]===coord)
    //console.log("shareCorner2 should be empty cause no match in everyStructure, but it's:",shareCorner2)
    return (shareCorner1 || shareCorner2)
    //return true //for testing
  }
  isAfforable(type, userID){
    let {  userArray } = this.props
    let userCards = userArray[userID].cardsResource
    //console.log("userCards defined?", userCards)
    if(type==='road'){ //cost lumber and 1 brick in catan world
      //type1 = lumber, type2 = brick
      //type3 = wool, type4 = grain, type5 = ore
     return userCards.type1>=1 && userCards.type2>=1
    } 
    else if (type==='settlement') { //settlement cost 1L+1B+1G+1W
      return ( userCards.type1>=1 && userCards.type2>=1
              && userCards.type4>=1 && userCards.type3>=1 )
    }
    else{//if type city
      return ( userCards.type3>=2 && userCards.type5>=3)
    }
  }
  // isFarEnough for roads...? the corner at which it's connected with another road, can't have someone else's corner on it
  // var cornerNeighbors2 =  selections[1].neighbors

  //just for settlement/cities
  isFarEnough(coord){
    //take selected corner
    //then find neighbors (by id aka selected[0].id)
    //then compare those 5 to any in the every structure
    //if any of the 5 neighbors are in everystructure with other id, return false

    let {  turnInfo, selections, everyStructure, corners } = this.props
    var cornerNeighbors =  selections[0].neighbors

    //have an array of corner IDs, must find x and y of all of them
    //var arrayOfNeighborCornerCoords = []

    //go through all the corners by id to find the neighbor corner coordinates
    // for(var i = 0; <corners.length ; i++){
    //       if (corners[i] === selections[0].id || corners[i] === selections[1].id ){
    //         console.log("corners[i]",corners[i],"matches the selections[x].id",selections[0].id ,"or ",selections[1].id )
    //         arrayOfNeighborCornerCoords.push([corners[i].x, cornercorners[i].y])
    //       }
    //   }    
    // now check that there aren't any non-owned settlements/cities with those coordinates

    //search if there are any se
    everyStructure.filter( struc => 
                          (struc.cornerId === selections[0].id ) 
                          && (struc.type==='settlement' || struc.type==='city') 
                          && userID!==turnInfo
                        )

    // check that neighbors corners dont have non-owned settlements/cities

      //have too look at each neighbor corner and see if any match another player's owned structures
      let tooCloseStructure;
      for(var i = 0 ; i<cornerNeighbors.length ; i++){
        tooCloseStructure = everyStructure.filter( (struc) => 
          (struc.cornerId === cornerNeighbors.id ) 
          && (struc.type==='settlement' || struc.type==='city') 
          && userID!==turnInfo
            ) //closes filter
      } //closes for loop
      console.log("isFarEnough keeps failing, tooCloseStructure should be falsy:",tooCloseStructure)
      if( tooCloseStructure.length>0 ){ 
        return false
      }
      // look in everyStructure for settlements/cities
      // then try to "match" the settlements by ??? to the neighbor corners by either name or coordinates
    
    return true
  }
  registerRoad(){
    // need to know the hexagon state data structure
    // the user array structure to find the color by ID
    // ensure that the 1-2 selected corners are stored somewhere
    //console.log("
    let {  userArray, turnInfo, selections } = this.props
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
    let userID = turnInfo-1
    let userObj = userArray[userID]
    let userColor = userObj.color
    let hasAlreadyPurchased = userObj.hasBoughtARoad //true or false
    let associatedHexsCorner1 = [selections[0].hexes[0].id, selections[0].hexes[1].id, selections[0].hexes[2].id]
    let associatedHexsCorner2 = [selections[1].hexes[0].id, selections[1].hexes[1].id, selections[1].hexes[2].id]
    let associatedHexs = associatedHexsCorner1.concat( associatedHexsCorner2 )

    // console.log("this.isConnected(coord) ",this.isConnected(coord)  )
    // console.log("this.isFarEnough('road')", this.isFarEnough('road') )
     console.log("this.isAvailable('road', userID)",this.isAvailable('settlement', coord) )
    // console.log("this.isAfforable('road', userID)",this.isAfforable('settlement', userID) )
    // console.log("this.isDuringSetUp() && !hasAlreadyPurchased", this.isDuringSetUp() && !hasAlreadyPurchased )

    if( selections.length===2 
      && this.isAvailable('road',coord)  
      && ( (this.isAfforable('road', userID) && this.isConnected(coord)) 
        || (this.isDuringSetUp() && !hasAlreadyPurchased) ) 
      ){ 

      let roadObj = { type: 'road', points: 0, coordinates: coord,
                      corners:  [selections[0].id, selections[1].id],
                      associatedHexs: associatedHexs, color: userColor, userID: userID }
      //so user can't select/register another road during this round of set up
      if( this.isDuringSetUp() ) { userObj.hasBoughtARoad = true }

      //to the road state used for rending visuals
      addAction(this.props.addRoadToRoads({
                          color: userColor,
                          corners: [selections[0].id, selections[1].id],  //ids
                          coordinates: coord, //corner coords [[x1,y1],[x2,y2]]
                          owner: userID
                           }))
      //formerly: this.props.addBoardRoad(

      //send off to the everyStructures array used for validation
      //firebase
      addAction(this.props.addRoadToEveryStructure(roadObj))
      //Formerly with dispatcher: this.props.add Road(roadObj)

    }
    else{
      console.log('Please pick two valid end points for your new road and try again')
    }
  }
  registerSettlement(){
    //first check if it's a city, as in there is already a settlement of same owner on the single selected corner
    let {  userArray, turnInfo, selections } = this.props
    let userObj = userArray[turnInfo-1]
    let associatedHexs = [selections[0].hexes[0].id, selections[0].hexes[1].id, selections[0].hexes[2].id]
    let coord = [selections[0].x, selections[0].y]
    console.log("this.isAvailable('settlement', userID)",this.isAvailable('settlement', coord) )

    if( selections.length===1 //&& isValidSetUpMove  
      && this.isAvailable('settlement') && this.isFarEnough('settlement', coord) 
      && ( this.isAfforable('settlement', turnInfo-1) 
        || (this.isDuringSetUp() && !userObj.hasBoughtASettlement) ) 
      ){ //<--no settlement has been registered/added so far in this set up round, if in set up phase
      let settlementObj = { type: 'settlement', points: 1 , 
                            color: userObj.color, userID: turnInfo-1,
                            cornerId: selections[0].id,
                            coordinates: coord,  
                            associatedHexs: associatedHexs   
                          }
      if( this.isDuringSetUp() ) {
        userObj.hasBoughtASettlement=true
      }
      //structure used for rending visual
      addAction( 
        this.props.addBoardStructure({color: userObj.color, corner_id: 32, type: 'settlement'}) )

      //everyStructure used for validateion using firebase
      addAction(this.props.addSettlementToEveryStructure(settlementObj))
    }
    else{
      console.log('Please make sure you have selected a single valid corner for your new structure and try again')
    }
  }
  isSettlementPlayerAlreadyOwns(){

  }
	upgradeSettlement(){
		//add logic for upgrading to city here
    let corner_id = this.props.selection[0].id

    if( selections.length===1 && this.isSettlementPlayerAlreadyOwns()
      &&  this.isAfforable('city') && !this.isDuringSetUp() 
       ) {
      addAction( this.props.upgradeBoardStructure(corner_id) )
      addAction( this.props.addCityToEveryStructure(corner_id)) 
    }    
    else{
      console.log('Please make sure you have selected a single corner on which you already own a settlment and try again')
    }
    //addAction(addSettlementToEveryStructure(settlementObj))
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
//Dont need dispatchers: import { addRoad, addSettlement } from '../reducers/everyStructure';
import { addBoardStructure, upgradeBoardStructure } from '../reducers/structure';
import { addRoadToRoads } from '../reducers/road';
import { addRoadToEveryStructure, addSettlementToEveryStructure, addCityToEveryStructure } from '../reducers/everyStructure';


const mapState = ({ isSettingUp, turnInfo, userArray, selections, everyStructure }) => ({isSettingUp, turnInfo, userArray, selections, everyStructure });
const mapDispatch = { addBoardStructure, addRoadToRoads, addRoadToEveryStructure, addSettlementToEveryStructure, addCityToEveryStructure};

export default connect(
  mapState,
  mapDispatch
)(Structures)