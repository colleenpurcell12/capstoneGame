import HexGrid from '../../gameutils/react-hexgrid/src/HexGrid.js';
import React, {Component} from 'react';
//import SubmitForm from './SubmitForm'
import {shuffle, addRoad, tokenArray, resourcesArray} from 'APP/gameutils/setup.js'
import CornerGrid from './CornerGrid'
import Roads from './Roads'
import Layout from '../../gameutils/react-hexgrid/src/Layout'
import GridGenerator from '../../gameutils/react-hexgrid/src/GridGenerator'
import HexUtils from '../../gameutils/react-hexgrid/src/HexUtils';
import Point from '../../gameutils/react-hexgrid/src/Point';
import PortGrid from './PortGrid'
import store from '../store'
import {addAction} from '../reducers/action-creators'
import {assignHexData} from '../reducers/hex-data'

class Board extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectCorner = this.selectCorner.bind(this);
    this.generate = this.generate.bind(this)
    //this.addRoad = this.addRoad.bind(this)
    //config handled off component?
    let boardConfig = {
      width: 700, height: 820,
      layout: { width: 10, height: 10, flat: true, spacing: 1.1 }, // change to
      origin: { x: 0, y: 0 },
      map: 'hexagon',
      mapProps: [ 2 ],
      actions: {}
    }
    let grid = this.generate(boardConfig);

    let corners = grid.corners

    // this.props.putCorners(corners)
    this.state = {
      grid,
      config: boardConfig,
      roads: [],
      value: '',
      selected: {firstCorner: null, secondCorner: null},
      tokens: [],
      resources: [],
      roads: [{x1: -5.5, y1: 9.52, x2: 5.5, y2: 9.52, color: 'green'}],
      settlements: [],
      corners
     };
     // tokens, resources, settlements, roads, and actions should come from connect?
     // currently kept on board state
   }

  componentDidMount(){
  }
        // <div>
        //  <SubmitForm id = "Form" handleSubmit={this.handleSubmit}/>
        // </div>
  render() {
    let { grid, config, roads} = this.state;
    return (
      <div>
        <div className="board" style={{marginTop: '-60px'}}>
          <PortGrid width={config.width} height={config.height} selectPort={this.selectPort}/>
          <CornerGrid width={config.width} height={config.height} selectCorner={this.selectCorner} corners={this.state.corners} />
          <Roads width={config.width} height={config.height} roads={roads}/>
          <HexGrid actions={config.actions} width={config.width} height={config.height} hexagons={grid.hexagons} layout={grid.layout} />
        </div>
    </div> 
    );
  }

  selectCorner(event) {
  //Cases: first time a corner is touched
  // either the first or the 2nd is clicked twice,
  // one is clicked when there is a first but not a 2nd, a 3nd but not a 1st
  // a third one is clicked when there is both a first and a second
  //idea to seperate teh class css from the this.state.selected
    //is this one already selected

    if (event.target == this.state.selected.firstCorner ){//if the corner is one of the first or second
      //console.log("1st corner",event.target)
      event.target.removeAttribute('class', 'corner-select');
      event.target.setAttribute('class', 'corner-deselected');
      this.state.selected.firstCorner = null
      console.log("1st corner event.target", event.target)
       console.log("1st corner should now be null", this.state.selected.firstCorner)
    }

    if (event.target == this.state.selected.secondCorner){
      console.log("2nd corner")
      event.target.removeAttribute('class', 'corner-select'); //.corner-node{
      event.target.setAttribute('class', 'corner-node');
      event.target.setAttribute('class', 'corner-deselected');
      this.state.selected.secondCorner = null
    }

    var updatedSelected = this.state.selected
    if(this.state.selected.firstCorner){ //at least one
      if(!this.state.selected.secondCorner){ //exactly one
        //time to fill in 2nd
        event.target.setAttribute('class', 'corner-select');
        updatedSelected.secondCorner = event.target
        this.setState({ selected: updatedSelected })
      } //first is filled
    }
    //first empty, unsure about the 2nd
    else { //
        if(!this.state.selected.secondCorner){ //completely empty
          event.target.setAttribute('class', 'corner-select');
          updatedSelected.firstCorner = event.target
          this.setState({selected: updatedSelected})
        } //first is filled
        //if there is a 2nd but not a first, fill back in first
        else{
          event.target.setAttribute('class', 'corner-select');
          updatedSelected.firstCorner = event.target
          this.setState({ selected: updatedSelected })

        }
    }
    console.log('this.state.selected', this.state.selected)
    // if(this.state.selected.length >= 2) {
    //       console.log('ALREADY 2 SELECTED, no class added')
    //       event.target.removeAttribute('class', 'corner-select');
    //      // event.target.setAttribute('class', 'corner-deselected');
    // }
    // else if(this.state.selected.length === 0)  {
    //   event.target.setAttribute('class', 'corner-select');
    //   this.setState({selected: [event.target]})
    // } else {
    //   event.target.setAttribute('class', 'corner-select');
    //   var sA = this.state.selected;
    //   sA.push(event.target)
    //   this.setState({selected: sA})
    // }
    // console.log('this.state', this.state)
  }

  handleSubmit(event){
    event.preventDefault();

    let color = event.target.color.value
    var user = { color: color }

    //TESTING ONLY
    console.log('handle addroad clicked')
    console.log('this.state.selected', this.state.selected.firstCorner)
    var a = this.state.selected.firstCorner, b = this.state.selected.secondCorner

    this.state.selected = []

    //this.addRoad(a, b, user)
    a.removeAttribute('class', 'corner-select');
    b.removeAttribute('class', 'corner-select');
    // a.removeAttribute('class', 'corner-deselected');

  }

  //  addRoad(a, b, c){
  //   var roadsArray = this.state.roads
  //   var newRoad = {
  //     x1: parseInt(a.attributes.cx.value),
  //     y1: parseInt(a.attributes.cy.value),
  //     x2: parseInt(b.attributes.cx.value),
  //     y2: parseInt(b.attributes.cy.value),
  //     color: c.color
  //   }
  //   roadsArray.push(newRoad)
  //   this.setState({roads: roadsArray})
  //   // add road to state
  //   console.log('state after addroad', this.state)
  // }

  generate(config){
    // create layout object
    let layout = new Layout(config.layout, config.origin);
    let generator = GridGenerator.getGenerator(config.map);

    //make hexagon array
    let hexagons = generator.apply(this, config.mapProps);

    //make hexagon object with
    let map = hexagons.reduce((all, one) => Object.assign({},
      all,
      {[[one.q, one.r, one.s]]: one}
    ), {})

    const allCorners = {}
    // create corners object out of hexes
    hexagons.forEach((hex, i) => {
      hex.id = i
      corners(hex, corner => {
        const hexes = corner.hexes.map(hex => map[coord(hex)] || coord(hex))
        allCorners[cornerCoord(...corner.hexes)] = {hexes, id: null}
      })
    })
    var n = 0;
    // assign id to all corners
    for(var corner in allCorners){
      allCorners[corner].id = n++;
    }

    // assign neighbors to all corners
    for(var corner in allCorners){
      allCorners[corner].neighbors = findNeighbors(allCorners[corner], allCorners)
      var coords = setCoords(corner, layout);
      allCorners[corner].x = coords.x
      allCorners[corner].y = coords.y
    }

    //debugging
    console.log('hexagons', hexagons)
    console.log('corners', allCorners)
    console.log(`found ${Object.keys(allCorners).length} corners`)

    //puts all the corners on the state
    this.props.putCorners(allCorners)

    return { hexagons, layout, corners: allCorners };
  }

}

