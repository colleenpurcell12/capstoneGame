import React from 'react'

class Roads extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
<<<<<<< Updated upstream
=======
      // roads = [] // array [{x1, y1, x2, y2, color}]
>>>>>>> Stashed changes
   };
 }
 componentDidMount(){

 }
<<<<<<< Updated upstream

 render() {
   let roads = this.props.roads
=======
 render() {
   let roads = this.props.roads
   console.log('ROADS.x1', roads[0].x1)
>>>>>>> Stashed changes
   return (
     <svg id='Roads' className="roads" width={this.props.width} height={this.props.height} viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
       {
         roads.map(function(road, index){
           return (
<<<<<<< Updated upstream
             <line key={index} x1={road.coord[0].x1} y1={road.coord[0].y1} x2={road.coord[1].x2} y2={road.coord[1].y2}
=======
             <line key={index} x1={road.x1} y1={road.y1} x2={road.x2} y2={road.y2}
>>>>>>> Stashed changes
               className={road.color}
             />
           )
         })
       }
     </svg>
   );
 }
<<<<<<< Updated upstream
  addRoad(e){
  }
}

=======

  addRoad(e){

  }
}


>>>>>>> Stashed changes
Roads.defaultProps = {
 width: 800,
 height: 600
}

<<<<<<< Updated upstream

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
=======
export default Roads;
>>>>>>> Stashed changes
