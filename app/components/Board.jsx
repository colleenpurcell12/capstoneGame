import HexGrid from '../../gameutils/react-hexgrid/src/HexGrid.js';
import React, {Component} from 'react';
import {generate} from 'APP/gameutils/setup.js'
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
import {neighborDirections} from 'APP/gameutils/setup'
import {boardConfig} from 'APP/gameutils/boardConfig'

class Board extends Component {
  constructor(props) {
    super(props);

    let grid = generate(boardConfig);
    let corners = grid.corners

    this.state = {
      grid,
      config: boardConfig,
      roads: [],
      value: '',
      selected: {firstCorner: null, secondCorner: null},
      tokens: [],
      resources: [],
      settlements: [],
      corners
     };
   }

  componentWillMount(){
   //puts all the corners on the state
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

const mapStateToProps = ({ turnInfo, hexData }) => ({turnInfo, hexData});

const mapDispatch = { putCorners };

export default connect(
  mapStateToProps,
  mapDispatch
)(Board)
