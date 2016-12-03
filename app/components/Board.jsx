import HexGrid from '../../gameutils/react-hexgrid/src/HexGrid.js';
import React, {Component} from 'react';
import {generate} from 'APP/gameutils/setup.js'
import Roads from './Roads'
import store from '../store'
import {addAction} from '../reducers/action-creators'
import {boardConfig} from 'APP/gameutils/boardConfig'

class Board extends Component {
  constructor(props) {
    super(props);

    // generate the board
    let grid = generate(boardConfig);
    let corners = grid.corners

    this.state = {
      grid,
      config: boardConfig,
      corners
     };
   }

  componentWillMount(){
    // adds corners to the store
    this.props.putCorners(this.state.corners)
  }

  render() {
    let { grid, config } = this.state;

    return (
      <div>
        <div className="board" >
          <Roads width={config.width} height={config.height}/>
          <HexGrid actions={config.actions} width={config.width} height={config.height} hexagons={grid.hexagons} layout={grid.layout}  />
        </div>
    </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { putCorners } from '../reducers/corner';

const mapStateToProps = ({}) => ({});

const mapDispatch = { putCorners };

export default connect(
  mapStateToProps,
  mapDispatch
)(Board)

export { Board as PureBoard}; //this is for testing, do not remove unless updating test suite
