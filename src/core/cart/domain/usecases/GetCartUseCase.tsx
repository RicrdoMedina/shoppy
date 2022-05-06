import CartRepository from '../CartRepository';
import Cart from '../Cart';

export default class GetCartUseCase {
  cartRepository: CartRepository;

  constructor({ CartRepository }: { CartRepository: CartRepository }) {
    this.cartRepository = CartRepository;
  }

  getCart(): Promise<Cart> {
    return this.cartRepository.getCart();
  }
}
