import React from 'react'
const { number, object, bool, string, array } = React.PropTypes
import HexShape from './HexShape'
import Path from './Path'
import Layout from './Layout'
import GridGenerator from './GridGenerator'
import CornerShape from 'APP/app/components/Corner'
import { corners, ports } from '../../setup.js'

class HexGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: {start: null, end: null}
    };
  }

  render() {
    // should be on state or imported config file rather than kept on board
    let corners = this.props.corners

    // turn corners object into an array
    let keys = Object.keys(corners)
    let cornersArray = keys.map(key => (corners[key]))

    return (
      <svg id="HexGrid" className="grid" width={this.props.width} height={this.props.height}
        viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet">
        {
          this.props.hexagons.map((hex, index) => {
            return (
              <HexShape key={index}
                hex={hex}
                layout={this.props.layout}
                actions={this.props.actions}
                index={index} />
            );
          })
        }
        {
          cornersArray.map( corner => {
            return (
              <CornerShape key={`c${corner.id}`}
                index={corner.id}
                cx={corner.x}
                cy={corner.y}
                r={2}
                type="corner"
                corners={cornersArray}
              />
            );
          })
        }
        {
          ports.map((port, index) => {
            return (
              <CornerShape type="port"
                key={`p${index}`}
                index={index}
                cx={port.x}
                cy={port.y}
                r={3}
                text={port.ratio}
                resource={port.res}/>
            );
          })
        }
      </svg>
    );
  }
}

HexGrid.propTypes = {
  actions: object.isRequired,
  layout: object.isRequired,
  hexagons: array.isRequired
};

HexGrid.defaultProps = {
  width: 800,
  height: 600
}


/* -----------------    CONTAINER     ------------------ */

import { connect } from 'react-redux';

const mapStateToProps = ({ hexData }) => ({
  hexData
});

const mapDispatchToProps = dispatch => ({
  // selectToken to move robber
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HexGrid);
