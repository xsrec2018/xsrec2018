import React from 'react';
import PropTypes from 'prop-types';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Sort from 'material-ui-icons/Sort';
import { expect } from 'chai';
import Column from './Column';
import enzymeIntl from '../../services/test/enzymeWithProviders';


const mockProps = {
  column: { id: '1', name: 'test column name' },
  filteredAndSortedCardsByPhrase: [],
  filteredCards: [],
  retroStep: 'write',
  isOver: false,
  connectDropTarget: component => component,
  addCard: () => {},
  addMessage: () => {},
  addCardQuery: { status: 'notReady' },
  classes: {
    column: 'column',
    columnTitle: 'columnTitle',
    addCardIcon: 'addCardIcon',
    addCardContainer: 'addCardContainer'
  }
};

// Ugly mocks because react-dnd TestBackend doesn't work...

export const dragAndDropManager = {
  getMonitor: () => ({
    subscribeToStateChange: () => {},
    isOverTarget: () => {},
    didDrop: () => {},
    getDropResult: () => {},
    isDraggingSource: () => {}
  }),
  getBackend: () => {},
  getRegistry: () => ({
    addTarget: () => {},
    removeTarget: () => {},
    addSource: () => {},
    removeSource: () => {}
  })
};

const mockContext = {
  socket: {},
  dragDropManager: { ...dragAndDropManager },
  store: configureMockStore()({
    user: {},
    retro: {
      cards: [],
      join: {
        status: ''
      }
    }
  })
};


const childContextTypes = {
  socket: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  dragDropManager: PropTypes.object.isRequired
};

const OriginalColumn = Column.DecoratedComponent;

const getWrapper = props => enzymeIntl.mount(
  <BrowserRouter>
    <OriginalColumn {...props} isOpen />
  </BrowserRouter>, { context: mockContext, childContextTypes }
);

describe(`${Column.name} component`, () => {
  it('renders column name', () => {
    expect(getWrapper(mockProps).html().indexOf('test column name') >= 0).to.equal(true);
  });

  it('display sort button on vote screen', () => {
    expect(getWrapper(Object.assign(mockProps, { retroStep: 'vote' }))
      .contains(<Sort className="MuiIconButton-icon-32" />)).to.equal(true);
  });

  it('hide sort button on write screen', () => {
    expect(getWrapper(Object.assign(mockProps, { retroStep: 'write' }))
      .contains(<Sort className="MuiIconButton-icon-32" />)).to.equal(false);
  });
});
