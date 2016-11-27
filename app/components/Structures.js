import React, { Component } from 'react';
import * as firebase from 'firebase'
import {Link} from 'react-router';

export class Structures extends Component {
	constructor(props) {
    super(props);
    this.state = {
      //wool: 0
    };
  }
  componentDidMount() {

  }
  render() {
    return (
		<button type='submit' onClick={() => this.registerSettlement}> Add Settlement </button>
		<button type='submit' onClick={() => this.registerRoad}> Add Road </button>
    	)
	}
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';
import { endTurn } from '../reducers/playerStat'; 
//bring in other results from reducers as necessary**

const mapState = ({ whoseTurn }) => ({whoseTurn});
const mapDispatch = { endTurn };

export default connect(
  null,
  null
)(Structures)
