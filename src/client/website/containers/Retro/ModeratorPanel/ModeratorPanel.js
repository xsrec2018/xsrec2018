import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import styles from './../../../components/Retro/ModeratorPanel/ModeratorPanel.styles';
import ModeratorPanel from '../../../components/Retro/ModeratorPanel/ModeratorPanel';
import { USER_ID_KEY } from '../../../reducers/user';
import { RETRO_STEP_KEY, RETRO_SCRUM_MASTER_ID_KEY, RETRO_TIMER_ACTIVATED_KEY, RETRO_TIMER_ALL_TIME_KEY } from '../../../reducers/retro';
import { changeStep } from '../../../actions/steps';

const mapStateToProps = state => ({
  isScrumMaster: !!(state.retro.join.status === 'success' && state.user[USER_ID_KEY] && state.retro[RETRO_SCRUM_MASTER_ID_KEY] === state.user[USER_ID_KEY]),
  retroStep: state.retro[RETRO_STEP_KEY],
  retroTimerActivated: state.retro[RETRO_TIMER_ACTIVATED_KEY],
  allTime: state.retro[RETRO_TIMER_ALL_TIME_KEY]
});

const mapDispatchToProps = dispatch => ({
  changeStep: (socket, step) => dispatch(changeStep(socket, step))
});

export default withStyles(styles)((connect(mapStateToProps, mapDispatchToProps)(ModeratorPanel)));
