import UserRepository from '../UserRepository';
import { User } from '../User';

export default class GetCredentialsUseCase {
  userRepository: UserRepository;

  constructor({ UserRepository }: { UserRepository: UserRepository }) {
    this.userRepository = UserRepository;
  }

  async execute(): Promise<User> {
    return this.userRepository.getCredentials();
  }
}
