import { AppState, appInitialState } from './AppState';
import { Bloc } from '@core/bloc';
import { CartBloc } from '@core/cart/presentation/CartBloc';

export class AppBloc extends Bloc<AppState> {
  cartBloc: CartBloc;

  constructor({ CartBloc }: { CartBloc: CartBloc }) {
    super(appInitialState);
    this.cartBloc = CartBloc;
  }

  async initializeApp() {
    try {
      this.cartBloc.getCart();
    } catch (error) {
      return error;
    }
  }
}
