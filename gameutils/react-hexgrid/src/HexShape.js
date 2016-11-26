import React from 'react';
const { object } = React.PropTypes
import HexPattern from './HexPattern';
import HexPointers from './HexPointers';
import HexUtils from './HexUtils';
import {resources} from 'APP/gameutils/setup.js'

class HexShape extends React.Component {

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

  render() {
    let hex = this.props.hex;
    let text = (hex.token) ? hex.token : "desert";
    let actions = this.props.actions;
    let styles = this.getStyles(hex);
    let resource = resources[hex.resource] || 'desert'
    let points = this.getPoints(hex);
    let id = "h"+this.props.index
        // onMouseEnter={e => actions.onMouseEnter(id, e)}
        // onMouseLeave={e => actions.onMouseLeave(id, e)}
        //        onClick={e => actions.onClick(id, e)}

    return (
      <g className="shape-group" transform={this.translate()} draggable="true"
        onDragStart={e => actions.onDragStart(this.props.hex, e)}
        onDragEnd={e => actions.onDragEnd(this.props.hex, e)}
        onDragOver={e => actions.onDragOver(this.props.hex, e)}
        onDrop={e => actions.onDrop(this.props.hex, e)}
        id= {id} >
        <HexPattern hex={hex} />
        <polygon points={points} style={styles} className={resource} />
        <HexPointers hex={hex} points={points} />
        <circle cx='0' cy='0' r='3' onClick={() => {console.log("In the circle onClick")} }/>
        <text x="0" y="0.3em" textAnchor="middle" >{text}</text>
      </g>
    );
  }
}
HexShape.propTypes = {
  hex: object.isRequired,
  layout: object.isRequired,
  actions: object.isRequired
};

export default HexShape;
