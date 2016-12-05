import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export class WinnerAlert extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true,
    }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        {this.props.winner ?
          <Dialog
            title="Gameover"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            The winner is... {this.props.winner}
          </Dialog>
        :
          <div></div>
        }
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

import {connect} from 'react-redux';

const mapState = ({ winner }) => ({ winner }); 

export default connect(
  mapState,
)(WinnerAlert)