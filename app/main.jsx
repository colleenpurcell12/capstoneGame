'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import  {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
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
  
firebase.initializeApp(config);
const database = firebase.database();

// const ExampleApp = connect(
//   ({ auth }) => ({ user: auth })
// ) (
//   ({ user, children }) =>
//     <div>
//       <nav>
//         {user ? <WhoAmI/> : <Login/>}
//       </nav> 
//       {children}
//     </div>
// )
render (

  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={() => <Chatroom database={database}/>} >
        <IndexRedirect to="chatroom" />
        <Route path="chatroom" component={() => <Chatroom database={database}/>} />
        <Route path="googlelogin" component={GoogleLogin}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
