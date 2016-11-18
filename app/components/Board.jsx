import { HexGrid } from 'react-hexgrid';
import React, {Component} from 'react';
import {createCorners, assignTokens} from 'APP/gameutils/setup.js'
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
    let boardConfig = {
      width: 800, height: 800,
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
     };

  }
  componentDidMount(){
    createCorners();
    assignTokens();
  }
  render() {
    let { grid, config } = this.state;

    return (
      <div className="board">

        <HexGrid actions={config.actions} width={config.width} height={config.height} hexagons={grid.hexagons} layout={grid.layout} />

      </div>
    );
  }

  drawRoad(){
    // this is called on 'draw road' button
    // state is 'set' on 'end turn' button
    // has validation
      // do they have resources
      // decrement resources on placement
      // confirm decrement resources on end turn // end turn just keeps you from interacting with board (trades only)
    // DRAW ROAD
      // get coords from this.state.pointA and this.state.pointB
      // get svg tag
      // newRoad = document.createElementNS("http://www.w3.org/2000/svg", line);
      // newRoad.setAttribute....
      // get color from user info on cookie/local/state?
      // <line x1={this.state.pointA.x} y1={this.state.pointA.y} x2={this.state.pointB.x} y2={this.state.pointB.y}/>
      // svg.appendChild(newRoad)
    // SEND ROAD INFO TO DB/STORE
  }
}

// will have <CircleGrid />
