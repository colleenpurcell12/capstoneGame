// import React from 'react'
// import chai, { expect} from 'chai'
// chai.use(require('chai-enzyme'))
// import {shallow, mount} from 'enzyme'
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import Home from './Home'
// import Chatroom from './Chatroom';
// import store from '../store';
// import Main from '../main';
// import jsdom from 'jsdom'

// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
// const win = doc.defaultView

// global.document = doc
// global.window = win

// propagateToGlobal(win)

// function propagateToGlobal (window) {
//   for (let key in window) {
//     if (!window.hasOwnProperty(key)) continue
//     if (key in global) continue

//     global[key] = window[key]
//   }
// }

// function setup(){
//   const muiTheme = getMuiTheme(); //material-ui wrap
//   return mount(<Main />, {
//     context: {muiTheme},
//     childContextTypes: {
//       muiTheme: React.PropTypes.object.isRequired
//     }
//   });
// }

// describe('Main wrapper', () => {
//   let main;

//   beforeEach('render the Home component', () =>
//     main = setup()
//   )

//   xit('renders <Home />', () => {
//     expect(main.find(Home)).to.have.length(1);
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
