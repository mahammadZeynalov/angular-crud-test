import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './models/product/product.model';

export class AppInMemoryApi implements InMemoryDbService {
  createDb() {
    const products: Product[] = [
      {
        id: 1,
        name: 'Sofa',
        madeInCountry: 'China',
        price: 500,
        isInStock: true,
        createdDate: new Date(),
        modifiedDate: new Date(),
      },
      {
        id: 2,
        name: 'Chair',
        madeInCountry: 'Germany',
        price: 1000,
        isInStock: false,
        createdDate: new Date(),
        modifiedDate: new Date(),
      },
    ];
    console.log(products);
    return {
      products,
    };
  }
}
