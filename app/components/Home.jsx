import React from 'react';
import GoogleLogin from './GoogleLogin';
import JoinGame from './JoinGame'

export class Home extends React.Component {
  render(){
    return (
      <div>
        <GoogleLogin />
          {this.props.loggedInUser ?
          <div>
            <JoinGame />
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
