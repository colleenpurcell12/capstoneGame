import React from 'react'

class Roads extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
   };
 }
 componentDidMount(){

 }

 render() {
   let roads = this.props.roads
   console.log('ROADS', roads)
   return (
     <svg id='Roads' className="grid" width={this.props.width} height={this.props.height}
       viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg"
       preserveAspectRatio="xMinYMin meet"
       >
       {
         roads.map(function(road, index){
           return (
             <line key={index} x1={road.coordinates[0][0]} y1={road.coordinates[0][1]} x2={road.coordinates[1][0]} y2={road.coordinates[1][1]}
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


/* -----------------    CONTAINER     ------------------ */

import { connect } from 'react-redux';

const mapStateToProps = ({ roads  }) => ({
  roads
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roads);
