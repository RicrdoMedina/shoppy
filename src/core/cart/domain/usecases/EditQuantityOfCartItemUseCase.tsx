import CartRepository from '../CartRepository';
import Cart from '../Cart';

export default class EditQuantityOfCartItemUseCase {
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

  async execute(itemId: string, quantity: number): Promise<Cart> {
    
    const editedCart = this.cart.editItem(itemId, quantity);

    await this.cartRepository.update(editedCart);
    
    return editedCart;
  }
}
