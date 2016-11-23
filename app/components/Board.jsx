import HexGrid from '../../gameutils/react-hexgrid/src/HexGrid.js';
import React, {Component} from 'react';
import {shuffle, assignHexData, addRoad, tokenArray, resourcesArray} from 'APP/gameutils/setup.js'
import SubmitForm from './SubmitForm'
import CornerGrid from './CornerGrid'
import Layout from '../../gameutils/react-hexgrid/src/Layout'
import GridGenerator from '../../gameutils/react-hexgrid/src/GridGenerator'
import HexUtils from '../../gameutils/react-hexgrid/src/HexUtils';
import Point from '../../gameutils/react-hexgrid/src/Point';
import PortGrid from './PortGrid'

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectCorner = this.selectCorner.bind(this);
    this.generate = this.generate.bind(this)

    let boardConfig = {
      width: 700, height: 820,
      layout: { width: 10, height: 10, flat: true, spacing: 1.1 }, // change to
      origin: { x: 0, y: 0 },
      map: 'hexagon',
      mapProps: [ 2 ],
      actions: {}
    }
    let grid = this.generate(boardConfig);
    this.state = {
      grid,
      config: boardConfig,
      roads: [],
      value: '',
      selected: {firstCorner: '', secondCorner:''},
      tokens: tokenArray,
      resources: resourcesArray
     };
     // tokens and props should come from connect?
     // on board render, if new game, proceeed with shuffle
     // send shuffle'd to db under game id?
     // if not new game/ game in progress, set tokens/res to retrieved from db
   }

  componentDidMount(){
      // this should be if new game
      // this should be actions that dispatch an arry to the db
      if(!this.state.tokens.length){
        var shuffledTokens = shuffle(tokenArray)
        this.setState({tokens: shuffledTokens})
      };
      if(!this.state.tokens.length){
        var shuffledResources = shuffle(resourcesArray)
        this.setState({resources: shuffledResources})
      };
    //assignTokens();
    //renderPorts();
    //renderRoads(); // this will take the roads ont he state and render them on page load?
  }

  render() {
    let { grid, config } = this.state;
    return (
      <div>
        <div className="board">
          <PortGrid width={config.width} height={config.height} selectPort={this.selectPort}/>
          <CornerGrid width={config.width} height={config.height} selectCorner={this.selectCorner} corners={grid.corners} />
          <HexGrid actions={config.actions} width={config.width} height={config.height} hexagons={grid.hexagons} layout={grid.layout} />
        </div>

        <div>
         <SubmitForm id = "Form" handleSubmit={this.handleSubmit}/>
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
    if (event.target==this.state.selected.firstCorner ){//if the corner is one of the first or second
      //console.log("1st corner",event.target)
      event.target.removeAttribute('class', 'corner-select');
      event.target.setAttribute('class', 'corner-deselected');
      this.state.selected.firstCorner = null
      console.log("1st corner event.target", event.target)
       console.log("1st corner should now be null", this.state.selected.firstCorner)
    }

    if (event.target==this.state.selected.secondCorner){
      console.log("2nd corner")
      event.target.removeAttribute('class', 'corner-select'); //.corner-node{
        event.target.setAttribute('class', 'corner-node');
      event.target.setAttribute('class', 'corner-deselected');
      this.state.selected.secondCorner = null
    }

    var updatedSelected =this.state.selected
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
    console.log('handle add clicked')
    var a = this.state.selected[0], b = this.state.selected[1]
    this.state.selected = []

    // user = color from form
    addRoad(a, b, user) // can you set state from within add road?
    a.removeAttribute('class', 'corner-select');
    b.removeAttribute('class', 'corner-select');
    // a.removeAttribute('class', 'corner-deselected');
    // pushes new road to state
    // var newRoad = {x1, x2, y1, y2}
    // this.setState(roads: roads.push(newRoad))
  }


  generate(config){
    let layout = new Layout(config.layout, config.origin);
    let generator = GridGenerator.getGenerator(config.map);

    //make hexagon array
    let hexagons = generator.apply(this, config.mapProps);

    //make hexagon object with
    let map = hexagons.reduce((all, one) => Object.assign({},
      all,
      {[[one.q, one.r, one.s]]: one}
    ), {})
    console.log('map=', map)

    const allCorners = {}
    // need to add id to hex map
    hexagons.forEach((hex, i) => {
      hex.id = i
      corners(hex, corner => {
        const hexes = corner.hexes.map(hex => map[coord(hex)] || coord(hex))
        allCorners[cornerCoord(...corner.hexes)] = {hexes, id: null}
      })
    })
    var n = 0;
    for(var corner in allCorners){
      allCorners[corner].id = n++;
    }
    for(var corner in allCorners){
      allCorners[corner].neighbors = findNeighbors(allCorners[corner], allCorners)
      var coords = setCoords(corner, layout);
      allCorners[corner].x = coords.x
      allCorners[corner].y = coords.y
    }
    //this.state is not a thing???
    hexagons = assignHexData(hexagons, tokenArray, resourcesArray)
    console.log('hexagons =', hexagons)
    console.log('corners', allCorners)
    console.log(`found ${Object.keys(allCorners).length} corners`)
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
