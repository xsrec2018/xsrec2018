import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { IconButton, Typography } from 'material-ui';
import PlaylistAdd from 'material-ui-icons/PlaylistAdd';
import RemoveRedEye from 'material-ui-icons/RemoveRedEye';
import Sort from 'material-ui-icons/Sort';
import Card from '../../containers/Retro/Card';
import { QUERY_ERROR_KEY, queryFailed, QueryShape } from '../../services/websocket/query';
import { CardShape } from '../Retro/Card';

const columnTarget = {
  drop(props, monitor, component) {
    const { column: { id }, editCard } = props;
    const { socket } = component.context;
    const item = monitor.getItem();
    if (id !== item.columnId) {
      editCard(socket, { id: item.id, columnId: id });
    }
  },
  canDrop(props, monitor) {
    return monitor.isOver({ shallow: true });
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  };
}

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', sortActivated: false, showCards: true };
  }

  componentWillReceiveProps(nextProps) {
    const { addCardQuery, addMessage } = this.props;
    const { addCardQuery: nextAddCardQuery } = nextProps;
    if (queryFailed(addCardQuery, nextAddCardQuery)) {
      addMessage(nextAddCardQuery[QUERY_ERROR_KEY]);
    }
  }

  addCard = () => {
    const { socket } = this.context;
    const { text } = this.state;
    const { column: { id }, addCard } = this.props;

    addCard(socket, id, text);
    this.setState({ text: '' });
  };

  sortCards = () => {
    this.setState({
      sortActivated: !this.state.sortActivated
    });
  }

  toggleCardsVisibility = () => {
    this.setState({
      showCards: !this.state.showCards
    });
  }

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    const {
      column,
      filteredAndSortedCardsByPhrase,
      filteredCards,
      classes,
      connectDropTarget,
      isOver,
      retroStep
    } = this.props;
    const { sortActivated, showCards } = this.state;
    let cardsToDisplay = [];

    if (sortActivated && retroStep === 'vote') {
      cardsToDisplay = filteredAndSortedCardsByPhrase;
    } else {
      cardsToDisplay = filteredCards;
    }

    return connectDropTarget(
      <div className={classNames({ [classes.column]: true, [classes.columnItemHover]: isOver })}>
        <div className={classes.header}>
          <Typography
            type="headline"
            className={classes.columnTitle}
            onDoubleClick={this.startEditing}
          >{column.name}
          </Typography>
          {retroStep === 'vote'
            ? (
              <IconButton className={classes.addCardIcon} onClick={this.sortCards}>
                <Sort className={classNames({ [classes.iconActive]: sortActivated })} />
              </IconButton>
            )
            : ''
          }
          <IconButton className={classes.addCardIcon} onClick={this.toggleCardsVisibility}>
            <RemoveRedEye className={classNames({ [classes.iconActive]: showCards })} />
          </IconButton>
          {retroStep === 'write' ? (
            <IconButton className={classes.addCardIcon} onClick={this.addCard}>
              <PlaylistAdd className={classes.actionIcon} />
            </IconButton>) : ''
          }
        </div>
        {showCards ? cardsToDisplay.filter(card => column.id === card.columnId).map(card => (
          <Card card={card} key={card.id} />
        )) : ''}
      </div>
    );
  }
}

Column.contextTypes = {
  socket: PropTypes.object.isRequired
};

export const cardShape = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}));

Column.propTypes = {
  // Values
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  filteredAndSortedCardsByPhrase: PropTypes.arrayOf(PropTypes.shape(CardShape)).isRequired,
  filteredCards: PropTypes.arrayOf(PropTypes.shape(CardShape)).isRequired,
  retroStep: PropTypes.string.isRequired,
  // React dnd
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  // Functions
  addCard: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  // Queries
  addCardQuery: PropTypes.shape(QueryShape).isRequired,
  // Styles
  classes: PropTypes.shape({
    column: PropTypes.string.isRequired,
    columnTitle: PropTypes.string.isRequired,
    addCardIcon: PropTypes.string.isRequired,
    addCardContainer: PropTypes.string.isRequired
  }).isRequired
};

export default DropTarget('CARD', columnTarget, collect)(Column);
