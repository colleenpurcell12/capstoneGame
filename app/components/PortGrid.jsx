import React from 'react'
import CornerShape from './Corner'
import { ports } from '../../gameutils/setup.js'

class PortGrid extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
   };
 }

 render() {
   return (
     <svg id='PortGrid' className="grid" width={this.props.width} height={this.props.height} viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
       {
         ports.map((port, index) => {
           return (
             <CornerShape type="port" key={index} selectPort={this.props.selectPort} index={index} cx={port.x} cy={port.y} r={3} text={port.ratio}/>
           );
         })
       }
     </svg>
   );
 }

}


PortGrid.defaultProps = {
 width: 800,
 height: 600
}

export default PortGrid;
