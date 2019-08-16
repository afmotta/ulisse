import { KEY } from './reducer';
import * as selectors from './selectors';

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
