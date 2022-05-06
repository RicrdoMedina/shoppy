import CartItem from './CartItem';

export default class Cart {
  items: CartItem[];
  id: string;
  totalPrice: number;
  totalItems: number;

  init(items: CartItem[]) {
    this.items = items;
    this.totalPrice = this.calculateTotalPrice(items);
    this.totalItems = this.calculateTotalItems(items);

    return this;
  }

  setId(id: string) {
    this.id = id;

    return this;
  }

  addItem(item: CartItem): Cart {
    let newItems = [];
    const existedItem = this.items.find(i => i.id === item.id);

    if (existedItem) {
      newItems = this.items.map(oldItem => {
        if (oldItem.id === item.id) {
          return { ...oldItem, quantity: oldItem.quantity + item.quantity };
        } else {
          return oldItem;
        }
      });
    } else {
      newItems = [...this.items, item];
    }

    this.totalPrice = this.calculateTotalPrice(newItems);
    this.totalItems = this.calculateTotalItems(newItems);
    this.items = newItems;

    return this;
  }

  removeItem(itemId: string): Cart {
    const newItems = this.items.filter(i => i.id !== itemId);

    this.totalPrice = this.calculateTotalPrice(newItems);
    this.totalItems = this.calculateTotalItems(newItems);
    this.items = newItems;

    return this;
  }

  editItem(itemId: string, quantity: number): Cart {
    const newItems = this.items.map(oldItem => {
      if (oldItem.id === itemId) {
        return { ...oldItem, quantity: quantity };
      } else {
        return oldItem;
      }
    });

    this.totalPrice = this.calculateTotalPrice(newItems);
    this.totalItems = this.calculateTotalItems(newItems);
    this.items = newItems;

    return this;
  }

  reset() {
    const items: CartItem[] = [];

    this.items = items;
    this.id = '';
    this.totalItems = 0;
    this.totalPrice = 0;
  }

  private calculateTotalPrice(items: CartItem[]): number {
    return +items
      .reduce(
        (accumulator, item) => accumulator + item.quantity * item.unit_amount,
        0
      )
      .toFixed(2);
  }

  private calculateTotalItems(items: CartItem[]): number {
    return +items.reduce((accumulator, item) => accumulator + item.quantity, 0);
  }
}
