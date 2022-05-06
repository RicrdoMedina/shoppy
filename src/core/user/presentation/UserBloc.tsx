import { UserSign, UserSignUp, User } from '../domain/User';
import SignInUseCase from '../domain/usecases/SignInUseCase';
import SignUpUseCase from '../domain/usecases/SignUpUseCase';
import SignOutUseCase from '../domain/usecases/SignOutUseCase';
import GetCredentialsUserCase from '../domain/usecases/GetCredentialsUserCase';
import { HistoryHandlerUtils } from '@core/utils/';
import { UserState, userInitialState } from '../presentation/UserState';
import { Bloc } from '@core/bloc';
import { AppBloc } from '@core/app/AppBloc';
import { ApiErrorsInterface } from '@core/features/types/';
export class UserBloc extends Bloc<UserState> {
  signInUseCase: SignInUseCase;
  signUpUseCase: SignUpUseCase;
  signOutUseCase: SignOutUseCase;
  getCredentialsUseCase: GetCredentialsUserCase;
  appBloc: AppBloc;
  history: HistoryHandlerUtils;
  stateDefaultError: ApiErrorsInterface;

  constructor({
    SignInUseCase,
    SignUpUseCase,
    SignOutUseCase,
    GetCredentialsUserCase,
    AppBloc,
    HistoryHandlerUtils
  }: {
    SignInUseCase: SignInUseCase;
    SignUpUseCase: SignUpUseCase;
    SignOutUseCase: SignOutUseCase;
    GetCredentialsUserCase: GetCredentialsUserCase;
    AppBloc: AppBloc;
    HistoryHandlerUtils: HistoryHandlerUtils;
  }) {
    super(userInitialState);

    this.signInUseCase = SignInUseCase;
    this.signUpUseCase = SignUpUseCase;
    this.signOutUseCase = SignOutUseCase;
    this.getCredentialsUseCase = GetCredentialsUserCase;
    this.appBloc = AppBloc;
    this.history = HistoryHandlerUtils;
    this.stateDefaultError = {
      field: '',
      message: '',
      showMessage: 'NONE'
    };
  }

  initializeApp() {
    this.appBloc.initializeApp();
  }

  async getCredentials() {
    try {
      const user = await this.getCredentialsUseCase.execute();
      this.handleSignedUserState(user);
      return user;
    } catch (error) {
      return error;
    }
  }

  signIn(user: UserSign) {
    this.changeState({
      kind: 'LoadingUserState',
      error: this.stateDefaultError
    });

    this.signInUseCase
      .execute(user)
      .then(user => {
        this.handleSignedUserState(user);
      })
      .catch(error => {
        this.changeState({
          kind: 'ErrorUserState',
          user: {
            isSigned: false
          },
          error
        });
      });
  }

  handleSignedUserState(user: User) {
    this.changeState({
      // tslint:disable-line
      kind: 'SignedUserState',
      user: user,
      error: this.stateDefaultError
    });
    this.initializeApp();
  }

  signUp(user: UserSignUp) {
    this.changeState({
      kind: 'LoadingUserState',
      error: this.stateDefaultError
    });

    this.signUpUseCase
      .execute(user)
      .then(res => {
        this.changeState({
          kind: 'SignInUserState',
          user: {
            isSigned: false
          },
          error: res
        });
      })
      .catch(error => {
        this.changeState({
          kind: 'ErrorUserState',
          user: {
            isSigned: false
          },
          error
        });
      });
  }

  forceSignOut() {
    this.changeState({
      kind: 'SignInUserState',
      user: {
        isSigned: false
      },
      error: this.stateDefaultError
    });
  }

  signOut(user: User) {
    this.signOutUseCase
      .execute(user)
      .then(() => {
        this.changeState({
          kind: 'SignInUserState',
          user: {
            isSigned: false
          },
          error: this.stateDefaultError
        });
        this.history.push('/');
      })
      .catch(error =>
        this.changeState({
          kind: 'ErrorUserState',
          user: {
            isSigned: false
          },
          error
        })
      );
  }
}
