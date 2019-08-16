import { createStandardAction } from 'typesafe-actions';
import { AuthData } from './types';

export const UPDATE_AUTH_SUCCESS = 'AUTH/UPDATE_AUTH/SUCCESS';
export const UPDATE_AUTH_FAILURE = 'AUTH/UPDATE_AUTH/FAILURE';

export const updateAuthSuccess = createStandardAction(UPDATE_AUTH_SUCCESS)<
  AuthData
>();

export const updateAuthFailure = createStandardAction(UPDATE_AUTH_FAILURE).map(
  (error: Error) => ({
    payload: error,
    error: true,
  }),
);
