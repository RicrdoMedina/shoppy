// tslint:disable: no-any
export default class NumberHandlerUtils {
  static toUsd(price: number) {
    const priceFloat: any = (price / 100).toFixed(2);
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(priceFloat);
  }
}
