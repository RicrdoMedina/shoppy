import { User, UserDisconnected } from '../domain/User';
import { ApiErrorsInterface } from '@core/features/types/';

export interface SignInUserState {
  kind: 'SignInUserState';
  user: UserDisconnected;
}

export interface LoadingUserState {
  kind: 'LoadingUserState';
}

export interface CredentialsUserState {
  kind: 'CredentialsUserState';
  user: User;
}

export interface SignedUserState {
  kind: 'SignedUserState';
  user: User;
}

export interface ErrorUserState {
  kind: 'ErrorUserState';
  user: UserDisconnected;
}

export interface CommonUserState {
  error: ApiErrorsInterface;
}

export type UserState = (
  | SignInUserState
  | LoadingUserState
  | SignedUserState
  | CredentialsUserState
  | ErrorUserState
) &
  CommonUserState;

export const userInitialState: UserState = {
  kind: 'SignInUserState',
  error: {
    field: '',
    message: '',
    showMessage: 'NONE'
  },
  user: {
    isSigned: false
  }
};
