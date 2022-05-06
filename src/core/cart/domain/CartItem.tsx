export default interface CartItem {
  readonly id: string;
  readonly name: string;
  readonly images: Array<string>;
  readonly currency: string;
  readonly unit_amount: number;
  readonly quantity: number;
  readonly priceId: string;
}
