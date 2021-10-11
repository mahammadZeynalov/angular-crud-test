import * as fromProducts from '../store/products.reducers';

export interface AppState {
  products: fromProducts.State;
}
