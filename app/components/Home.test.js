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
