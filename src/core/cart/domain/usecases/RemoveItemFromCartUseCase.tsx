import CartRepository from '../CartRepository';
import Cart from '../Cart';

export default class RemoveItemFromCartUseCase {
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

  async execute(itemId: string): Promise<Cart> {
    const editedCart = this.cart.removeItem(itemId);

    await this.cartRepository.update(editedCart);

    return editedCart;
  }
}
