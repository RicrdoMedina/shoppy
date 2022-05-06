import UserRepository from '../UserRepository';
import { UserSignUp } from '../User';
import { ApiErrorsInterface } from '@core/features/types/';

export default class SignUpUseCase {
  userRepository: UserRepository;
  constructor({ UserRepository }: { UserRepository: UserRepository }) {
    this.userRepository = UserRepository;
  }

  async execute(user: UserSignUp): Promise<ApiErrorsInterface> {
    return this.userRepository.signUp(user);
  }
}
