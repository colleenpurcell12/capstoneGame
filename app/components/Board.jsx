 import HexGrid from '../../gameutils/react-hexgrid/src/HexGrid.js';
import React, {Component} from 'react';
import {createCorners, assignTokens, renderPorts, addRoad} from 'APP/gameutils/setup.js'
import SubmitForm from './SubmitForm'
import CornerGrid from './CornerGrid'


export default class Board extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectCorner = this.selectCorner.bind(this);
    let boardConfig = {
      width: 700, height: 820,
      layout: { width: 10, height: 10, flat: true, spacing: 1.1 },
      origin: { x: 0, y: 0 },
      map: 'hexagon',
      mapProps: [ 2 ],
      actions: {}
      //   onMouseEnter: function(id){
      //     //console.log("id is",id)
      //     //console.log("document",document
      //     var hex = document.getElementById('h' + id)
      //     //console.log("this",this) //the actions object
      //     //hex.firstElementChild.setAttribute('class','hexhover')
      //   },
      //   onMouseLeave: function(id){
      //     var hex = document.getElementById('h' + id)
      //     //hex.firstElementChild.removeAttribute('class','hexhover')
      //   },
      //   onClick: function(e){
      //     console.log('HEX CLICKED')
      //   }
      // }
    }
    let grid = HexGrid.generate(boardConfig);
    this.state = {
      grid,
      config: boardConfig,
      roads: [],
      value: '',
      selected: {firstCorner: '', secondCorner:''}
     };

  }
  componentDidMount(){
    //createCorners(this.selectCorner);
    //assignTokens();
    //renderPorts();
    //renderRoads(); // this will take the roads ont he state and render them on page load?
  }
  render() {
    let { grid, config } = this.state;

    return (
      <div>
        <div className="board">
          <CornerGrid width={config.width} height={config.height} selectCorner={this.selectCorner} />
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

    // state is 'set' on 'end turn' button
    // has validation
      // do they have resources
      // decrement resources on placement
    // SEND ROAD INFO TO DB/STORE

    // takes in one or two "selected nodes" from state
    // if one, addSettlement
    // if two, addRoad
    // displays which are selected
    // takes color from form ( later from state?)
    let color = event.target.color.value
    var user = { color: color }

    //TESTING ONLY
    console.log('handle add clicked')
    // var nodes = document.getElementsByTagName('circle')
    // var a = nodes[19], b = nodes[20]
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
}

// will have <CircleGrid />
