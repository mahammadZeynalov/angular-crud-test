import { Action } from '@ngrx/store';
import { Product } from '../models/product/product.model';

export const GET_PRODUCTS = '[ALL] Products';
export const GET_PRODUCTS_SUCCESS = '[ALL] Products Success';
export const GET_PRODUCTS_ERROR = '[ALL] Products Error';

export const CREATE_PRODUCT = '[CREATE] Product';
export const CREATE_PRODUCT_SUCCESS = '[CREATE] Product Success';
export const CREATE_PRODUCT_ERROR = '[CREATE] Product Error';

export const DELETE_PRODUCT = '[DELETE] Product';
export const DELETE_PRODUCT_SUCCESS = '[DELETE] Product Success';
export const DELETE_PRODUCT_ERROR = '[DELETE] Product Error';

export const UPDATE_PRODUCT = '[UPDATE] Product';
export const UPDATE_PRODUCT_SUCCESS = '[UPDATE] Product Success';
export const UPDATE_PRODUCT_ERROR = '[UPDATE] Product Error';

/****************************************
 * GET all the products
 ****************************************/
export class GetAllProducts implements Action {
  readonly type = GET_PRODUCTS;
}

export class GetAllProductsSuccess implements Action {
  readonly type = GET_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {}
}

export class GetAllProductsError implements Action {
  readonly type = GET_PRODUCTS_ERROR;

  constructor(public payload: Error) {}
}

/****************************************
 * ADD new product
 ****************************************/
export class AddProduct implements Action {
  readonly type = CREATE_PRODUCT;

  constructor(public payload: Product) {}
}

export class AddProductSuccess implements Action {
  readonly type = CREATE_PRODUCT_SUCCESS;

  constructor(public payload: number) {}
}

export class AddProductError implements Action {
  readonly type = CREATE_PRODUCT_ERROR;

  constructor(public payload: Error) {}
}

/****************************************
 * REMOVE a product by id
 ****************************************/
export class RemoveProduct implements Action {
  readonly type = DELETE_PRODUCT;

  constructor(public payload: number) {}
}

export class RemoveProductSuccess implements Action {
  readonly type = DELETE_PRODUCT_SUCCESS;

  constructor(public payload: Product) {}
}

export class RemoveProductError implements Action {
  readonly type = DELETE_PRODUCT_ERROR;

  constructor(public payload: Error) {}
}

/****************************************
 * UPDATE product by id
 ****************************************/
export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;

  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = UPDATE_PRODUCT_SUCCESS;
}

export class UpdateProductError implements Action {
  readonly type = UPDATE_PRODUCT_ERROR;

  constructor(public payload: Error) {}
}
