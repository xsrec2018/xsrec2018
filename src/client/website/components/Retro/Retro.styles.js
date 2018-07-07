import { cardWidth } from '../../theme/dimensions';

const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    width: '100%'
  },
  columns: {
    display: 'flex',
    width: '100%',
    flexFlow: 'row wrap',
    padding: '0 4%'
  },
  users: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatar: {
    width: 64,
    height: 64,
    margin: theme.spacing.unit
  },
  badge: {
    margin: theme.spacing.unit * 2
  },
  messageCard: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit * 2,
    width: cardWidth,
    maxWidth: '100%',
    margin: theme.spacing.unit * 2
  },
  hidden: {
    display: 'none'
  },
  searchBox: {
    width: '100%',
    justifyContent: 'center'
  },
  export: {
    position: 'fixed',
    bottom: '130px',
    right: '20px'
  }
});

export default styles;
