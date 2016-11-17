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

const middlefire = store => next => action => {
  if (action[syncTo]) {
    action[syncTo].push(action)
  }
}

export class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  componentDidMount() { // loads the database message
    console.log("XXX**** HELLO")
    const rootRef = this.props.database.ref()
    const messagesRef = rootRef.child('messages')
    console.log('Chatroom.componentDidMount messagesRef=', messagesRef)
    messagesRef.on('value', snap => {
      console.log('messagesRef.on value, snap=', snap)
      this.setState ({ messages : snap.val() })
      console.log("XXX**** snap.val() ",snap.val() )
      console.log("XXX**** state",this.state) 
    })

  }

  render() {

    const messages = this.state && this.state.messages || []

    return (
      <div>
        {Object.keys(messages).map(k => messages[k]).map( (message) => 
            <div>{message.from} {message.to}</div>
          )}
      </div>
    
      
    )
  }
}


import {connect} from 'react-redux'

export default connect (
  state => ({}),
  null,
) (Chatroom)





