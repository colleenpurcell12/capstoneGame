import * as firebase from 'firebase'

/* -----------------    ACTIONS     ------------------ */

const LOAD = 'LOAD_MESSAGES'
const SAVE = 'SAVE_MESSAGE'


/* ------------   ACTION CREATORS     ------------------ */

const load   = messages => ({ type: LOAD, messages })
const save = message   => ({ type: SAVE, message })


/* ------------       REDUCER     ------------------ */

export default function reducer (messages = {}, action) {
  switch (action.type) {
    
    case LOAD: 
      return action.messages

    default: 
      return messages;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchMessages = () => dispatch => {
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
