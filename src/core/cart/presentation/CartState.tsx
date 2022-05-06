export interface CommonCartState {
  open: boolean;
  id: string;
  items: Array<CartItemState>;
  totalItems: number;
}

export interface LoadingCartState {
  kind: 'LoadingCartState';
  totalItems: number;
}
export interface UpdatedCartState {
  kind: 'UpdatedCartState';
  id: string;
  items: Array<CartItemState>;
  totalPrice: number;
  totalItems: number;
}
export interface ErrorCartState {
  kind: 'ErrorCartState';
  error: string;
}

export type CartState = (LoadingCartState | UpdatedCartState | ErrorCartState) &
  CommonCartState;

export interface CartItemState {
  id: string;
  name: string;
  images: Array<string>;
  currency: string;
  unit_amount: number;
  quantity: number;
  priceId: string;
}

export const cartInitialState: CartState = {
  kind: 'LoadingCartState',
  id: '',
  open: false,
  items: [],
  totalItems: 0
};
