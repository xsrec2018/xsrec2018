import { withMobileDialog } from 'material-ui/Dialog';
import { connect } from 'react-redux';
import RetroTimerDialog from '../../components/RetroTimerDialog';
import { LAYOUT_RETRO_TIMER_DIALOG_OPEN_KEY } from '../../reducers/layout';
import { retroUpdateTimer } from '../../actions/retro';
import { changeStep } from '../../actions/steps';
import { RETRO_STEP_KEY, RETRO_SCRUM_MASTER_ID_KEY } from '../../reducers/retro';
import { USER_ID_KEY } from '../../reducers/user';

const mapStateToProps = state => ({
  open: state.layout[LAYOUT_RETRO_TIMER_DIALOG_OPEN_KEY],
  retroStep: state.retro[RETRO_STEP_KEY],
  isScrumMaster: !!(state.retro.join.status === 'success' && state.user[USER_ID_KEY] && state.retro[RETRO_SCRUM_MASTER_ID_KEY] === state.user[USER_ID_KEY])
});

const mapDispatchToProps = dispatch => ({
  updateRetroTimer: (socket, retroStep, reset) => dispatch(
    retroUpdateTimer(socket, retroStep, reset)
  ),
  changeStep: (socket, step) => dispatch(changeStep(socket, step))
});

export default withMobileDialog({ breakpoint: 'xs' })(
  connect(mapStateToProps, mapDispatchToProps)(RetroTimerDialog)
);
