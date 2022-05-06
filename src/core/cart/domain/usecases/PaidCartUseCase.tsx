import CartRepository from '../CartRepository';
import Cart from '../Cart';

export default class PaidCartCartUseCase {
  cartRepository: CartRepository;
  cart: Cart;

  constructor({
    CartRepository,
    Cart
  }: {
    CartRepository: CartRepository;
    Cart: Cart;
  }) {
    this.cartRepository = CartRepository;
    this.cart = Cart;
  }

  async execute(): Promise<boolean> {
    const userCart = await this.cartRepository.getCart();

    const paidCart = await this.cartRepository.paid(userCart.id);

    return paidCart;
  }
}
