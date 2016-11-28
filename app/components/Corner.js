 import React from 'react';


class CornerShape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // click handler function/actions/dispatchers can be set right here once we get state

  render() {
    let hex = this.props.hex;
    let actions = this.props.actions;
    let cornerId = this.props.type[0]+this.props.index
    // type -> port or corner
    // resource -> port resource
    // selected -> ring
    // owner -> color
    // strucure -> city or settlement
    let struc = '' || this.props.structure
    let classN = [this.props.type, this.props.resource, this.props.owner].join(' ')
    return (
      <g className="shape-group" draggable="true"
        onDragStart={e => actions.onDragStart(this.props.hex, e)}
        onDragEnd={e => actions.onDragEnd(this.props.hex, e)}
        onDragOver={e => actions.onDragOver(this.props.hex, e)}
        onDrop={e => actions.onDrop(this.props.hex, e)}
        onClick={e => this.props.selectCorner(e) }
        id= {cornerId}
        >
        <img src=""/>
        <circle className={classN} cx={this.props.cx} cy={this.props.cy}
          r={this.props.r}  id= {cornerId}/>
        <text x={this.props.cx} y={this.props.cy+.3} textAnchor="middle" >
          {struc|| ''}
        </text>
      </g>
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

import { connect } from 'react-redux';

//also selected
const mapStateToProps = ({ everyStructure }) => ({
  everyStructure
});

const mapDispatchToProps = dispatch => ({
 // click logic for select node
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CornerShape);
