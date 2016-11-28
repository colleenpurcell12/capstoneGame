import React from 'react'
import CornerShape from './Corner'
import { corners } from '../../gameutils/setup.js'

class CornerGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //dummy data for Testing w/b this.props...
      everyStructure: [{ type: 'road', owner: 'green'}, {type: 'settlement', owner: 'green', corner: 12 }]
    }
  }
  componentDidMount(){

  }
  render() {
    // get corners object from board generate
    let corners = this.props.corners

    //turn corners object into an array
    let keys = Object.keys(corners)
    let cornersArray = keys.map(key => (corners[key]))

    // pull settlements from allStructures array on state
    let settlements = this.state.everyStructure.filter(function(struc){
      return struc.type === 'settlement' // || struc.type === 'city';
    })
    console.log(' cg this.props', this.props)
    return (
      <svg id='CornerGrid' className="grid" width={this.props.width} height={this.props.height} viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {
          cornersArray.map( corner => {
            // check settlements Array by corner (id) for match
            let owner = null, structure = null;
            let isOwned = settlements.find(function(settlement){
              return settlement.corner === corner.id
            })
            if(isOwned){
              owner = isOwned.owner;
              structure = isOwned.type[0];
            }

            return (
              <CornerShape key={corner.id}
                selectCorner={this.props.selectCorner}
                sel={this.props.selected}
                index={corner.id}
                cx={corner.x}
                cy={corner.y}
                r={2}
                type="corner"
                owner={owner}
                structure={structure}
              />
            );
          })
        }
      </svg>
    );
  }

  addSettlement(e){
    //Structures.js?
  }
}


CornerGrid.defaultProps = {
  width: 800,
  height: 600
}

export default CornerGrid;
