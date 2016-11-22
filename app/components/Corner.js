 import React from 'react';


class CornerShape extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   };
  // }

//<circle className={this.props.class}


  // translate() {
  //   let hex = this.props.hex;
  //   let pixel = HexUtils.hexToPixel(hex, this.props.layout);
  //   return `translate(${pixel.x}, ${pixel.y})`;
  // }

  // getStyles(hex) {
  //   return (hex.props == {} || typeof(hex.props.image) === "undefined") ? {} : { fill: 'url(#'+ HexUtils.getID(hex) +')' };
  // }

  render() {
    let hex = this.props.hex;
    let actions = this.props.actions;
    // let styles = this.getStyles(hex);
    let id = "c"+this.props.index

        //        onClick={e => actions.onClick(id, e)}

    return (
      <g className="shape-group" draggable="true"
        onDragStart={e => actions.onDragStart(this.props.hex, e)}
        onDragEnd={e => actions.onDragEnd(this.props.hex, e)}
        onDragOver={e => actions.onDragOver(this.props.hex, e)}
        onDrop={e => actions.onDrop(this.props.hex, e)}
        onClick={e => this.props.selectCorner(e) }
        id= {id}
        >
        <circle className='corner-node' cx={this.props.cx} cy={this.props.cy} r={this.props.r}/>
      </g>
    );
  }
}

export default CornerShape;
