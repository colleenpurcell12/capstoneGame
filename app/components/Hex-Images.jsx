import React from 'react';
import {resources} from 'APP/gameutils/setup.js'


class HexImage extends React.Component {
  constructor(){

  }

  render(){
    if(this.props.hexData.length === 19){
      let resourceNumber = this.props.hexData[i].resource
      resource = resources[resourceNumber] || 'desert'
    }
    return (
      
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

import { connect } from 'react-redux';

const mapStateToProps = ({ hexData }) => ({
  hexData
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HexShape);
