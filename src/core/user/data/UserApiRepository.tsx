import { User, UserSignUp, UserSign, UserDisconnected } from '../domain/User';
import UserRepository from '../domain/UserRepository';
import Http from '@core/services/Http';
import { ApiErrorsInterface } from '@core/features/types/';

export default class UserApiRepository implements UserRepository {
  http: Http;

  constructor({ Http }: { Http: Http }) {
    this.http = Http;
  }

  getCredentials(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http
        .post('user/getUserByToken')
        .then(response => {
          const { data } = response.getData();
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  signIn(user: UserSign): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          'auth/signIn',
          {},
          {
            auth: {
              username: user.username,
              password: user.password
            }
          }
        )
        .then(response => {
          const { user } = response.getData();
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  signUp(user: UserSignUp): Promise<ApiErrorsInterface> {
    return new Promise((resolve, reject) => {
      this.http
        .post('auth/signUp', user)
        .then(response => {
          response.statusIs200()
            ? resolve({
                message: 'El usuario ya esta registrado',
                showMessage: 'ERROR',
                field: ''
              })
            : resolve({
                message: 'El usuario se registro con exito',
                showMessage: 'SUCCESS',
                field: ''
              });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  signOut(user: User): Promise<UserDisconnected> {
    return new Promise((resolve, reject) => {
      this.http
        .post('auth/signOut', user)
        .then(response => {
          const data = response.getData();
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
