import { Product } from './Product';
import Http from '@core/services/Http';
export default interface ProductRepository {
  http: Http;
  get(filter: string): Promise<Array<Product>>;
}
