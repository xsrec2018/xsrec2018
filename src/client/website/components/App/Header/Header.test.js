import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import configureMockStore from 'redux-mock-store';
import Countdown from 'react-countdown-now';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';
import Header from './Header';
import enzymeIntl from '../../../services/test/enzymeWithProviders';
import { dragAndDropManager } from '../../Retro/Column.test';

const mockProps = {
  leaveRetro: () => { },
  openRetroTimerDialog: () => {},
  timerActivated: true,
  deadline: moment().format('YYYY-MM-DD HH:mm'),
  classes: {
    headline: 'headline',
    appBar: 'appBar',
    actionButtons: 'actionButtons',
    appLogo: 'appLogo',
    logoIcon: 'logoIcon',
    icon: 'icon'
  },
  openChangeNameDialog: () => {}
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

describe(`${Header.name} component`, () => {
  it('renders without crashing', () => {
    const wrapper = enzymeIntl.mount(
      <BrowserRouter>
        <Header {...mockProps} isOpen>
          <div className="test">Test</div>
        </Header>
      </BrowserRouter>,
      { context: mockContext, childContextTypes }
    );

    expect(wrapper.find('.test')).to.have.length(1);
  });

  it('not display timer', () => {
    const wrapper = enzymeIntl.mount(
      <BrowserRouter>
        <Header {...mockProps} isOpen>
          <div className="test">Test</div>
        </Header>
      </BrowserRouter>,
      { context: mockContext, childContextTypes }
    );

    expect(wrapper.find(Countdown)).to.have.length(1);
  });

  it('display timer', () => {
    const wrapper = enzymeIntl.mount(
      <BrowserRouter>
        <Header {...Object.assign(mockProps, { timerActivated: false })} isOpen>
          <div className="test">Test</div>
        </Header>
      </BrowserRouter>,
      { context: mockContext, childContextTypes }
    );

    expect(wrapper.find(Countdown)).to.have.length(0);
  });

  it('not display timer when retro was finished', () => {
    const wrapper = enzymeIntl.mount(
      <BrowserRouter>
        <Header {...Object.assign(mockProps, { timerActivated: true, retroStep: 'closed' })} isOpen>
          <div className="test">Test</div>
        </Header>
      </BrowserRouter>,
      { context: mockContext, childContextTypes }
    );

    expect(wrapper.find(Countdown)).to.have.length(0);
  });
});
