import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productActions from './products.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductsService } from '../services/products.service';
import {
  AddProduct,
  AddProductError,
  AddProductSuccess,
  GetAllProductsError,
  GetAllProductsSuccess,
  RemoveProduct,
  RemoveProductError,
  RemoveProductSuccess,
  UpdateProduct,
  UpdateProductError,
  UpdateProductSuccess,
} from './products.actions';
import { Product } from '../models/product/product.model';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  getAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.GET_PRODUCTS),
      switchMap(() => this.productsService.findAll()),
      map((products) => new GetAllProductsSuccess(products)),
      catchError((err) => [new GetAllProductsError(err)])
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.CREATE_PRODUCT),
      map((action: AddProduct) => action.payload),
      switchMap((newProduct) => this.productsService.insert(newProduct)),
      map((response) => new AddProductSuccess(response.id)),
      catchError((err) => [new AddProductError(err)])
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.UPDATE_PRODUCT),
      map((action: UpdateProduct) => action.payload),
      switchMap((product) => this.productsService.update(product)),
      map(() => new UpdateProductSuccess()),
      catchError((err) => [new UpdateProductError(err)])
    )
  );

  removeProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.DELETE_PRODUCT),
      map((action: RemoveProduct) => action.payload),
      switchMap((id) => this.productsService.delete(id)),
      map((product: Product) => new RemoveProductSuccess(product)),
      catchError((err) => [new RemoveProductError(err)])
    )
  );
}
