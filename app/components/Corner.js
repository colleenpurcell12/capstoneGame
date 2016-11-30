import React from 'react';
import {addSelection, removeSelection} from '../reducers/selection.js'
import {addAction} from '../reducers/action-creators'


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
          addAction(removeSelection(id))
          dupe = true;
        }
      }, this)
    }
   //selections is not full & not just removed
   if(this.props.selections.length < 2 && !dupe){
      var cornerObj = this.props.corners[id]
      addAction(addSelection(cornerObj))
    }
  }

  render() {
    let index = this.props.index
    let cornerId = this.props.type[0]+index
    let owner = null, selected = null;
    let text = this.props.text
    let isOwned = this.props.structure.find(function(structure){
      return structure.corner_id === index
    })
    if(isOwned){
      owner = isOwned.owner + '-player'
      text = isOwned.type[0];
    }
    let isSelected = this.props.selections.find(function(select){
      return select.id === index
    })
    if(isSelected  && this.props.type === 'corner'){
      selected = 'corner-select';
    }
    let offset = 0
    if (this.props.type === 'port'){
      
    }
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
        <text x={this.props.cx + offset} y={this.props.cy+.5} className="port-text" textAnchor="middle" >
          {text}
        </text>
      </g>
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

import { connect } from 'react-redux';

const mapStateToProps = ({ structure, selections }) => ({
  structure, selections
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CornerShape);
