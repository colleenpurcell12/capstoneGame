import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme'))
import {shallow} from 'enzyme'
import IconButton from 'material-ui/IconButton';
import Chatroom from './Chatroom'
import store from '../store';

describe('<Chatroom />', () => {

  let chatroom;
  beforeEach('render the Chatroom component', () =>
    chatroom = shallow(<Chatroom />, { context: {store} })
  )

  // it('has a place to enter text', () => {
  //   expect(chatroom.find("textarea")).to.have.length(1)
  // })

  it('has an input to enter text', () => {
    expect(chatroom.find('div')).to.have.length(1);
  })

  it('has a label for the text input area', () => {
    expect(chatroom.find('label')).to.have.length(1);
  })

  // it('updates state on text change', () => {
  //   chatroom.find("textarea").simulate('change',{target: {value: 'This is some new text'}})
  //   expect(chatroom.state().text).to.equal('This is some new text')
  // })

})



 // it('has a default state of ....', () => {
  //   expect(chatroom.state().stars).to.equal(0)
  // })

  // it('has a default state where text is an empty string', () => {
  //   expect(chatroom.state().text).to.equal("")
  // })

  // starButton = shallow(<IconButton name="two-star"/>)
