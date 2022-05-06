import Http from '@core/services/Http';
import Cart from '../domain/Cart';
import CartRepository from '../domain/CartRepository';

export default class CartApiRepository implements CartRepository {
  cart: Cart;
  http: Http;

  constructor({ Http, Cart }: { Http: Http; Cart: Cart }) {
    this.http = Http;
    this.cart = Cart;
  }

  getCart(): Promise<Cart> {
    return new Promise((resolve, reject) => {
      this.http
        .get('/cart')
        .then(response => {
          const { data } = response.getData();

          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  save(cart: Cart): Promise<Cart> {
    return new Promise((resolve, reject) => {
      this.http
        .post('/cart', {
          cart
        })
        .then(response => {
          const { data: id } = response.getData();
          cart.id = id;

          resolve(cart);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  update(cart: Cart): Promise<Cart> {
    return new Promise((resolve, reject) => {
      this.http
        .patch('/cart', {
          cart
        })
        .then(response => {
          const { data: id } = response.getData();
          cart.id = id;

          resolve(cart);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  paid(cartId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .post('/cart/paid', {
          cartId
        })
        .then(response => {
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  createCheckoutSesion(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http
        .post('/stripe/create-checkout-session', {})
        .then(response => {
          const { sessionId } = response.getData();
          resolve(sessionId);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
