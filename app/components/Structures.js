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
   // console.log("everyRoad[1].coordinates[0][1]:",everyRoad[1].coordinates[0][0],"should equal coord[0][0]:",coord[0][0])
      // console.log("everyRoad[1].coordinates[0][1]:",everyRoad[1].coordinates[0][1],"should equal coord[0][1]:",coord[0][1])
      // console.log("everyRoad[1].coordinates[0][1]:",everyRoad[1].coordinates[1][0],"should equal coord[1][0]:",coord[1][0])
      // console.log("everyRoad[1].coordinates[0][1]:",everyRoad[1].coordinates[1][1],"should equal coord[1][1]:",coord[1][1])

  isAvailable(type, coord){  //WORKS          
    //return true //for testing
    let { everyStructure, selections, turnInfo } = this.props   
    if(type==='road'){
      let everyRoad = everyStructure.filter( (struc) => struc.type==='road')
      //could alternatively check if both corners match
      //EDGE CASE is the order of coordinates always the same?
      let sameRoad = everyRoad.filter( (struc) => //struc.coordinates===coord )
        struc.coordinates[0][0]    === coord[0][0]
        && struc.coordinates[0][1] === coord[0][1]
        && struc.coordinates[1][0] === coord[1][0]
        && struc.coordinates[1][1] === coord[1][1]
        )
      console.log("XXX matching road is ",sameRoad) //[]
      // console.log("XXX matching road's coords in everyStructure ",sameRoad.coordinates,"which should equal everyRoad[1].coordinates",everyRoad[1].coordinates)
      if(sameRoad.length===0){ return true } //non already purchased, isAvailable true
      else { return false }
    }
    else { //settlement
      let settlementOnThisCorner = everyStructure.filter( struc => 
                          (struc.cornerId === selections[0].id ) 
                          && (struc.type==='settlement' || struc.type==='city') 
                        )
      console.log("settlementOnThisCorner ",settlementOnThisCorner) 

      // let sameSettlement = everyStructure.filter( (struc) => //struc.coordinates===coord
      //   (struc.type==='settlement' || struc.type==='city')
      //   && struc.coordinates[0]===coord[0]
      //   && struc.coordinates[1]===coord[1] )
      // // console.log("XXX matching settlements in everyStructure ",sameSettlement,"which should equal everySettlement[0].coordinates",everySettlement[0].coordinates)
      //  console.log("sameSettlement ",sameSettlement) //WORKS

      if(settlementOnThisCorner.length>0 ){ //&& sameSettlement.length>0){
        console.log("Someone already owns a structure here")
        return false
      } else { return true }
    }
      //console.log("AVAILABLE SETTLEMENT?")
      // console.log("everyStructure[0].coordinates", everyStructure[1].coordinates)
      // //[-5.5, 9.526279441628825]
      // console.log("coord[0]", coord[0])

      //let everySettlement = everyStructure.filter( (struc) => struc.type==='settlement')
      // console.log("everyStructure has only one settlement:", everySettlement)
      // console.log("everySettlement[0].coordinates",everySettlement[0].coordinates)
      //  console.log("coord", coord)

      // console.log("everySettlement[0].coordinates[0][0]:",everySettlement[0].coordinates[0],"should equal coord[0][0]:",coord[0])
      // console.log("everySettlement[0].coordinates[0][1]:",everySettlement[0].coordinates[1],"should equal coord[0][1]:",coord[1])
      // console.log("everySettlement[0].coordinates[1][0]:",everySettlement[0].coordinates[1],"should equal coord[1][0]:",coord[1][0])
      // console.log("everySettlement[0].coordinates[1][1]:",everySettlement[0].coordinates[1],"should equal coord[1][1]:",coord[1][1])

    
    //   if(sameSettlement.length===0){ return true } //non already purchased, isAvailable true
    //   else { return false }
    // }
  }
  //ROADS VALIDATION
  isConnected(coord){ //return true //FOR TESTING 
    //Check if there is a settlement/city or a road that you own, which shares a corner
    //aka matches on one of the coordinates of the road you are adding, coord.
    let { everyStructure } = this.props
    let everySettlement = everyStructure.filter( (struc) => struc.type==='settlement')
    let everyRoad = everyStructure.filter( (struc) => struc.type==='road')
    let shareCorner1=[]
    let shareCorner2=[]
    for(var i = 0 ; i<2 ;i++){
      shareCorner1[i] = everyRoad.filter( (struc) => 
        struc.coordinates === coord[i]
        //console.log("struc:", struc.coordinates)
      )
      shareCorner2[i] = everySettlement.filter( (struc) => 
        struc.coordinates.x===coord[i][0]
        && struc.coordinates.y===coord[i][1] 
        )
    }
    // console.log("coord",coord)
    // console.log("shareCorner1", shareCorner1)
    // console.log("shareCorner2", shareCorner2)
    return (shareCorner1[0] || shareCorner1[0] || shareCorner2[1] || shareCorner2[1])
  }

  isAfforable(type){
    let {  userArray, turnInfo } = this.props
    let userIndex = turnInfo-1
    let userCards = userArray[userIndex].cardsResource
    let {  type1, type2, type3, type4, type5 } = userCards
    if(type==='road'){ //cost lumber and 1 brick in catan world
      //type1 = lumber, type2 = brick, type3 = wool, type4 = grain, type5 = ore
     return type1>=1 && type2>=1
    } else if (type==='settlement') { //settlement cost 1L+1B+1G+1W
      return ( type1>=1 && type2>=1 && type4>=1 && type3>=1 )
    } else{ //if type ==='city'
      return ( type3>=2 && type5>=3 )
    }
  }
  // isFarEnough for roads...? the corner at which it's connected with another road, can't have someone else's corner on it
  // var cornerNeighbors2 =  selections[1].neighbors

  //CITY/SETTLEMENT VALIDATION
  isFarEnough(coord){
    //take selected corner
    //then find neighbors (by id aka selected[0].id)
    //then compare those 5 to any in the every structure
    //if any of the 5 neighbors are in everystructure with other id, return false

    let {  turnInfo, selections, everyStructure, corners } = this.props
    var cornerNeighbors =  selections[0].neighbors
   
    // check that neighbors corners dont have non-owned settlements/cities

      //have to look at each neighbor corner and see if any match another player's owned structures
      let tooCloseStructure;
      for(var i = 0 ; i<cornerNeighbors.length ; i++){
        tooCloseStructure = everyStructure.filter( (struc) => 
          (struc.cornerId === cornerNeighbors.id ) 
          && (struc.type==='settlement' || struc.type==='city') 
          && struc.userID!==turnInfo
            ) //closes filter
      } //closes for loop
      console.log("isFarEnough away, unless this not empty:",tooCloseStructure)
      if( tooCloseStructure.length>0 ){ 
        return false
      }
      // look in everyStructure for settlements/cities
      // then try to "match" the settlements by ??? to the neighbor corners by either name or coordinates
    
    return true
  }
  registerRoad(){
    let {  userArray, turnInfo, selections } = this.props
    
    if(selections.length>=2) {
      var cornerA = selections[0], cornerB = selections[1]
      var coord = [ [cornerA.x, cornerA.y], [cornerB.x, cornerB.y] ] //x1,y1,x2,y2
      let userIndex = turnInfo-1
      let userID = turnInfo
      let userObj = userArray[userIndex]
      let userColor = userObj.color

      let associatedHexs = []
      for(var i = 0 ; i<3 ; i++){ //some corners are on coast lines
        if(typeof cornerA.hexes[i] === 'string'){
          console.log("This cornerA is on an edge.")   
        } else {
          associatedHexs.push(cornerA.hexes[i].id)
        }
        if(typeof cornerB.hexes[i] === 'string'){
          console.log("This cornerB is on an edge.")   
        } else {
          associatedHexs.push(cornerB.hexes[i].id)
        }
      }
      // [cornerA.hexes[0].id, cornerA.hexes[1].id, cornerA.hexes[2].id]
      // let associatedHexsCorner2 = []

      // [cornerB.hexes[0].id, cornerB.hexes[1].id, cornerB.hexes[2].id]
      // let associatedHexs = associatedHexsCorner1.concat( associatedHexsCorner2 )

      console.log("this.isConnected(coord) ",this.isConnected(coord)  )
      console.log("this.isFarEnough('road')", this.isFarEnough('road') )
      console.log("this.isAvailable('road', userID)",this.isAvailable('road', coord) )
      console.log("this.isAfforable('road')",this.isAfforable('road') )
      console.log("this.props.isSettingUp && !userObj.hasBoughtARoad", this.props.isSettingUp && !!userObj.hasBoughtARoad )

      if( this.isAvailable('road',coord) && ( (this.isAfforable('road') && this.isConnected(coord)) 
          || (this.props.isSettingUp && !userObj.hasBoughtARoad) ) ){ 

        let roadObj = { type: 'road', points: 0, coordinates: coord,
                        corners:  [cornerA.id, cornerB.id],
                        associatedHexs: associatedHexs, color: userColor, userID: userID }

        //so user can't select/register another road during this round of set up
        if( this.props.isSettingUp ) { userObj.hasBoughtARoad = true }

        //send off to the everyStructures array used for validation, with firebase
        addAction(this.props.addRoadToEveryStructure(roadObj)) //formerly addRoad()

        //to the road state used for rending visuals
        var roadObj ={color: userColor, corners: [cornerA.id, cornerB.id],  //ids
                  owner: userID, coordinates: coord } 
        addAction(this.props.addRoadToRoads(roadObj)) //formerly: this.props.addBoardRoad
      }
      else{ console.log('That road not a valid purchase.') }
    }
    //if less than 2 corners selected
    else { console.log('Please select two corners for your new road and try again') }
  }
  isValidateSettlement(userObj){
    var legalSetUp = this.props.isSettingUp && !userObj.hasBoughtASettlement 
    return this.isAfforable('settlement') || legalSetUp
  }
  registerSettlement(){
    let {  userArray, turnInfo, selections } = this.props
    let userIndex = turnInfo-1
    let userID = turnInfo
    let userObj = userArray[userIndex]
    let associatedHexs = []
    let corner = selections[0]
      for(var i = 0 ; i<3 ; i++){ //some corners are on coast lines
        if(typeof corner.hexes[i] === 'string'){
          console.log("This corner is on an edge.")   
        } else {
          associatedHexs.push(corner.hexes[i].id)
        }
      }

    // let associatedHexs = [selections[0].hexes[0].id, selections[0].hexes[1].id, selections[0].hexes[2].id]
    let coord = [selections[0].x, selections[0].y]
    //console.log("this.isAvailable('settlement', userID)",this.isAvailable('settlement', coord) )

    if ( selections.length===1 && this.isAvailable('settlement', coord) 
      && this.isFarEnough('settlement', coord) && this.isValidateSettlement(userObj) ){
      let settlementObj = { type: 'settlement', points: 1, 
                            color: userObj.color, 
                            userID: userID,
                            cornerId: selections[0].id,
                            coordinates: coord,  
                            associatedHexs: associatedHexs   
                          }
      if( this.props.isSettingUp ) {  userObj.hasBoughtASettlement=true }
      
      console.log("selections.length",selections.length )
      console.log("this.isFarEnough('settlement')", this.isFarEnough('settlement') )
      console.log("this.isAvailable('settlement', userID)",this.isAvailable('settlement', coord) )
      console.log("this.isAfforable('settlement')",this.isAfforable('settlement') )
      console.log("this.props.isSettingUp && !userObj.hasBoughtASettlement", this.props.isSettingUp && !!userObj.hasBoughtASettlement )

      //everyStructure used for movie validation dispatched with firebase
      addAction(this.props.addSettlementToEveryStructure(settlementObj))
      console.log("before addPoint for settlement, userIndex",userIndex)
      addAction( this.props.addPoint(userIndex)) 
      //structure used for rending visual
      var settleObj = {color: userObj.color, corner_id: 32, type: 'settlement'}
      addAction( this.props.addBoardStructure(settleObj) )
    }
    else {
      console.log('Please make sure you have selected a single valid corner for your new structure and try again')
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
    let {   turnInfo, selections } = this.props
    let cornerID = selections[0].id
    let userID = turnInfo
    let userIndex = userID-1
    //cornerID = 20; userID = 2; //TESTING
    if( selections.length===1 
      && this.isSettlementPlayerAlreadyOwns(cornerID, userID)
      &&  this.isAfforable('city') 
      && !this.props.isSettingUp 
       ) {
      addAction( this.props.upgradeBoardStructure(cornerID) )
      addAction( this.props.addCityToEveryStructure(cornerID))
      //also increment player's points in userArray
      console.log("before addPoint for city, userIndex",userIndex)
      addAction( this.props.addPoint(userIndex)) 
    }    
    else{
      if(!this.isAfforable('city')){
        console.log("Can't afford a city.")
      } if(!this.isSettlementPlayerAlreadyOwns(cornerID) ){
        console.log("You dont already own a settlement at cornerID:",cornerID)
      } if( this.props.isSettingUp ){
        console.log("It's set up, so choose a settlement, cant purchase a city right now.")
      } if(selections.length!==1){
        console.log("Make sure you only have one corner selected")
      } console.log('Make sure you have selected a single corner on which you already own a settlment and try again')
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
import { addBoardStructure, upgradeBoardStructure } from '../reducers/structure';
import { addRoadToRoads } from '../reducers/road';
import { addRoadToEveryStructure, addSettlementToEveryStructure, addCityToEveryStructure } from '../reducers/everyStructure';
import { addPoint } from '../reducers/usersArray';

const mapState = ({ isSettingUp, turnInfo, userArray, selections, everyStructure }) => ({isSettingUp, turnInfo, userArray, selections, everyStructure });
const mapDispatch = { addBoardStructure, upgradeBoardStructure, addRoadToRoads, addRoadToEveryStructure, addSettlementToEveryStructure, addCityToEveryStructure, addPoint};

export default connect(
  mapState,
  mapDispatch
)(Structures)