import React, { Component } from 'react';
import * as firebase from 'firebase'
// export default class BonesJokes extends Component {
// export const Login = ({ login }) => (


//players moves as action
//redux firebase
//listen for action that's push firebase then dispatch, synced and passed to each store
//redux middleware an function

// const syncTo = Symbol()

// const syncer = ({store, ref}) => {
//   ref.on('child_added', snap => {
//     store.dispatch(snap.val())
//   })

//   return action => Object.assign({}, {[syncTo]: ref}, action)
// }

// const synced = syncer({
//   store,
//   ref: root.child('game').child('actions')
// })


// dispatch(synced(someAction()))

// const middlefire = store => next => action => {
//   if (action[syncTo]) {
//     action[syncTo].push(action)
//   }
// }

export class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  componentDidMount() { // loads the database message
    //console.log("XXX**** HELLO")
    const rootRef = this.props.database.ref()
    const messagesRef = rootRef.child('messages')
    //console.log('Chatroom.componentDidMount messagesRef=', messagesRef)
    messagesRef.on('value', snap => {
      console.log('messagesRef.on value, snap=', snap)
      this.setState ({ messages : snap.val() })
      //console.log("XXX**** snap.val() ",snap.val() )
      //console.log("XXX**** state",this.state) 
    })
  }

  render() {
    const messages = this.state && this.state.messages || []

    return (
     

      <div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">

      <div id="messages-card" className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop">
        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                <div id="messages">
                 <div>
                    {Object.keys(messages).map(k => messages[k]).map( (message, idx) => 
                        <div key = {idx}>{message.from} {message.to}</div>
                      )}
                  </div>
                  <span id="message-filler"></span>
                
                </div>
          <form id="message-form" action="#">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="message"/>
                    <label className="mdl-textfield__label" htmlFor="message">Message...</label>
                    
                  </div>
            <button id="submit" disabled type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
              Send
            </button>
          </form>
          <form id="image-form" action="#">
            <input id="mediaCapture" type="file" accept="image/*,capture=camera">
            </input>
            <button id="submitImage" title="Add an image" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white">
              <i className="material-icons">image</i>
            </button>
          </form>
        </div>
      </div>

      <div id="must-signin-snackbar" className="mdl-js-snackbar mdl-snackbar">
        <div className="mdl-snackbar__text"></div>
        <button className="mdl-snackbar__action" type="button"></button>
      </div>

    </div>

    )
  }
}

import {connect} from 'react-redux'

export default connect (
  state => ({}),
  null,
) (Chatroom)





