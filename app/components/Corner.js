import React from 'react';

class CornerShape extends React.Component {
  constructor(props) {
    super(props);
    this.selectCorner = this.selectCorner.bind(this)
  }

  selectCorner(event) {
    event.preventDefault();
    var id = this.props.index
    var dupe = false;
    //if the corner is one of the first or second

    if (this.props.selections.length){
      this.props.selections.forEach(function(sel){
        if(sel.id === id){
          this.props.removeBoardSelection(id)
          dupe = true;
        }
      }, this)
    }
   //selections is not full & not just removed
   if(this.props.selections.length < 2 && !dupe){
      var cornerObj = this.props.corners[id]
      this.props.addBoardSelection(cornerObj)
    }
  }

  render() {
    let index = this.props.index
    let cornerId = this.props.type[0]+index
    let owner = null, structure = null, selected = null;
    let isOwned = this.props.structure.find(function(structure){
      return structure.corner_id === index
    })
    if(isOwned){
      owner = isOwned.owner;
      structure = isOwned.type[0];
    }
    let isSelected = this.props.selections.find(function(select){
      return select.id === index
    })
    if(isSelected){ selected = 'corner-select';}

    // this.props.type -> port or corner
    // this.props.resource -> port only resource
    // selected -> ring (glow?)
    // owner -> color
    // structure -> 'city' or 'settlement'
    let classN = [this.props.type, this.props.resource, owner, selected].join(' ')
    return (
      <g className="shape-group"  onClick={ e => this.selectCorner(e) }
        id= {cornerId} >
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
import {addBoardSelection, removeBoardSelection} from '../reducers/selection.js'

const mapStateToProps = ({ structure, selections }) => ({
  structure, selections
});

const mapDispatchToProps = dispatch => ({
  addBoardSelection: selection => dispatch(addBoardSelection(selection)),
  removeBoardSelection: id => dispatch(removeBoardSelection(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CornerShape);
