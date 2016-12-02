import React from 'react';
import GoogleLogin from './GoogleLogin';
import PlayerStat from './PlayerStat';
import Dice from './Dice';
import Chatroom from './Chatroom';
import Board from './Board';
import Players from './Players';

import {Grid, Row, Col} from 'react-bootstrap';

export class Home extends React.Component {
  render(){
    return (
      <div>
        <GoogleLogin />
        {this.props.loggedInUser ?
          <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--3-col">
                <Chatroom />
              </div>
              {this.props.doneLoading?
              <div className="mdl-cell mdl-cell--6-col">
                <Board />
              </div>
              :
              <div className="mdl-cell mdl-cell--6-col">
                <h3>Setting up the board...</h3>
              </div>
              }
              <div className="mdl-cell mdl-cell--3-col">
                <div >
                <Players /> <br/>
                {this.props.isSettingUp?
                  <div></div>
                :
                  <Dice />
                }
                <br/>
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

const mapStateToProps = ({ loggedInUser, doneLoading, isSettingUp }) => ({ loggedInUser, doneLoading, isSettingUp })

export default connect(mapStateToProps, null)(Home);

export { Home  as PureHome }; //this is for testing, do not remove unless updating test suite
