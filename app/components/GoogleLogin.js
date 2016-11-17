import React, { Component } from 'react';

export class GoogleLogin extends Component {
 

  render() {
  	return (
	  <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
	      <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
	        <h3><i className="material-icons">chat_bubble_outline</i> This is Capstone Game</h3>
	      </div>
	      <div id="user-container">
	        <div hidden id="user-pic"></div>
	        <div hidden id="user-name"></div>
	        <button hidden id="sign-out" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
	          Sign-out
	        </button>
	        <button hidden id="sign-in" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
	          <i className="material-icons">account_circle</i>Sign-in with Google
	        </button>
	      </div>
	    </div>
    )}
}

// import {login} from 'APP/app/reducers/auth'
// import {connect} from 'react-redux'

// export default connect (
//   state => ({}),
//   {login},
// ) (Login)






	