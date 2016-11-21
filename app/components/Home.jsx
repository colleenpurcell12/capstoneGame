import React from 'react';
import GoogleLogin from './GoogleLogin';
import
//originally had all firebase db info in here
export default class Home extends React.Component {

  render(){
    //eventually we want to move a lot of the non-navbar layout to live here after we're able to pass in auth from the store
    return (
      <div>
        <GoogleLogin auth={this.props.auth}>
        <Chatroom />
      </div>
      )
  }
}
