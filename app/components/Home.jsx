import React from 'react';
import GoogleLogin from './GoogleLogin';
import PlayerStat from './PlayerStat';
import Dice from './Dice';
import Chatroom from './Chatroom';
import Board from './Board';
import {Grid, Row, Col} from 'react-bootstrap';
//originally had all firebase db info in here
export class Home extends React.Component {
  render(){
    //eventually we want to move a lot of the non-navbar layout to live here after we're able to pass in auth from the store
    return (
      <div>
        <GoogleLogin />
        {this.props.loggedInUser ?
          <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--2-col">
                <Chatroom />
              </div>
              <div className="mdl-cell mdl-cell--6-col">
                <Board />
              </div>
              <div className="mdl-cell mdl-cell--1-col">
              </div>
              <div className="mdl-cell mdl-cell--3-col">
                <div >
                <Dice /><br /><br />
                <PlayerStat />
                </div>
              </div>
          </div>
          :
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--3-col"></div>
              <div className="mdl-cell mdl-cell--6-col" style={{paddingTop:'25px'}}>
                    <h3>Welcome to Pioneers of Mars</h3>
                    <p>We could embed an overview/instructional video of our version here:</p>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Kw4tIC_cJiE" frameBorder="0" allowFullScreen>
                    </iframe>
               </div>
               <div className="mdl-cell mdl-cell--3-col"></div>
             </div>
        }
      </div>
      )
  }
}


/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux'

const mapState = ({ loggedInUser }) => ({ loggedInUser })

export default connect(mapState, null)(Home);

