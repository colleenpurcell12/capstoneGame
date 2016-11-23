 import React from 'react'
import CornerShape from './Corner'
import { corners } from '../../gameutils/setup.js'

class CornerGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){

  }
  render() {
    let corners = this.props.corners
    let keys = Object.keys(corners)
    let cornersArray = keys.map(key => (corners[key]))

    return (
      <svg id='CornerGrid' className="grid" width={this.props.width} height={this.props.height} viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {
          cornersArray.map( corner => {
            return (
              <CornerShape key={corner.id}
                selectCorner={this.props.selectCorner}
                id={corner.id}
                cx={corner.x}
                cy={corner.y}
                r={2}
                type="corner"/>
            );
          })
        }
      </svg>
    );
  }

}


CornerGrid.defaultProps = {
  width: 800,
  height: 600
}

export default CornerGrid;
