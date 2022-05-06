import Cart from './Cart';
import Http from '@core/services/Http';

export default interface CartRepository {
  http: Http;
  getCart(): Promise<Cart>;
  save(cart: Cart): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
  paid(cartId: string): Promise<boolean>;
  createCheckoutSesion(): Promise<string>;
}
