import * as selectors from './selectors';
import { KEY } from './reducer';

const state = {
  [KEY]: {
    userData: {
      foo: 'bar',
    },
  },
};

describe('auth-store-user selectors', () => {
  describe('getUserData', () => {
    it('returns userData value', () => {
      expect(selectors.getUserData(state)).toEqual({ foo: 'bar' });
    });
  });
});
