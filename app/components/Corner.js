import React from 'react';
import {addSelection, removeSelection} from '../reducers/selection.js'
import {addAction} from '../reducers/action-creators'


class CornerShape extends React.Component {
  constructor(props) {
    super(props);
    this.selectCorner = this.selectCorner.bind(this)
    this.portEnter = this.portEnter.bind(this)
    this.portLeave = this.portLeave.bind(this)
    this.getDisplay = this.getDisplay.bind(this)
    this.state = {
      displayInfo: 'none'
    }
  }

  selectCorner(event) {
    event.preventDefault();
    if(this.props.type === 'corner'){
      var id = this.props.index, dupe = false
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
  }
  portEnter(event){
    event.preventDefault();
    if(this.props.type === 'port'){
      this.setState({displayInfo: ''})
    }
  }
  portLeave(event){
    event.preventDefault();
    if(this.props.type === 'port'){
      this.setState({displayInfo: 'none'})
    }
  }
  getDisplay(){
    if (this.props.type === 'port'){
      return this.state.displayInfo
    } else {
      return 'none'
    }
  }
  render() {
    let index = this.props.index
    let cornerId = this.props.type[0]+index
    let owner = '', selected = '';
    let text = this.props.text
    let resource = this.props.resource

    // Check if corner has a structure
    let isSettled = this.props.structure.find(function(structure){
      return structure.corner_id === index
    })
    if(isSettled && this.props.type === 'corner'){
      // sets css class for owner and circle text as structure type
      owner = isSettled.owner + '-player'
      text = isSettled.type[0];
    } else if (this.props.type === 'port'){
      text = text + ":1"
    }

    // checks if corner is 'selected' and a 'corner', adds selected class
    let isSelected = this.props.selections.find(function(select){
      return select.id === index
    })
    if (isSelected && this.props.type === 'corner'){
      selected = 'corner-select';
    }
    let offset = 0
    let number = 2
    var info_1, info_2;
    if(this.props.type === 'port'){
      if (resource){
        info_1 = "Trade " + number + " " + resource ;
      } else {
        info_1 = "Trade any 3"
      }
      info_2 = "for 1 of any";
    }
    // this.props.type -> port or corner
    // this.props.resource -> port only resource

    let classN = [this.props.type, resource, owner, selected].join(' ')
    return (
      <g className="shape-group"  onClick={ e => this.selectCorner(e)}
        onMouseEnter={e => this.portEnter(e)}
        onMouseLeave={e => this.portLeave(e)}
        id= {cornerId} >
        <circle className={classN} cx={this.props.cx} cy={this.props.cy}
          r={this.props.r}  id= {cornerId}/>
        <text x={this.props.cx + offset} y={this.props.cy+1} className="port-text" textAnchor="middle" >
          {text}
        </text>
        <rect x={this.props.cx + this.props.xOffset -5} y={this.props.cy +this.props.yOffset} className="tooltip" display={this.getDisplay()} width="10" height="5" rx="1" ry="1" fillOpacity="0.5"/>
        <text x={this.props.cx + this.props.xOffset} y={this.props.cy + this.props.yOffset} className="tooltip port-hover-text" display={this.getDisplay()}  textAnchor="middle" >
          <tspan x={this.props.cx + this.props.xOffset} dy="1.2em">{info_1}</tspan>
          <tspan x={this.props.cx + this.props.xOffset} dy="1.2em">{info_2}</tspan>
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
