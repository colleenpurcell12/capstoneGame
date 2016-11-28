import React from 'react'

class Roads extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
      // roads = [] // array [{x1, y1, x2, y2, color}]
   };
 }
 componentDidMount(){

 }
 render() {
   let roads = this.props.roads
   console.log('ROADS.x1', roads[0].x1)
   return (
     <svg id='Roads' className="roads" width={this.props.width} height={this.props.height} viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
       {
         roads.map(function(road, index){
           return (
             <line key={index} x1={road.x1} y1={road.y1} x2={road.x2} y2={road.y2}
               className={road.color}
             />
           )
         })
       }
     </svg>
   );
 }
  addRoad(e){
  }
}

Roads.defaultProps = {
 width: 800,
 height: 600
}

export default Roads;
