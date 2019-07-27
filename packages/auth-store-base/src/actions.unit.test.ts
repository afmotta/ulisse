import * as actions from './actions';
import { User } from 'firebase';

describe('user actions', () => {
  describe('updateAuthSuccess', () => {
    it('returns an action', () => {
      expect(
        actions.updateAuthSuccess({
          isAnonymous: true,
          uid: 'asd',
          email: 'mail@mail.com',
          emailVerified: false,
        }),
      ).toEqual({
        type: 'AUTH/UPDATE_AUTH/SUCCESS',
        payload: {
          isAnonymous: true,
          uid: 'asd',
          email: 'mail@mail.com',
          emailVerified: false,
        },
      });
    });
  });
  describe('updateAuthFailure', () => {
    it('returns an action', () => {
      expect(actions.updateAuthFailure(new Error())).toEqual({
        type: 'AUTH/UPDATE_AUTH/FAILURE',
        payload: new Error(),
        error: true,
      });
    });
  });
});
