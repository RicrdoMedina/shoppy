import UserRepository from '../UserRepository';
import { User, UserDisconnected } from '../User';
export default class SignOutUseCase {
  userRepository: UserRepository;

  constructor({ UserRepository }: { UserRepository: UserRepository }) {
    this.userRepository = UserRepository;
  }

  async execute(user: User): Promise<UserDisconnected> {
    return this.userRepository.signOut(user);
  }
}
