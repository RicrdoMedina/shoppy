export interface Product {
  id: string;
  name: string;
  images: Array<string>;
  currency: string;
  unit_amount: number;
  priceId: string;
}

export interface ProductCheckout {
  price: string;
  quantity: number;
}
