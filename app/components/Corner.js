 import React from 'react';


class CornerShape extends React.Component {
  constructor(props) {
    super(props);
  }

  selectCorner(e){
    e.preventDefault
  }

  render() {
    // let actions = this.props.actions;
    // type -> port or corner
    // resource -> port resource
    // selected -> ring
    // owner -> color
    // strucure -> 'city' or 'settlement'

    let cornerId = this.props.type[0]+this.props.index
    let owner = null, structure = null, selected = null;
    let isOwned = this.props.settlements.find(function(settlement){
      return settlement.corner === this.props.index
    })
    if(isOwned){
      owner = isOwned.owner;
      structure = isOwned.type[0];
    }

    let isSelected = this.props.selected.find(function(select){
      return select.id === this.props.index
    })
    if(isSelected){ selected = 'corner-select';}

    let classN = [this.props.type, this.props.resource, owner, selected].join(' ')
    return (
      <g className="shape-group"  onClick={ e => this.props.selectCorner(e) }
        id= {cornerId}
        >
        <img src=""/>
        <circle className={classN} cx={this.props.cx} cy={this.props.cy}
          r={this.props.r}  id= {cornerId}/>
        <text x={this.props.cx} y={this.props.cy+.3} textAnchor="middle" >
          {structure}
        </text>
      </g>
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

import { connect } from 'react-redux';

const mapStateToProps = ({ structure, selected }) => ({
  structure, selected
});

const mapDispatchToProps = dispatch => ({
 //setSelected
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CornerShape);
