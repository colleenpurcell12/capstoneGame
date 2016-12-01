import * as firebase from 'firebase'

let initialState = [{ id: 0,  color: 'red' }, { id: 1,  color: 'blue' }, 
                    { id: 2,  color: 'green' }, { id: 3,  color: 'brown' }]

export default function userArray (userArray = initialState, action){
    switch (action.type) {
    default:
      return userArray
  }
}
