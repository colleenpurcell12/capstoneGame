import React, { Component } from 'react';
import  ReactDOM from 'react-dom'

export class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.saveMessage = this.saveMessage.bind(this);
  }
  componentDidMount() {
    this.props.listenForMessages();
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }
  scrollToBottom() {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
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
      <div className="mdl-shadow--2dp chatroom">
        <div id="message-container" ref="messageList">
          {messages && Object.keys(messages).map(k => messages[k]).map( (message, idx) =>
              <div className="messages" key = {idx}><strong>{message.name}</strong>: {message.text}</div>
            )}
        </div>
        <form id="message-form" action="#" onSubmit={this.saveMessage} >
          <div id="message-input" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style={{background:'white', opacity: '0.9', borderRadius: '5px'}}>
            <input className="mdl-textfield__input" type="text" id="message" name="text" />
            <label className="mdl-textfield__label" htmlFor="message">Type Message Here...</label>
          </div>
        </form>
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

export { Chatroom as PureChatroom }; //this is for testing, do not remove unless updating test suite
