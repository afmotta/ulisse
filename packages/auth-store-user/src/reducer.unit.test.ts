import { SYNC_USER_DATA, CLEAR_USER_DATA } from './actions';
import reducer, { initialState } from './reducer';

describe('user reducer', () => {
  it('sets user', () => {
    expect(
      reducer(initialState, {
        type: SYNC_USER_DATA,
        payload: {
          foo: 'bar',
        },
      }),
    ).toEqual({
      userData: {
        foo: 'bar',
      },
    });
  });
  it('resets user', () => {
    expect(
      reducer({ userData: { foo: 'bar' } }, { type: CLEAR_USER_DATA }),
    ).toEqual(initialState);
  });
});
