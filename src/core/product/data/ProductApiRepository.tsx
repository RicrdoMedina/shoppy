import ProductRepository from '../domain/ProductRepository';
import { Product } from '../domain/Product';
import Http from '@core/services/Http';

export default class ProductApiRepository implements ProductRepository {
  http: Http;

  constructor({ Http }: { Http: Http }) {
    this.http = Http;
  }

  get(filter: string): Promise<Array<Product>> {
    return new Promise((resolve, reject) => {
      this.http
        .get('/stripe')
        .then(response => {
          const { data } = response.getData();
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
