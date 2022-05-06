import UserRepository from '../UserRepository';
import { UserSign, User } from '../User';

export default class SignInUseCase {
  userRepository: UserRepository;

  constructor({ UserRepository }: { UserRepository: UserRepository }) {
    this.userRepository = UserRepository;
  }

  async execute(user: UserSign): Promise<User> {
    return this.userRepository.signIn(user);
  }
}
