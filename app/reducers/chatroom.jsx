import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const LOAD_MESSAGES = 'LOAD_MESSAGES'

/* ------------   ACTION CREATORS     ------------------ */

const load   = messages => ({ type: LOAD, messages })

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

export const listenForMessages = () => dispatch => {
  const rootRef = firebase.database().ref()
  const messagesRef = rootRef.child('messages')
  messagesRef.limitToLast(24).on('value', snap => {
    dispatch(load(snap.val()))
	});
}

export const addMessage = message => dispatch => {
  const rootRef = firebase.database().ref()
  const messagesRef = rootRef.child('messages')
  messagesRef.push(message)
}
