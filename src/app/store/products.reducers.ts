import * as productsAction from './products.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../models/product/product.model';
import { AppAction } from '../models/app/app.model';

export interface State {
  data: Product[];
  selected: Product;
  action: string;
  done: boolean;
  error?: string;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null,
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
    /*************************
     * GET all products actions
     ************************/
    case productsAction.GET_PRODUCTS:
      return {
        ...state,
        action: productsAction.GET_PRODUCTS,
        done: false,
        selected: null,
        error: null,
      };
    case productsAction.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null,
      };
    case productsAction.GET_PRODUCTS_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload,
      };

    /*************************
     * CREATE product actions
     ************************/
    case productsAction.CREATE_PRODUCT:
      return {
        ...state,
        selected: action.payload,
        action: productsAction.CREATE_PRODUCT,
        done: false,
        error: null,
      };
    case productsAction.CREATE_PRODUCT_SUCCESS: {
      const newProduct = {
        ...state.selected,
        id: action.payload,
      };
      const data = [...state.data, newProduct];
      return {
        ...state,
        data,
        selected: null,
        error: null,
        done: true,
      };
    }
    case productsAction.CREATE_PRODUCT_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: 'Error while creating the product',
      };

    /*************************
     * UPDATE product actions
     ************************/
    case productsAction.UPDATE_PRODUCT:
      return {
        ...state,
        selected: action.payload,
        action: productsAction.UPDATE_PRODUCT,
        done: false,
        error: null,
      };
    case productsAction.UPDATE_PRODUCT_SUCCESS: {
      const index = state.data.findIndex((h) => h.id === state.selected.id);
      if (index >= 0) {
        const data = [
          ...state.data.slice(0, index),
          state.selected,
          ...state.data.slice(index + 1),
        ];
        return {
          ...state,
          data,
          done: true,
          selected: null,
          error: null,
        };
      }
      return state;
    }
    case productsAction.UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: 'Error while updating the product',
      };

    /*************************
     * DELETE product actions
     ************************/
    case productsAction.DELETE_PRODUCT: {
      const selected = state.data.find((h) => h.id === action.payload);
      return {
        ...state,
        selected,
        action: productsAction.DELETE_PRODUCT,
        done: false,
        error: null,
      };
    }
    case productsAction.DELETE_PRODUCT_SUCCESS: {
      const data = state.data.filter((h) => h.id !== state.selected.id);
      return {
        ...state,
        data,
        selected: null,
        error: null,
        done: true,
      };
    }
    case productsAction.DELETE_PRODUCT_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: 'Error while deleting the product',
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/

export const getProductsState = createFeatureSelector<State>('products');
export const isDone = createSelector(getProductsState, (state: State) => {
  return state.done;
});

export const errorMessage = createSelector(getProductsState, (state: State) => {
  return state.error;
});

export const getAllProducts = createSelector(
  getProductsState,
  (state: State) => state.data
);

export const isDeleted = createSelector(
  getProductsState,
  (state: State) =>
    state.action === productsAction.DELETE_PRODUCT && state.done && !state.error
);
export const isCreated = createSelector(
  getProductsState,
  (state: State) =>
    state.action === productsAction.CREATE_PRODUCT && state.done && !state.error
);
export const isUpdated = createSelector(
  getProductsState,
  (state: State) =>
    state.action === productsAction.UPDATE_PRODUCT && state.done && !state.error
);

export const getDeleteError = createSelector(
  getProductsState,
  (state: State) => {
    return state.action === productsAction.DELETE_PRODUCT ? state.error : null;
  }
);
export const getCreateError = createSelector(
  getProductsState,
  (state: State) => {
    return state.action === productsAction.CREATE_PRODUCT ? state.error : null;
  }
);
export const getUpdateError = createSelector(
  getProductsState,
  (state: State) => {
    return state.action === productsAction.UPDATE_PRODUCT ? state.error : null;
  }
);
export const getProductsError = createSelector(
  getProductsState,
  (state: State) => {
    return state.action === productsAction.GET_PRODUCTS ? state.error : null;
  }
);
