import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  getProducts(): Observable<Product[]> { return this.http.get<Product[]>(this.apiUrl); }
  getProduct(id: number): Observable<Product> { return this.http.get<Product>(`${this.apiUrl}/${id}`); }
  getCategories(): Observable<string[]> { return this.http.get<string[]>(`${this.apiUrl}/categories`); }
}
