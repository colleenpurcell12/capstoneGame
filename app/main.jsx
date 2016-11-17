'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Board from './components/Board'
import GoogleLogin from './components/GoogleLogin'
import Chatroom from './components/Chatroom'
import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyD9H4dWewyn6xf8DMJDjNWnFlypG6hg4zU",
    authDomain: "capstonegame-24bce.firebaseapp.com",
    databaseURL: "https://capstonegame-24bce.firebaseio.com",
    storageBucket: "capstonegame-24bce.appspot.com",
    messagingSenderId: "575027063210"
  };

// Get a reference to the database service
const database = firebase.database();


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="chatroom" />
        <Route path="chatroom"
            component={() => <Chatroom database={database} />}/>
        <Route path="board" component={Board} />
        <Route path="googlelogin" component={GoogleLogin}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)


// var propRef = database.ref(propKey)
// database.

// firebase.database().ref('users/' + userId).set({ prop1: val1,  prop2: val2 })
// set() overwrites data

//set v update:

// listeners:
// var xRef = firebase.database().ref('abc');
// xRef.on('value', (snapshot)=>{ updateStarCount(postElement, snapshot.val());});
