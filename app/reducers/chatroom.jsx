import * as firebase from 'firebase'
import store from '../store'
/* -----------------    ACTIONS     ------------------ */

const LOAD_MESSAGES = 'LOAD_MESSAGES'

/* ------------   ACTION CREATORS     ------------------ */

export const load = messages => ({ type: LOAD_MESSAGES, messages })

/* ------------       REDUCER     ------------------ */

export default function reducer (messages = {}, action) {
  switch (action.type) {

    case LOAD_MESSAGES:
      return action.messages

    default:
      return messages;
  }
}


/* ------------       DISPATCHERS     ------------------ */

//TODO: change all action creators to accept game ID, for now using getStore

export const listenForMessages = () => dispatch => {
  const rootRef = firebase.database().ref()
  const messagesRef = rootRef.child('games').child(store.getState().gameID).child('messages')
  messagesRef.limitToLast(24).on('value', snap => {
    dispatch(load(snap.val()))
	});
}

export const addMessage = message => dispatch => {
  const rootRef = firebase.database().ref()
  const messagesRef = rootRef.child('games').child(store.getState().gameID).child('messages')
  messagesRef.push(message)
}
