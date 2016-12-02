// import React from 'react'
// import chai, {expect} from 'chai'
// import sinon, {spy} from 'sinon';
// chai.use(require('sinon-chai'));
// chai.use(require('chai-enzyme')());
// import {shallow} from 'enzyme';
// import Chatroom, {PureChatroom}from './Chatroom';
// import {createStore} from 'redux';

// describe('<Chatroom />', () => {

//   let home;
//   let wrapperChatroom;
//   const saveMessageSpy = spy();
//   const state = {
//     messages: {
//       randoKey:{
//         name: 'Elon Musk',
//         text: 'I told you so!'
//       }
//     },
//     loggedInUser: {
//       displayName: 'Elon Musk'
//     }
//   }
//   let store = createStore(state => state, state);

//   beforeEach('render Chatroom and PureChatroom', () => {
//     home = shallow(<PureHome />);
//     wrapperChatroom = shallow(<Chatroom />, { context: {store} });
//     }
//   )

//   it('has an input to enter text', () => {
//     expect(chatroom.find('input')).to.have.length(1);
//   });

//   it('has a label for text', () => {
//     expect(chatroom.find('label')).to.have.length(1);
//     expect(chatroom.find('label')).to.have.text("Type Message Here...");
//   });

//   it('has an empty div initially to display messages', () => {
//     expect(chatroom.find("div[id='messages']")).to.have.text('');
//   })

//   it('receives messages prop from store', () => {
//     expect(wrapperChatroom).to.have.prop('messages').eql(state.messages);
//   });

//   it('receives loggedInUser prop from store', () => {
//     expect(wrapperChatroom).to.have.prop('loggedInUser').eql(state.loggedInUser);
//   });

//   it('has a messages div', () => {
//     expect(chatroom.find("div[id='messages']")).to.have.length(1);
//   });

//   it('lets you type text and submit message by pressing Enter key', () => {
//     chatroom.find('input').simulate('change', {target: {value: 'I told you so'}});
//     chatroom.find('input').simulate('keydown', {keycode: 13});
//     // expect(chatroom.find("div[id='messages']")).to.have.text('Elon M: I told you so!');
//   });

//    it('calls saveMessage when player submits message', () => {
//     let chatroomInstance = chatroom.instance();
//     let saveMessageStub = sinon.stub(chatroomInstance, 'saveMessage');
//     chatroom.update();
//     chatroomInstance.forceUpdate();
//     chatroom.find('input').simulate('change', {target: {value: 'I told you so'}} );
//     chatroom.find('form').simulate('submit', { preventDefault: () => {} });
//     expect(saveMessageStub).to.have.been.called
//   });

// })

// describe("<Chatroom />'s connection", () => {
 // chatroom.find('input').simulate('keydown', {keycode: 13});
// wrapper.find('input').simulate('change', {target: {value: 'My new value'}});
//   let root, store, dispatch
//   beforeEach('create store and render the root', () => {
//     store = createStore(state => state, state)
//     dispatch = spy(store, 'dispatch')
//     root = shallow(<PureChatroom store={store}/>) //think since these don't have specific container..maybe this could move into the PureComponent test
//   })

// saveMessage={saveMessageSpy}

//   it('gets messages prop from store', () => {
//     expect(root).to.have.prop('messages').eql(state.messages);
//   });

// })

 // it('has a default state of ....', () => {
  //   expect(chatroom.state().stars).to.equal(0)
  // })

  // it('has a default state where text is an empty string', () => {
  //   expect(chatroom.state().text).to.equal("")
  // })

  // starButton = shallow(<IconButton name="two-star"/>)


 // it('calls saveMessage() when you submit (press enter)', () => {
  //   expect(chatroom.find())
  // })

  // it('updates state on text change', () => {
  //   chatroom.find("textarea").simulate('change',{target: {value: 'This is some new text'}})
  //   expect(chatroom.state().text).to.equal('This is some new text')
  // })
