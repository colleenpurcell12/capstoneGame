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
    this.saveMessage = this.saveMessage.bind(this);
  }
  componentDidMount() { // loads the database message
    //console.log("XXX**** HELLO")
    const rootRef = this.props.database.ref()
    const messagesRef = rootRef.child('messages')
    //console.log('Chatroom.componentDidMount messagesRef=', messagesRef)
    messagesRef.limitToLast(24).on('value', snap => {
      //console.log('messagesRef.on value, snap=', snap)
      this.setState ({ messages : snap.val() })
      //console.log("XXX**** snap.val() ",snap.val() )
      //console.log("XXX**** state",this.state) 
    })
  }

  saveMessage(e) {
    e.preventDefault();
    //console.log("in saveMessage");
    const messagesRef = this.props.database.ref().child('messages')
    messagesRef.push({
      name: "anonymous", //this will be current user's displayname
      text: e.target.text.value
    })
    e.target.text.value = null;
  }

  render() {
    const messages = this.state && this.state.messages || []

    return (
     

      <div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">

      <div id="messages-card" className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop">
        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                <div id="messages">
                 <div>
                    <div>test div</div>
                    {Object.keys(messages).map(k => messages[k]).map( (message, idx) => 
                        <div key = {idx}>{message.name}: {message.text}</div>
                      )}
                  </div>
                  <span id="message-filler"></span>
                
                </div>
          <form id="message-form" action="#" onSubmit={this.saveMessage}>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="message" name="text"/>
                    <label className="mdl-textfield__label" htmlFor="message">Message...</label>
                    
                  </div>
            <button id="submit" type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
              Send
            </button>
          </form>
        </div>
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





