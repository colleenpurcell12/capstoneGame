 import React from 'react';


class CornerShape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // ***** can we use this translate function?
  // translate() {
  //   let hex = this.props.hex;
  //   let pixel = HexUtils.hexToPixel(hex, this.props.layout);
  //   return `translate(${pixel.x}, ${pixel.y})`;
  // }

  // getStyles(hex) {
  //   return (hex.props == {} || typeof(hex.props.image) === "undefined") ? {} : { fill: 'url(#'+ HexUtils.getID(hex) +')' };
  // }

  // click handler function/actions/dispatchers can be set right here once we get state

  render() {
    let hex = this.props.hex;
    let actions = this.props.actions;
    // let styles = this.getStyles(hex);
    //this.props.type + this.props.index??
    let cornerId = this.props.type[0]+this.props.id
    // onClick={e => actions.onClick(id, e)}
    let classN = "corner-node" + " " + this.props.type
    return (
      <g className="shape-group" draggable="true"
        onDragStart={e => actions.onDragStart(this.props.hex, e)}
        onDragEnd={e => actions.onDragEnd(this.props.hex, e)}
        onDragOver={e => actions.onDragOver(this.props.hex, e)}
        onDrop={e => actions.onDrop(this.props.hex, e)}
        onClick={e => this.props.selectCorner(e) }
        id= {cornerId}
        >
        <circle className={classN} cx={this.props.cx} cy={this.props.cy} r={this.props.r}/>
        <text x={this.props.cx} y={this.props.cy+.3} textAnchor="middle" >{this.props.text || ''}</text>
      </g>
    );
  }
}

export default CornerShape;

// map state to props
// board.settlements ~ array[{ type, owner}]  // where index = id

 // this.props = {
 //   owner,
 //   type/text
 // }

// map dispatch
// click logic
