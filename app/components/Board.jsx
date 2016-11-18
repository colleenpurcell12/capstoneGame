import { HexGrid } from 'react-hexgrid';
import React, {Component} from 'react';
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
        onMouseEnter: function(){
          console.log('MOUSE ENTERED')
        },
        onMouseLeave: function(){
          console.log('MOUSE LEFT')
        }
      }
    }
    let grid = HexGrid.generate(boardConfig);
    this.state = { grid, config: boardConfig };

  }
  componentDidMount(){
    console.log("this.props", this.props)
    var coords = [], columns = 12
    var x = -43;
    var ppc = [3,4,4,5,5,6,6,5,5,4,4,3]
    for (var i = 0; i < columns; i ++){
      var y = (ppc[i]-1)* 9.35;
      for(var j = 0; j < ppc[i]; j ++){
        coords.push({x,y})
        y -= 18.82;
      }
      // increment x
      if (i%2){  x += 10.75; }
      else { x += 5.375; }
    }
    console.log(coords)
    var svg = document.getElementsByTagName('svg')[0]; //Get svg element
    console.log('SVG', svg)
    var clicked = function(){
      console.log('clicked')
    }
      coords.forEach(function(circle, index){
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
        newElement.setAttribute("cx", circle.x); //Set path's data
        newElement.setAttribute("cy", circle.y); //Set path's data
        newElement.setAttribute("r", "2"); //Set path's data
        newElement.setAttribute('id', "c" +index)
        // newElement.setAttribute('onclick', 'clicked');
        newElement.addEventListener('click', clicked)
        newElement.style.fill = "#ccbdbd"; //Set stroke colour
        // newElement.style.strokeWidth = "5px"; //Set stroke width
        svg.appendChild(newElement);
      })

  }
  render() {
    let { grid, config } = this.state;

    return (
      <div className="board">
        <HexGrid actions={config.actions} width={config.width} height={config.height} hexagons={grid.hexagons} layout={grid.layout} />

      </div>
    );
  }
}

// will have <CircleGrid />
