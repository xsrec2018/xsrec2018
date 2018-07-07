import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import { Button, Grid } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import { steps } from '../../components/Retro/Steps';

class RetroTimerDialog extends Component {
  constructor(props) {
    super(props);

    this.onRestartTimer = this.onRestartTimer.bind(this);
  }

  onRestartTimer() {
    const { updateRetroTimer, retroStep } = this.props;
    updateRetroTimer(this.context.socket, retroStep, true);
  }

  handleNextStep = currentKey => () => {
    const { socket } = this.context;
    const { changeStep } = this.props;
    const index = steps.findIndex(s => s.key === currentKey);
    if (index < 3) {
      const { key } = steps[index + 1];
      changeStep(socket, key);
    }
  }

  render() {
    const { open, isScrumMaster, retroStep } = this.props;

    return (
      <Dialog open={open}>
        <DialogTitle>
          {!isScrumMaster
            ? <FormattedMessage id="retro.expiration-description" />
            : <FormattedMessage id="retro.expiration-description-scrum-master" />
          }
        </DialogTitle>
        <DialogContent>
          {isScrumMaster ? (
            <Grid container justify="space-around" spacing={16}>
              <Grid item>
                <Button
                  xs={8}
                  raised
                  onClick={this.onRestartTimer}
                >
                  <FormattedMessage id="retro.expiration-restart" />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  xs={8}
                  raised
                  onClick={this.handleNextStep(retroStep)}
                >
                  <FormattedMessage id="retro.expiration-go-next" />
                </Button>
              </Grid>
            </Grid>
          ) : ''}
        </DialogContent>
      </Dialog>
    );
  }
}

RetroTimerDialog.contextTypes = {
  socket: PropTypes.object
};

RetroTimerDialog.defaultProps = {
  retroStep: null
};

RetroTimerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  updateRetroTimer: PropTypes.func.isRequired,
  retroStep: PropTypes.string,
  isScrumMaster: PropTypes.bool.isRequired,
  changeStep: PropTypes.func.isRequired
};

export default RetroTimerDialog;
