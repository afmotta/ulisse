import { KEY } from './reducer';
import * as selectors from './selectors';

const state = {
  [KEY]: {
    isAuthenticated: true,
    authData: {
      isAnonymous: true,
      uid: 'uid',
      emailVerified: true,
      email: 'email@email.com',
    },
  },
};

describe('auth-store-base selectors', () => {
  describe('getIsAuthenticated', () => {
    it('returns isAuthenticated value', () => {
      expect(selectors.getIsAuthenticated(state)).toBe(true);
    });
  });
  describe('getIsAnonymous', () => {
    it('returns isAnonymous value', () => {
      expect(selectors.getIsAnonymous(state)).toBe(true);
    });
  });
  describe('getUid', () => {
    it('returns uid string', () => {
      expect(selectors.getUid(state)).toBe('uid');
    });
  });
  describe('getEmail', () => {
    it('returns email string', () => {
      expect(selectors.getEmail(state)).toBe('email@email.com');
    });
  });
  describe('getEmailVerified', () => {
    it('returns emailVerified value', () => {
      expect(selectors.getEmailVerified(state)).toBe(true);
    });
  });
});
