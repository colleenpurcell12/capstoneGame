'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import  {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'

//import Awards from './components/Awards';
//   <Route path="awards" component={() => <Awards database={database}/>} />

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Home from './components/Home';
import {listenToAuth} from './reducers/login';
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
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Home} onEnter={store.dispatch(listenToAuth())} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
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

