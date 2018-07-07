import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import styles from './../../../components/App/Header/Header.styles';
import Header from './../../../components/App/Header';
import { openChangeNameDialog, openRetroTimerDialog } from '../../../actions/layout';
import { USER_NAME_KEY, USER_ID_KEY } from '../../../reducers/user';
import {
  RETRO_NAME_KEY,
  RETRO_ID_KEY,
  RETRO_TIMER_DEADLINE_KEY,
  RETRO_STEP_KEY,
  RETRO_SCRUM_MASTER_ID_KEY,
  RETRO_TIMER_ACTIVATED_KEY
} from '../../../reducers/retro';
import { retroLeave } from '../../../actions/retro';

const mapStateToProps = ({ user, retro }) => ({
  userName: user[USER_NAME_KEY],
  retroId: retro[RETRO_ID_KEY],
  scrumMasterId: retro[RETRO_SCRUM_MASTER_ID_KEY],
  timerActivated: retro[RETRO_TIMER_ACTIVATED_KEY],
  userId: user[USER_ID_KEY],
  headline: retro[RETRO_NAME_KEY],
  deadline: retro[RETRO_TIMER_DEADLINE_KEY],
  retroStep: retro[RETRO_STEP_KEY]
});

const mapDispatchToProps = dispatch => ({
  openChangeNameDialog: () => dispatch(openChangeNameDialog(true)),
  leaveRetro: (socket, retroId) => dispatch(retroLeave(socket, retroId)),
  openRetroTimerDialog: open => dispatch(openRetroTimerDialog(open))
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
