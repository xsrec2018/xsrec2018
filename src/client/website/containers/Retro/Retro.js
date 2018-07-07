import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import styles from './../../components/Retro/Retro.styles';
import Retro from '../../components/Retro';
import { retroJoin, setRetroIdQueryParameter, changeCardFilterPhrase } from '../../actions/retro';
import { columnAdd, columnRemove } from '../../actions/column';
import {
  COLUMN_ADD_QUERY_KEY,
  COLUMN_REMOVE_QUERY_KEY,
  RETRO_CARDS_KEY,
  RETRO_COLUMNS_KEY,
  RETRO_JOIN_QUERY_KEY,
  RETRO_NAME_KEY,
  RETRO_RENAME_QUERY_KEY, RETRO_SCRUM_MASTER_ID_KEY,
  RETRO_SHARE_ID_KEY,
  RETRO_STEP_KEY,
  RETRO_USERS_KEY,
  RETRO_TIMER_DEADLINE_KEY
} from '../../reducers/retro';
import { addMessage, openExportDialog, openRetroTimerDialog } from '../../actions/layout';
import { USER_CONNECT_QUERY_KEY, USER_ID_KEY } from '../../reducers/user';

const mapStateToProps = ({ retro, user }) => ({
  name: retro[RETRO_NAME_KEY],
  shareId: retro[RETRO_SHARE_ID_KEY],
  columns: retro[RETRO_COLUMNS_KEY],
  cards: retro[RETRO_CARDS_KEY],
  users: retro[RETRO_USERS_KEY],
  userId: user[USER_ID_KEY],
  scrumMasterId: retro[RETRO_SCRUM_MASTER_ID_KEY],
  step: retro[RETRO_STEP_KEY],
  connectQuery: user[USER_CONNECT_QUERY_KEY],
  joinRetroQuery: retro[RETRO_JOIN_QUERY_KEY],
  renameRetroQuery: retro[RETRO_RENAME_QUERY_KEY],
  addColumnQuery: retro[COLUMN_ADD_QUERY_KEY],
  removeColumnQuery: retro[COLUMN_REMOVE_QUERY_KEY],
  deadline: retro[RETRO_TIMER_DEADLINE_KEY]
});

const mapDispatchToProps = dispatch => ({
  joinRetro: (socket, shareId) => dispatch(retroJoin(socket, shareId)),
  addColumn: (socket, name, icon) => dispatch(columnAdd(socket, name, icon)),
  removeColumn: (socket, id) => dispatch(columnRemove(socket, id)),
  setRetroId: retroId => dispatch(setRetroIdQueryParameter(retroId)),
  addMessage: message => dispatch(addMessage(message)),
  changeCardFilterPhrase: phrase => dispatch(changeCardFilterPhrase(phrase)),
  openExportDialog: () => dispatch(openExportDialog(true)),
  openRetroTimerDialog: open => dispatch(openRetroTimerDialog(open))
});

export default withRouter(withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(DragDropContext(MultiBackend(HTML5toTouch))(Retro))
));
