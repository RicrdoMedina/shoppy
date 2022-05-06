import ProductRepository from './ProductRepository';
import { Product } from './Product';

export default class GetProductsUseCase {
  productRepository: ProductRepository;

  constructor({ ProductRepository }: { ProductRepository: ProductRepository }) {
    this.productRepository = ProductRepository;
  }

  execute(filter: string): Promise<Array<Product>> {
    return this.productRepository.get(filter);
  }
}
