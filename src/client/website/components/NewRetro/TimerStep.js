/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { TextField, Checkbox } from 'redux-form-material-ui';
import { CircularProgress, Grid, FormControlLabel } from 'material-ui';
import { CardContent } from 'material-ui/Card';
import BaseStep from './BaseStep';
import { QUERY_STATUS_IN_PROGRESS, QUERY_STATUS_KEY } from '../../services/websocket/query';
import { newRetroShareRoutePath, newRetroColumnsRoutePath } from '../../routes/NewRetro/MainRoutes';

export const ACTIVATED_FIELD = 'activated';
export const WRITE_TIME_FIELD = 'writeTime';
export const VOTE_TIME_FIELD = 'voteTime';
export const REVIEW_TIME_FIELD = 'reviewTime';
export const ALL_TIME_FIELD = 'allTime';

class TimerStep extends Component {
  componentWillMount() {
    const { joinRetro, retroShareId, retroShareParamId } = this.props;
    const { socket } = this.context;
    if (retroShareParamId !== retroShareId) {
      joinRetro(socket, retroShareParamId);
    }
  }

  setTimer = () => {
    const {
      activated,
      writeTime,
      voteTime,
      reviewTime,
      allTime,
      setRetroTimer
    } = this.props;
    if (activated) {
      setRetroTimer(this.context.socket, writeTime, voteTime, reviewTime, allTime);
    }

    const { history, retroShareId } = this.props;
    history.push(newRetroShareRoutePath(retroShareId));
  };

  render() {
    const {
      classes,
      joinRetroQuery,
      retroShareId,
      retroShareParamId,
      activated,
      history,
      canSetTimer,
      allTime
    } = this.props;

    const notJoinedYet = retroShareId !== retroShareParamId
      || joinRetroQuery[QUERY_STATUS_KEY] === QUERY_STATUS_IN_PROGRESS;

    return (
      <BaseStep
        step={2}
        maxSteps={4}
        onBack={() => history.push(newRetroColumnsRoutePath(retroShareParamId))}
        onNext={canSetTimer ? this.setTimer : undefined}
        {...this.props}
      >
        {notJoinedYet ? (
          <CardContent className={classes.cardContent}>
            <CircularProgress color="primary" />
          </CardContent>
        ) : (
          <CardContent className={classes.cardContent} key="content">
            <div className={classes.timer}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    control={<Field name="activated" component={Checkbox} />}
                    label={<FormattedMessage id="retro.set-time" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    parse={value => Number(value)}
                    name="writeTime"
                    component={TextField}
                    autoFocus
                    margin="dense"
                    label={<FormattedMessage id="retro.write-time" />}
                    fullWidth
                    type="number"
                    disabled={!activated || allTime > 0}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    parse={value => Number(value)}
                    name="voteTime"
                    component={TextField}
                    autoFocus
                    margin="dense"
                    label={<FormattedMessage id="retro.vote-time" />}
                    fullWidth
                    type="number"
                    disabled={!activated || allTime > 0}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    parse={value => Number(value)}
                    name="reviewTime"
                    component={TextField}
                    autoFocus
                    margin="dense"
                    label={<FormattedMessage id="retro.discuss-time" />}
                    fullWidth
                    type="number"
                    disabled={!activated || allTime > 0}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    parse={value => Number(value)}
                    name="allTime"
                    component={TextField}
                    autoFocus
                    margin="dense"
                    label={<FormattedMessage id="retro.all-time" />}
                    fullWidth
                    type="number"
                    disabled={!activated}
                  />
                </Grid>
              </Grid>
            </div>
          </CardContent>
        )}
      </BaseStep>
    );
  }
}

TimerStep.defaultProps = {
  retroShareId: undefined
};

TimerStep.contextTypes = {
  socket: PropTypes.object.isRequired
};

TimerStep.propTypes = {
  // Route Params
  retroShareParamId: PropTypes.string.isRequired,
  // Variables
  history: PropTypes.object.isRequired,
  retroShareId: PropTypes.string,
  activated: PropTypes.bool.isRequired,
  writeTime: PropTypes.number.isRequired,
  voteTime: PropTypes.number.isRequired,
  reviewTime: PropTypes.number.isRequired,
  allTime: PropTypes.number.isRequired,
  canSetTimer: PropTypes.bool.isRequired,
  // Functions
  joinRetro: PropTypes.func.isRequired,
  setRetroTimer: PropTypes.func.isRequired,
  // Queries
  joinRetroQuery: PropTypes.object.isRequired,
  // Styles
  classes: PropTypes.shape({
    cardContent: PropTypes.string.isRequired
  }).isRequired
};
export default TimerStep;
