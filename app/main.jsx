'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import  {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'

import GoogleLogin from './components/GoogleLogin'
import Chatroom from './components/Chatroom'
import Board from './components/Board'
import PlayerStat from './components/PlayerStat'
import Dice from './components/Dice';

import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyD9H4dWewyn6xf8DMJDjNWnFlypG6hg4zU",
    authDomain: "capstonegame-24bce.firebaseapp.com",
    databaseURL: "https://capstonegame-24bce.firebaseio.com",
    storageBucket: "capstonegame-24bce.appspot.com",
    messagingSenderId: "575027063210"
  };
  
firebase.initializeApp(config);
const database = firebase.database();
const auth = firebase.auth();
      // this.storage = firebase.storage();
      // Initiates Firebase auth and listen to auth state changes.
      // this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

render (

  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" >
        <Route path="chatroom" component={() => <Chatroom database={database} auth={auth}/>} />
        <Route path="board" component={Board} />
        <Route path="googlelogin" component={() => <GoogleLogin auth={auth}/>} />
<<<<<<< HEAD
        <Route path="playerstat" component={() => <PlayerStat database={database}/>}  />
=======
        <Route path="dice" component={Dice} />
>>>>>>> master
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

