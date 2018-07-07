import React from 'react';
import { withStyles } from 'material-ui/styles';
import { FormattedMessage } from 'react-intl';
import { formValueSelector, reduxForm, isValid } from 'redux-form';
import { connect } from 'react-redux';
import styles from '../../components/NewRetro/NewRetro.styles';
import { RETRO_SHARE_ID_KEY, RETRO_JOIN_QUERY_KEY } from '../../reducers/retro';
import TimerStep, {
  ACTIVATED_FIELD,
  WRITE_TIME_FIELD,
  VOTE_TIME_FIELD,
  ALL_TIME_FIELD,
  REVIEW_TIME_FIELD
} from '../../components/NewRetro/TimerStep';
import { retroJoin, retroSetTimer } from '../../actions/retro';


const SET_RETRO_TIMER_FORM = 'timerOptions';
const formSelector = formValueSelector(SET_RETRO_TIMER_FORM);
const formValid = isValid(SET_RETRO_TIMER_FORM);

const mapStateToProps = ({ retro, ...state },
  { match: { params: { retroShareId: retroShareParamId } } }) => ({
  activated: formSelector(state, ACTIVATED_FIELD),
  writeTime: formSelector(state, WRITE_TIME_FIELD),
  voteTime: formSelector(state, VOTE_TIME_FIELD),
  reviewTime: formSelector(state, REVIEW_TIME_FIELD),
  allTime: formSelector(state, ALL_TIME_FIELD),
  joinRetroQuery: retro[RETRO_JOIN_QUERY_KEY],
  retroShareId: retro[RETRO_SHARE_ID_KEY],
  retroShareParamId,
  canSetTimer: formValid(state)
});

const mapDispatchToProps = dispatch => ({
  joinRetro: retroJoin,
  setRetroTimer: (socket, writeTime, voteTime, reviewTime, allTime) => dispatch(
    retroSetTimer(socket, writeTime, voteTime, reviewTime, allTime)
  )
});

const validate = (values) => {
  const errors = {};
  Object.entries(values).forEach(([key, value]) => {
    if (key !== ACTIVATED_FIELD
      && ((value <= 0 && key !== ALL_TIME_FIELD)
      || (key === ALL_TIME_FIELD && value < 0))
    ) {
      errors[key] = <FormattedMessage id="retro.greather-than-zero" />;
    }
  });

  return errors;
};

export default withStyles(styles, { withTheme: true })(reduxForm({
  form: SET_RETRO_TIMER_FORM,
  initialValues: { activated: false, writeTime: 5, voteTime: 5, reviewTime: 5, allTime: 0 },
  fields: [ACTIVATED_FIELD, WRITE_TIME_FIELD, VOTE_TIME_FIELD, ALL_TIME_FIELD, REVIEW_TIME_FIELD],
  enableReinitialize: true,
  validate
})(connect(mapStateToProps, mapDispatchToProps)(TimerStep)));
