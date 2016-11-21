 import React from 'react'
import CornerShape from './Corner'
import { corners } from '../../gameutils/setup.js'

class CornerGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <svg id='CornerGrid' className="grid" width={this.props.width} height={this.props.height} viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {
          corners.map((corner, index) => {
            return (
              <CornerShape key={index} selectCorner={this.props.selectCorner} index={index} cx={corner.x} cy={corner.y} r={corner.r} 

              />
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
