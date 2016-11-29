import React from 'react'
const { number, object, bool, string, array } = React.PropTypes
import HexShape from './HexShape'
import Path from './Path'
import Layout from './Layout'
import GridGenerator from './GridGenerator'

class HexGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: {start: null, end: null}
    };
  }

  // hexshape text={hext.text}?
  render() {
    return (
      <svg id="HexGrid" className="grid" width={this.props.width} height={this.props.height} viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {
          this.props.hexagons.map((hex, index) => {
            return (
<<<<<<< Updated upstream
              <HexShape key={index} hex={hex} layout={this.props.layout} actions={this.props.actions} index={index} text={this.props.hexData.token} resource={this.props.hexData.resource}/>
=======
              <HexShape key={index} hex={hex} layout={this.props.layout} actions={this.props.actions} index={index} text={hex.token} resource={hex.resource}/>
>>>>>>> Stashed changes
            );
          })
        }
        <Path {...this.state.path} layout={this.props.layout} />
      </svg>
    );
  }
}

HexGrid.propTypes = {
  width: number.isRequired,
  height: number.isRequired,
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

const mapStateToProps = ({ hexData  }) => ({
  hexData
});

const mapDispatchToProps = dispatch => ({
  // selectToken to move robber
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HexGrid);
