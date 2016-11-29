import React from 'react'
import CornerShape from './Corner'
import { corners } from '../../gameutils/setup.js'

class CornerGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
<<<<<<< Updated upstream
    }
=======
      settlements : ['c', 's', 's']
       // array [{id: type}] or [type, type...] at index
    };
>>>>>>> Stashed changes
  }
  componentDidMount(){

  }
  render() {
    // should be on state or imported config file rather than kept on board
    let corners = this.props.corners

    // turn corners object into an array
    let keys = Object.keys(corners)
    let cornersArray = keys.map(key => (corners[key]))

<<<<<<< Updated upstream
    console.log(' cg this.props', this.props)
=======
>>>>>>> Stashed changes
    return (
      <svg id='CornerGrid' className="grid" width={this.props.width} height={this.props.height} viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {
          cornersArray.map( corner => {
            return (
              <CornerShape key={corner.id}
<<<<<<< Updated upstream
                sel={this.props.selected}
=======
                selectCorner={this.props.selectCorner}
>>>>>>> Stashed changes
                index={corner.id}
                cx={corner.x}
                cy={corner.y}
                r={2}
                type="corner"
<<<<<<< Updated upstream
                corners={cornersArray}
=======
                text={this.state.settlements[corner.id] }
>>>>>>> Stashed changes
              />
            );
          })
        }
      </svg>
    );
  }
<<<<<<< Updated upstream
=======

  addSettlement(e){

  }
>>>>>>> Stashed changes
}


CornerGrid.defaultProps = {
  width: 800,
  height: 600
}

export default CornerGrid;
