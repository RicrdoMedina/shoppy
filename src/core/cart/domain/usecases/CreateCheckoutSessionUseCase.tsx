import CartRepository from '../CartRepository';
import Cart from '../Cart';

export default class CreateCheckoutSessionUseCase {
  cartRepository: CartRepository;
  cart: Cart;

  constructor({ CartRepository, Cart }: { CartRepository: CartRepository, Cart: Cart }) {
    this.cartRepository = CartRepository;
    this.cart = Cart;
  }

  async execute(): Promise<string> {
    
    return this.cartRepository.createCheckoutSesion();
  }
}
