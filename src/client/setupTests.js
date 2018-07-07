import 'jest-enzyme';

require('css.escape');
const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

jest.mock('material-ui/Tooltip')

window.localStorage = {
  setItem: () => {
  },
  getItem: () => {
  }
};
