import React from 'react'
import chai, {expect} from 'chai'
import sinon, {spy} from 'sinon';
chai.use(require('sinon-chai'));
chai.use(require('chai-enzyme')());
import {shallow} from 'enzyme';
import Chatroom, {PureChatroom}from './Chatroom';
import {createStore} from 'redux';

describe('<Chatroom /> 💬', () => {

  let chatroom;
  let wrapperChatroom;
  const state = {
    messages: {
      randoKey:{
        name: 'Elon Musk',
        text: 'I told you so!'
      }
    },
    loggedInUser: {
      displayName: 'Elon Musk'
    }
  }
  let store = createStore(state => state, state);

  beforeEach('render Chatroom and PureChatroom', () => {
    chatroom = shallow(<PureChatroom />);
    wrapperChatroom = shallow(<Chatroom />, { context: {store} });
    }
  )

  it('has an input to enter text', () => {
    expect(chatroom.find('input')).to.have.length(1);
  });

  it('has a label for text', () => {
    expect(chatroom.find('label')).to.have.length(1);
    expect(chatroom.find('label')).to.have.text("Type Message Here...");
  });

  it('has an empty div initially to display messages', () => {
    expect(chatroom.find("div[id='messages']")).to.have.text('');
  })

  it('receives messages prop from store', () => {
    expect(wrapperChatroom).to.have.prop('messages').eql(state.messages);
  });

  it('receives loggedInUser prop from store', () => {
    expect(wrapperChatroom).to.have.prop('loggedInUser').eql(state.loggedInUser);
  });

  it('has a messages div', () => {
    expect(chatroom.find("div[id='messages']")).to.have.length(1);
  });

  it('lets you type text and submit message by pressing Enter key', () => {
    chatroom.find('input').simulate('change', {target: {value: 'I told you so'}});
    chatroom.find('input').simulate('keydown', {keycode: 13});
    // expect(chatroom.find("div[id='messages']")).to.have.text('Elon M: I told you so!');
  });

  xit('calls saveMessage when player submits message', () => {
    let mountedChatroom = mount()
    let chatroomInstance = chatroom.instance();
    let saveMessageStub = sinon.stub(chatroomInstance, 'saveMessage');
    chatroom.update();
    chatroomInstance.forceUpdate();
    chatroom.find('input').simulate('change', {target: {value: 'I told you so'}} );
    chatroom.find('form').simulate('submit');
    expect(saveMessageStub).to.have.been.called
  });

})
