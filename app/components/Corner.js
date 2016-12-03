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
    var id = this.props.index, dupe = false;

    //check the corner already in selections, remove
    if (this.props.selections.length){
      this.props.selections.forEach(function(sel){
        if(sel.id === id){
          addAction(removeSelection(id))
          dupe = true;
        }
      }, this)
    }

   //add to selections if not full & not just removed
   if(this.props.selections.length < 2 && !dupe){
      var cornerObj = this.props.corners[id]
      addAction(addSelection(cornerObj))
    }
  }

  render() {
    let index = this.props.index
    let cornerId = this.props.type[0]+index
    let owner = '', selected = '';
    let text = this.props.text

    // Check if corner has a structure
    let isSettled = this.props.structure.find(function(structure){
      return structure.corner_id === index
    })
    if(isSettled && this.props.type === 'corner'){
      // sets css class for owner and circle text as structure type
      owner = isSettled.owner + '-player'
      text = isSettled.type[0];
    }

    // checks if corner is 'selected' and a 'corner', adds selected class
    let isSelected = this.props.selections.find(function(select){
      return select.id === index
    })
    if (isSelected && this.props.type === 'corner'){
      selected = 'corner-select';
    }
    let offset = 0

    // this.props.type -> port or corner
    // this.props.resource -> port only resource

    let classN = [this.props.type, this.props.resource, owner, selected].join(' ')

    return (
      <g className="shape-group"  onClick={ e => this.selectCorner(e) }
        id= {cornerId} >
        <circle className={classN} cx={this.props.cx} cy={this.props.cy}
          r={this.props.r}  id= {cornerId}/>
        <text x={this.props.cx + offset} y={this.props.cy+1} className="port-text" textAnchor="middle" >
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

export default connect(
  mapStateToProps
)(CornerShape);
