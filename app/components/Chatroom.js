import React, { Component } from 'react';

export class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.saveMessage = this.saveMessage.bind(this);
  }
  componentDidMount() {
    this.props.listenForMessages();
  }

  saveMessage(e) {
    e.preventDefault();
    let name = this.props.loggedInUser.displayName.split(" ");
    const message = {
      name: `${name[0]} ${name[1][0]}`, //this will be current user's first name and second initial
      text: e.target.text.value
    }
    this.props.addMessage(message);
    e.target.text.value = null;
  }

  render() {
    const messages = this.props.messages;

    return (
      <div className="mdl-shadow--2dp" style={{background:'white', opacity:'.95', borderRadius: '5px'}}>
        <div className="mdl-color-text--grey-600">
          <div id="messages">
            {messages && Object.keys(messages).map(k => messages[k]).map( (message, idx) =>
                <div key = {idx}>{message.name}: {message.text}</div>
              )}
          </div>
          <form id="message-form" action="#" onSubmit={this.saveMessage} >
              <div id="message-input" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{background:'white', opacity: '.95', borderRadius: '5px'}}>
                <input className="mdl-textfield__input" type="text" id="message" name="text" />
                <label className="mdl-textfield__label" htmlFor="message">Type Message Here...</label>
              </div>
          </form>
        </div>
      </div>
    )
  }
}


/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux'
import { listenForMessages, addMessage } from '../reducers/chatroom'

const mapState = ({ messages, loggedInUser }) => ({ messages, loggedInUser })

const mapDispatch = { listenForMessages, addMessage }

export default connect(mapState, mapDispatch)(Chatroom);
