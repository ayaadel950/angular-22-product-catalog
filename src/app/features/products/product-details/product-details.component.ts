import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({ selector: 'app-product-details', imports: [CurrencyPipe, RouterLink, LoadingSpinnerComponent], templateUrl: './product-details.component.html', styleUrl: './product-details.component.scss' })
export class ProductDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute); private readonly products = inject(ProductService); private readonly cart = inject(CartService);
  readonly product = signal<Product | null>(null); readonly loading = signal(true); readonly error = signal('');
  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(params => this.products.getProduct(Number(params.get('id')))), finalize(() => this.loading.set(false))).subscribe({
      next: product => product?.id ? this.product.set(product) : this.error.set('Product not found.'),
      error: () => this.error.set('Product not found or could not be loaded.')
    });
  }
  addToCart(product: Product): void { this.cart.add(product); }
}
