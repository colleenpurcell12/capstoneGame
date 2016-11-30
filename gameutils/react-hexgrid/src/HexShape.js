import React from 'react';
const { object } = React.PropTypes
import HexPattern from './HexPattern';
import HexPointers from './HexPointers';
import HexUtils from './HexUtils';
import {resources} from 'APP/gameutils/setup.js'
import { addAction } from 'APP/app/reducers/action-creators'
import { moveRobber } from 'APP/app/reducers/robber'

class HexShape extends React.Component {
  constructor(props) {
    super(props);
    this.toggleRobber = this.toggleRobber.bind(this)
  }

  getPoints(hex) {
    let points = this.props.layout.getPolygonPoints(hex)

    return points.map(point => {
      return point.x + ',' + point.y;
    }).join(' ');
  }

  translate() {
    let hex = this.props.hex;
    let pixel = HexUtils.hexToPixel(hex, this.props.layout);
    return `translate(${pixel.x}, ${pixel.y})`;
  }

  getStyles(hex) {
    return (hex.props == {} || typeof(hex.props.image) === "undefined") ? {} : { fill: 'url(#'+ HexUtils.getID(hex) +')' };
  }

  toggleRobber(e) {
    e.preventDefault()
    console.log("clicked....")
    addAction(moveRobber(this.props.index))
    alert("clicked")
  }

  render() {
    let text = '', resource = ''
    let i = this.props.index
    if(this.props.hexData.length === 19){
      text = this.props.hexData[i].token || "desert"
      let resourceNumber = this.props.hexData[i].resource
      resource = resources[resourceNumber] || 'desert'
    }
    let hex = this.props.hex;

    // console.log('hexData at i', this.props.hexData[i])
    let actions = this.props.actions;
    let styles = this.getStyles(hex);
    let points = this.getPoints(hex);
    let id = "h"+this.props.index
        // onMouseEnter={e => actions.onMouseEnter(id, e)}
        // onMouseLeave={e => actions.onMouseLeave(id, e)}
        //        onClick={e => actions.onClick(id, e)}

    return (

      <g className="shape-group" transform={this.translate()} draggable="true"
        id= {id} onClick={e => this.toggleRobber(e)}>
        <HexPattern hex={hex} />
        <polygon points={points} style={styles} className={resource} />
        <image x='-8' y='-8' height="16" width="16" xlinkHref={`/images/${resource}.svg`}/>
        <HexPointers hex={hex} points={points} />
        <circle cx='0' cy='0' r='3' onClick={e => this.toggleRobber(e)}/>
        {this.props.robberHex === this.props.index?
        <image x="-3" y="-3" width="6" height="6" xlinkHref="/alien.svg" />
        :
        <text x="0" y="0.3em" textAnchor="middle" onClick={e => this.toggleRobber(e)}>{text}</text>
        }
      </g>
    );
  }
}
HexShape.propTypes = {
  hex: object.isRequired,
  layout: object.isRequired,
  actions: object.isRequired
};

/* -----------------    CONTAINER     ------------------ */

import { connect } from 'react-redux';

const mapStateToProps = ({ hexData, robberHex }) => ({
  hexData, robberHex
});

const mapDispatchToProps = dispatch => ({
  // selectToken to move robber
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HexShape);
