import CartRepository from '../CartRepository';
import Cart from '../Cart';
import { Product } from '../../../product/domain/Product';

export default class UpdateProductToCartUseCase {
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

  async execute(product: Product): Promise<Cart> {
    const cartItem = {
      id: product.id,
      name: product.name,
      images: product.images,
      currency: product.currency,
      unit_amount: product.unit_amount,
      priceId: product.priceId,
      quantity: 1
    };

    const formattedCart = this.cart.addItem(cartItem);

    const editedCart = await this.cartRepository.update(formattedCart);

    return editedCart;
  }
}
