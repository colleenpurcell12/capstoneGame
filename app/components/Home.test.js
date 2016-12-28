import React from 'react'
import chai, {expect} from 'chai'
import sinon, {spy} from 'sinon';
chai.use(require('sinon-chai'));
chai.use(require('chai-enzyme')());
import {shallow} from 'enzyme';
import Home, {PureHome} from './Home';
import {createStore} from 'redux';
import GoogleLogin, {PureGoogleLogin} from './GoogleLogin';
import Chatroom from './Chatroom';
import Board from './Board';
import Players from './Players';
import Dice from './Dice';
import PlayerStat from './PlayerStat';

describe('<Home /> 🏡', () => {

  let home, wrapperHome, googleLogin, login;
  const state = {
    loggedInUser: {
      displayName: 'Elon Musk'
    },
    doneLoading: true,
    isSettingUp: true
  }

  let store = createStore( state => state, state);

  beforeEach('render Home component', () => {
    home = shallow(<Home loggedInUser={true}/>, { context: {store} });
    }
  )
  xit('displays the GoogleLogin component', () => {
    console.log(home.debug)
      expect(home.containsAllMatchingElements([
        shallow(<PureGoogleLogin />)
      ])).to.equal(true);
  })


  })
