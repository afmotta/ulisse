import { DeepReadonly } from 'utility-types';

export type AuthData = {
  isAnonymous: boolean;
  uid: string;
  email: string;
  emailVerified: boolean;
};

export type AuthState = DeepReadonly<{
  isAuthenticated: boolean;
  authData: AuthData;
}>;
