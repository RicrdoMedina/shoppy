import { UserSign, UserSignUp, User, UserDisconnected } from './User';
import Http from '@core/services/Http';
import { ApiErrorsInterface } from '@core/features/types/';

export default interface UserRepository {
  http: Http;
  signIn(user: UserSign): Promise<User>;
  signUp(user: UserSignUp): Promise<ApiErrorsInterface>;
  signOut(user: User): Promise<UserDisconnected>;
  getCredentials(): Promise<User>;
}
