import reducer, { initialState } from './reducer';

describe('user reducer', () => {
  it('sets user', () => {
    expect(
      reducer(initialState, {
        type: 'AUTH/UPDATE_AUTH/SUCCESS',
        payload: {
          isAnonymous: false,
          uid: 'uid',
          email: 'email',
          emailVerified: false,
        },
      }),
    ).toEqual({
      isAuthenticated: true,
      authData: {
        isAnonymous: false,
        uid: 'uid',
        email: 'email',
        emailVerified: false,
      },
    });
  });
  it('resets user', () => {
    expect(
      reducer(
        {
          isAuthenticated: true,
          authData: {
            isAnonymous: false,
            uid: 'uid',
            email: 'email',
            emailVerified: false,
          },
        },
        {
          type: 'AUTH/UPDATE_AUTH/FAILURE',
          payload: new Error(),
          error: true,
        },
      ),
    ).toEqual(initialState);
  });
});
