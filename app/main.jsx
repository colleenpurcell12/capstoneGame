'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import  {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Home from './components/Home';
import GameRoom from './components/GameRoom'
import {listenToAuth} from './reducers/login';
import {loadActions} from './reducers/action-creators'
import {join} from './reducers/game'
import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyD9H4dWewyn6xf8DMJDjNWnFlypG6hg4zU",
    authDomain: "capstonegame-24bce.firebaseapp.com",
    databaseURL: "https://capstonegame-24bce.firebaseio.com",
    storageBucket: "capstonegame-24bce.appspot.com",
    messagingSenderId: "575027063210"
  };

firebase.initializeApp(config);

const enterGame = (nextState) => {
  store.dispatch(join(nextState.params.id))
  store.dispatch(loadActions(nextState.params.id))
}

render (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Home} onEnter={store.dispatch(listenToAuth())} />
        <Route path="/game/:id" component={GameRoom} onEnter={enterGame} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('main')
)
