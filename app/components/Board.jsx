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
      mapProps: [ 2 ]
    }
    let grid = HexGrid.generate(boardConfig);
    this.state = { grid, config: boardConfig };
  }
  render() {
    let { grid, config } = this.state;

    return (
      <div className="board">
        <HexGrid width={config.width} height={config.height} hexagons={grid.hexagons} layout={grid.layout} />
      </div>
    );
  }
}
