import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyD9H4dWewyn6xf8DMJDjNWnFlypG6hg4zU",
    authDomain: "capstonegame-24bce.firebaseapp.com",
    databaseURL: "https://capstonegame-24bce.firebaseio.com",
    storageBucket: "capstonegame-24bce.appspot.com",
    messagingSenderId: "575027063210"
  };
  
firebase.initializeApp(config);



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
