import Cart from '@core/cart/domain/Cart';
import { Product } from '@core/product/domain/Product';
import GetCartUseCase from '@core/cart/domain/usecases/GetCartUseCase';
import AddProductToCartUseCase from '@core/cart/domain/usecases/AddProductToCartUseCase';
import RemoveItemFromCartUseCase from '@core/cart/domain/usecases/RemoveItemFromCartUseCase';
import EditQuantityOfCartItemUseCase from '@core/cart/domain/usecases/EditQuantityOfCartItemUseCase';
import UpdateProductToCartUseCase from '@core/cart/domain/usecases/UpdateProductToCartUseCase';
import PaidCartUseCase from '@core/cart/domain/usecases/PaidCartUseCase';
import CreateCheckoutSession from '@core/cart/domain/usecases/CreateCheckoutSessionUseCase';

import {
  CartState,
  cartInitialState,
  CartItemState
} from '../presentation/CartState';
import { Bloc } from '@core/bloc';

export class CartBloc extends Bloc<CartState> {
  cart: Cart;
  getCartUseCase: GetCartUseCase;
  addProductToCartUseCase: AddProductToCartUseCase;
  removeItemFromCartUseCase: RemoveItemFromCartUseCase;
  editQuantityOfCartItemUseCase: EditQuantityOfCartItemUseCase;
  updateProductToCartUseCase: UpdateProductToCartUseCase;
  paidCartUseCase: PaidCartUseCase;
  createCheckoutSession: CreateCheckoutSession;

  constructor({
    GetCartUseCase,
    AddProductToCartUseCase,
    RemoveItemFromCartUseCase,
    EditQuantityOfCartItemUseCase,
    UpdateProductToCartUseCase,
    PaidCartUseCase,
    CreateCheckoutSession,
    Cart
  }: {
    GetCartUseCase: GetCartUseCase;
    AddProductToCartUseCase: AddProductToCartUseCase;
    RemoveItemFromCartUseCase: RemoveItemFromCartUseCase;
    EditQuantityOfCartItemUseCase: EditQuantityOfCartItemUseCase;
    UpdateProductToCartUseCase: UpdateProductToCartUseCase;
    PaidCartUseCase: PaidCartUseCase;
    CreateCheckoutSession: CreateCheckoutSession;
    Cart: Cart;
  }) {
    super(cartInitialState);

    this.getCartUseCase = GetCartUseCase;
    this.addProductToCartUseCase = AddProductToCartUseCase;
    this.removeItemFromCartUseCase = RemoveItemFromCartUseCase;
    this.editQuantityOfCartItemUseCase = EditQuantityOfCartItemUseCase;
    this.updateProductToCartUseCase = UpdateProductToCartUseCase;
    this.paidCartUseCase = PaidCartUseCase;
    this.createCheckoutSession = CreateCheckoutSession;
    this.cart = Cart;
  }

  getCart() {
    this.getCartUseCase.getCart().then(cart => {
      if (cart) {
        const { items, id } = cart;
        this.cart.init(items);
        this.cart.setId(id);

        this.changeState(this.mapToUpdatedState(cart));
      } else {
        this.changeState({
          kind: 'UpdatedCartState',
          open: false,
          id: '',
          totalItems: 0,
          totalPrice: 0,
          items: []
        });
      }
    });
  }

  closeCart() {
    this.changeState({ ...this.state, open: false });
  }

  openCart() {
    this.changeState({ ...this.state, open: true });
  }

  paidCart() {
    this.paidCartUseCase.execute().then(res => {
      this.cart.reset();
      this.changeState({
        kind: 'UpdatedCartState',
        open: false,
        id: this.cart.id,
        totalItems: this.cart.totalItems,
        totalPrice: this.cart.totalPrice,
        items: this.cart.items
      });
    });
  }

  removeCartItem(item: CartItemState) {
    this.removeItemFromCartUseCase
      .execute(item.id)
      .then(cart => this.changeState(this.mapToUpdatedState(cart)));
  }

  editQuantityCartItem(item: CartItemState, quantity: number) {
    this.editQuantityOfCartItemUseCase
      .execute(item.id, quantity)
      .then(cart => this.changeState(this.mapToUpdatedState(cart)));
  }

  updateProductToCart(product: Product) {
    this.updateProductToCartUseCase
      .execute(product)
      .then(cart => this.changeState(this.mapToUpdatedState(cart)));
  }

  addProductToCart(product: Product) {
    this.addProductToCartUseCase
      .execute(product)
      .then(cart => this.changeState(this.mapToUpdatedState(cart)));
  }

  async createCheckoutSesion(): Promise<string> {
    return this.createCheckoutSession.execute();
  }

  mapToUpdatedState(cart: Cart): CartState {
    return {
      kind: 'UpdatedCartState',
      open: this.state.open,
      id: cart.id,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
      items: cart.items.map(cartItem => {
        return {
          id: cartItem.id,
          images: cartItem.images,
          name: cartItem.name,
          currency: cartItem.currency,
          unit_amount: cartItem.unit_amount,
          quantity: cartItem.quantity,
          priceId: cartItem.priceId
        };
      })
    };
  }
}
