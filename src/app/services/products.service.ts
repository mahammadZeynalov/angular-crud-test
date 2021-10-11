import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  protected URL = 'http://localhost:3000/api/products';

  constructor(protected http: HttpClient) {}

  public findById(id: number | string): Observable<Product> {
    return this.http.get<Product>(this.URL + '/' + id);
  }

  public findAll(params?): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL, { params });
  }

  public delete(id: number | string): Observable<Product> {
    return this.http.delete<Product>(this.URL + '/' + id);
  }

  public insert(data: Product): Observable<Product> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Product>(this.URL, data, { headers });
  }

  public update(product: Product): Observable<Product> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Product>(this.URL, product, {
      headers,
    });
  }
}
