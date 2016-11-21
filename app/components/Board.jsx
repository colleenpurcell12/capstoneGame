import { HexGrid } from 'react-hexgrid';
import React, {Component} from 'react';
import {createCorners, assignTokens, renderPorts, addRoad} from 'APP/gameutils/setup.js'
import SubmitForm from './SubmitForm'

//
// export default class Board extends React.Component {
//   constructor(props) {
//     super(props);
//     let grid = HexGrid.generate(config.board);
//     this.props.actions.createBoard(grid);
//   }
//
//   render() {
//     let { grid, actions } = this.props;
//     let config = {
//       width: 800, height: 800,
//       layout: { width: 10, height: 10, flat: true, spacing: 1.1 },
//       origin: { x: 0, y: 0 },
//       map: 'hexagon',
//       mapProps: [ 2 ]
//     }
//     return (
//       <HexGrid actions={actions} width={config.width} height={config.height}
//         hexagons={grid.hexagons} layout={grid.layout} />
//     )
//   }
// }



export default class Board extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    let boardConfig = {
      width: 700, height: 820,
      layout: { width: 10, height: 10, flat: true, spacing: 1.1 },
      origin: { x: 0, y: 0 },
      map: 'hexagon',
      mapProps: [ 2 ],
      actions: {
        onMouseEnter: function(id){
          var hex = document.getElementById('h' + id)
          hex.firstElementChild.setAttribute('class','hexhover')
        },
        onMouseLeave: function(id){
          var hex = document.getElementById('h' + id)
          hex.firstElementChild.removeAttribute('class','hexhover')
        },
        onClick: function(e){
          console.log('HEX CLICKED')
        }
      }
    }
    let grid = HexGrid.generate(boardConfig);
    this.state = {
      grid,
      config: boardConfig,
      roads: [],
      value: ''
     };

  }
  componentDidMount(){
    createCorners();
    assignTokens();
    renderPorts();
    //renderRoads(); // this will take the roads ont he state and render them on page load?
  }
  render() {
    let { grid, config } = this.state;

    return (
      <div className="board">
        <HexGrid actions={config.actions} width={config.width} height={config.height} hexagons={grid.hexagons} layout={grid.layout} />
        <SubmitForm handleSubmit={this.handleSubmit}/>
    </div>
    );
  }

  handleChange(event) {
     this.setState({value: event.target.value});
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
    var nodes = document.getElementsByTagName('circle')
    var a = nodes[19], b = nodes[20]

    // user = color from form
    addRoad(a, b, user) // can you set state from within addroad?
    // pushes new road to state
    // var newRoad = {x1, x2, y1, y2}
    // this.setState(roads: roads.push(newRoad))
  }
}

// will have <CircleGrid />
