import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Typography
} from 'material-ui';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Search from 'material-ui-icons/Search';
import {
  QUERY_ERROR_KEY,
  QUERY_STATUS_FAILURE,
  QUERY_STATUS_KEY,
  QUERY_STATUS_SUCCESS,
  queryFailed,
  QueryShape,
  querySucceeded
} from '../../services/websocket/query';
import Column from '../../containers/Retro/Column';
import Steps from '../../containers/Retro/Steps';
import { initialsOf } from '../../services/utils/initials';


class Retro extends Component {
  componentWillMount() {
    this.joinRetro();
  }

  componentDidMount() {
    this.onSearchPhraseChange = this.onSearchPhraseChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { addColumnQuery, connectQuery, addMessage } = this.props;
    const {
      addColumnQuery: nextAddColumnQuery,
      connectQuery: nextConnectQuery,
      deadline,
      openRetroTimerDialog
    } = nextProps;
    if (queryFailed(addColumnQuery, nextAddColumnQuery)) {
      addMessage(nextAddColumnQuery[QUERY_ERROR_KEY]);
    }
    if (querySucceeded(connectQuery, nextConnectQuery)) {
      this.joinRetro();
    }

    if (deadline && moment(deadline).isBefore(moment())) {
      openRetroTimerDialog(true);
    } else if (deadline && moment(deadline).isAfter(moment())) {
      openRetroTimerDialog(false);
    }
  }

  onSearchPhraseChange = (e) => {
    this.props.changeCardFilterPhrase(e.target.value);
  }

  joinRetro = () => {
    const { joinRetro, match: { params: { retroShareId } } } = this.props;
    const { socket } = this.context;
    joinRetro(socket, retroShareId);
  };

  render() {
    const {
      classes,
      columns,
      users,
      history,
      openExportDialog,
      joinRetroQuery: {
        [QUERY_STATUS_KEY]: joinStatus,
        [QUERY_ERROR_KEY]: joinError
      }
    } = this.props;
    switch (joinStatus) {
      case QUERY_STATUS_SUCCESS:
        return (
          <div className={classes.root}>
            <Steps />
            <div>
              <Grid className={classes.searchBox} container spacing={8} alignItems="flex-end">
                <Grid item>
                  <Search />
                </Grid>
                <Grid item>
                  <TextField onChange={this.onSearchPhraseChange} id="input-with-icon-grid" label="Szukaj" />
                </Grid>
              </Grid>
            </div>
            <div className={classes.columns}>
              {columns.map(column => (
                <Column key={column.id} column={column} />
              ))}
            </div>
            <div className={classes.users}>
              {Object.values(users).map(({ id, name }) => (
                <Tooltip key={id} title={name} placement="left">
                  <Avatar
                    alt={name}
                    className={classes.avatar}
                  >
                    {initialsOf(name)}
                  </Avatar>
                </Tooltip>
              ))}
            </div>
            <div className={classes.export}>
              <Button
                raised
                variant="contained"
                color="primary"
                onClick={openExportDialog}
              >
                <FormattedMessage id="retro.export" />
              </Button>
            </div>
          </div>
        );
      case QUERY_STATUS_FAILURE:
        return (
          <div className={classes.root}>
            <Card className={classes.messageCard}>
              <Typography type="headline">Error</Typography>
              <CardContent>
                <Typography>{joinError}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => history.goBack()}>Back</Button>
              </CardActions>
            </Card>
          </div>
        );
      default:
        return (
          <div className={classes.root}>
            <Card className={classes.messageCard}>
              <CircularProgress color="primary" />
            </Card>
          </div>
        );
    }
  }
}

Retro.contextTypes = {
  socket: PropTypes.object.isRequired
};

Retro.defaultProps = {
  deadline: null
};

Retro.propTypes = {
  // Values
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      retroShareId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  })).isRequired,
  users: PropTypes.object.isRequired,
  deadline: PropTypes.string,
  // Queries
  connectQuery: PropTypes.shape(QueryShape).isRequired,
  joinRetroQuery: PropTypes.shape(QueryShape).isRequired,
  addColumnQuery: PropTypes.shape(QueryShape).isRequired,
  // Functions
  joinRetro: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  changeCardFilterPhrase: PropTypes.func.isRequired,
  openExportDialog: PropTypes.func.isRequired,
  openRetroTimerDialog: PropTypes.func.isRequired,
  // Styles
  classes: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    messageCard: PropTypes.string.isRequired,
    columns: PropTypes.string.isRequired,
    users: PropTypes.string.isRequired,
    hidden: PropTypes.string.isRequired
  }).isRequired
};

export default Retro;