const neighborDirections = [
    {q: 0, r: -1,s: +1},
    {q: 1, r: -1,s: 0},
    {q: 1, r: 0, s:-1},
    {q: 0, r: 1, s:-1},
    {q: -1,r:  1,s: 0},
    {q: -1,r:  0,s: 1},
]

function coord(hex) {
  return [hex.q, hex.r, hex.s].join(',')
}

function setCoords(corner , layout){
  var hexCoords = corner.split(':'), x, y
  var a = HexUtils.hexToPixel(hexCoords[0], layout);
  var b = HexUtils.hexToPixel(hexCoords[1], layout);
  var c = HexUtils.hexToPixel(hexCoords[2], layout);

  if (a.x === b.x){
    x = (a.x + c.x + b.x)/3
    y = (c.y)
  }
  else if (a.x === c.x){
    x = (a.x + c.x + b.x)/3
    y = (b.y)
  } else {
    x = (a.x + c.x + b.x)/3
    y = (a.y)
  }
  return new Point(x, y);
}
// Return the normalized corner coordinate of
// the corner between hexes A, B, and C.
const cornerCoord = (a, b, c) =>
  [coord(a), coord(b), coord(c)].sort().join(':')

// Add the hex coordinate lhs to the hex coordinate rhs
function plus(lhs, rhs) {
  return {
    q: lhs.q + rhs.q,
    r: lhs.r + rhs.r,
    s: lhs.s + rhs.s,
  }
}

function corners(hex, visitor) {
  const dirs = neighborDirections
  dirs.forEach((vec, i) => {
    // come up with a corner based on my coordinate, my ith
    // neighbor's coordinate, and my i + 1th neighbor's coordinate
    const hexes = [hex, plus(hex, vec), plus(hex, dirs[(i + 1) % dirs.length])]
    visitor({hexes})
  })
}


function findNeighbors(a, cObj){
  var neighbors = [];
  for(var corner in cObj){
    var common = 0;
    a.hexes.forEach(hex => {
      if(cObj[corner].hexes.indexOf(hex) >= 0){
        common++
      }
    })
    if(common === 2){
      neighbors.push(cObj[corner].id)
    }
  }
  return neighbors;

}
/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
//import { addRoad, addSettlement } from '../reducers/everyStructure';
import { putCorners } from '../reducers/corner';

const mapStateToProps = ({ turnInfo, hexData }) => ({turnInfo, hexData});
// might need userArray[userID][selection] or userArray[userID][startRoad]  startSettlement

const mapDispatch = { putCorners };


export default connect(
  mapStateToProps,
  mapDispatch
)(Board)
