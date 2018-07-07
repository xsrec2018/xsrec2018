import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import PropTypes from 'prop-types';
import { AppBar, IconButton, Typography, Toolbar, Tooltip } from 'material-ui';
import Chat from 'material-ui-icons/Chat';
import PersonIcon from 'material-ui-icons/Person';
import { HOMEPAGE_ROUTE_PATH } from '../../../routes/Homepage/MainRoutes';

const Header = ({
  classes,
  headline,
  retroId,
  openChangeNameDialog,
  openRetroTimerDialog,
  children,
  leaveRetro,
  userName,
  deadline,
  timerActivated,
  retroStep
}, { socket }) => (
  <header>
    <AppBar
      className={classes.appBar}
      position="static"
      color="default"
    >
      <Toolbar>
        <Link
          to={HOMEPAGE_ROUTE_PATH}
          onClick={() => leaveRetro(socket, retroId)}
        >
          <Chat className={classes.logoIcon} />
          <span className="logotype">RETROMEET</span>
        </Link>
        <Typography type="headline" className={classes.headline}>
          {headline}
        </Typography>
        {timerActivated && deadline && retroStep !== 'closed' ? (
          <div className={classes.timer}>
            <FormattedMessage id="retro.remaining-time" />: &nbsp;
            <Countdown
              date={moment(deadline).toDate()}
              onComplete={() => { openRetroTimerDialog(true); }}
            />
          </div>
        ) : ''}
        <div className={classes.actionButtons}>
          {children}
          <IconButton onClick={openChangeNameDialog} className={classes.icon}>
            <PersonIcon />
            <Tooltip key={userName} title={userName} placement="bottom">
              <div className={classes.userName}>
                {userName.length > 18 ? `${userName.substring(0, 15)}...` : userName}
              </div>
            </Tooltip>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  </header>
);

Header.defaultProps = {
  headline: '',
  userName: '',
  retroId: null,
  timerActivated: false,
  deadline: null,
  retroStep: null
};

Header.propTypes = {
  // Values
  userName: PropTypes.string,
  headline: PropTypes.string,
  retroId: PropTypes.string,
  children: PropTypes.node.isRequired,
  timerActivated: PropTypes.bool,
  openChangeNameDialog: PropTypes.func.isRequired,
  openRetroTimerDialog: PropTypes.func.isRequired,
  leaveRetro: PropTypes.func.isRequired,
  deadline: PropTypes.string,
  retroStep: PropTypes.string,
  // Styles
  classes: PropTypes.shape({
    appBar: PropTypes.string.isRequired,
    actionButtons: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    logoIcon: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired
};

Header.contextTypes = {
  socket: PropTypes.object.isRequired
};

export default Header;
