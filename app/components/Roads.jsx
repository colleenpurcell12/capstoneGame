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
   return (
     <svg id='Roads' className="roads" width={this.props.width} height={this.props.height} viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
       {
         roads.map(function(road, index){
           return (
             <line key={index} x1={road.coord[0].x1} y1={road.coord[0].y1} x2={road.coord[1].x2} y2={road.coord[1].y2}
               className={road.color}
             />
           )
         })
       }
     </svg>
   );
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
