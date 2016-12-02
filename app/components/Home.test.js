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
    home = shallow(<PureHome loggedInUser={true}/>);
    googleLogin = shallow(<GoogleLogin />, { context: {store} });
    // wrapperHome = shallow(<Home />, { context: {store} });
    }
  )

    it('has six div sections when logged in', () => {
      expect(home.find('div')).to.have.length(6);
    });

    // it('has renders the GoogleLogin component', () => {
    //   console.log(home.debug());
    //   expect(home.contains(<PureGoogleLogin />)).to.equal(true);
    // })


  // it('renders the google login navbar', () => {
  //   expect(home.find(login)).to.have.length(1);
  // });

  // it('renders the chatroom ', () => {
  //   expect(home.find(login)).to.have.length(1);
  // });

  // it('renders the google login navbar', () => {
  //   expect(home.find(login)).to.have.length(1);
  // });

  // it('renders the google login navbar', () => {
  //   expect(home.find(login)).to.have.length(1);
  // });

  // it('renders the google login navbar', () => {
  //   expect(home.find(login)).to.have.length(1);
  // });

  })


  // it('has a label for text', () => {
  //   expect(home.find('label')).to.have.length(1);
  //   expect(home.find('label')).to.have.text("Type Message Here...");
  // });

  // it('has an empty div initially to display messages', () => {
  //   expect(home.find("div[id='messages']")).to.have.text('');
  // })

  // it('receives messages prop from store', () => {
  //   expect(wrapperHome).to.have.prop('messages').eql(state.messages);
  // });

  // it('receives loggedInUser prop from store', () => {
  //   expect(wrapperHome).to.have.prop('loggedInUser').eql(state.loggedInUser);
  // });

  // it('has a messages div', () => {
  //   expect(home.find("div[id='messages']")).to.have.length(1);
  // });

  // it('lets you type text and submit message by pressing Enter key', () => {
  //   chatroom.find('input').simulate('change', {target: {value: 'I told you so'}});
  //   chatroom.find('input').simulate('keydown', {keycode: 13});
  //   // expect(chatroom.find("div[id='messages']")).to.have.text('Elon M: I told you so!');
  // });

  //  it('calls saveMessage when player submits message', () => {
  //   let chatroomInstance = chatroom.instance();
  //   let saveMessageStub = sinon.stub(chatroomInstance, 'saveMessage');
  //   chatroom.update();
  //   chatroomInstance.forceUpdate();
  //   chatroom.find('input').simulate('change', {target: {value: 'I told you so'}} );
  //   chatroom.find('form').simulate('submit', { preventDefault: () => {} });
  //   expect(saveMessageStub).to.have.been.called
  // });

// import React from 'react'
// import chai, { expect} from 'chai'
// chai.use(require('chai-enzyme'))
// import {shallow, mount} from 'enzyme'
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import Home from './Home'
// import Chatroom from './Chatroom';
// import store from '../store';

// function setup(){
//   const muiTheme = getMuiTheme(); //material-ui wrap
//   return mount(<Home />, {
//     context: {muiTheme, store},
//     childContextTypes: {
//       muiTheme: React.PropTypes.object.isRequired
//     }
//   });
// }

 // chatroom.find('form').simulate('submit', { preventDefault: () => {} });

// describe('<Home />', () => {
//   let home;

//   beforeEach('render the Home component', () =>
//     home = setup()
//   )

//   xit('renders <Chatroom />', () => {
//     expect(home.find(Chatroom)).to.have.length(1);
//   })

  // it('has a label for the text input area', () => {
  //   expect(chatroom.find('label')).to.have.length(1);
  // })

  // it('updates state on text change', () => {
  //   chatroom.find("textarea").simulate('change',{target: {value: 'This is some new text'}})
  //   expect(chatroom.state().text).to.equal('This is some new text')
  // })

// })



 // it('has a default state of ....', () => {
  //   expect(chatroom.state().stars).to.equal(0)
  // })

  // it('has a default state where text is an empty string', () => {
  //   expect(chatroom.state().text).to.equal("")
  // })

  // starButton = shallow(<IconButton name="two-star"/>)
