import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({ selector: 'app-product-list', imports: [LoadingSpinnerComponent, ProductCardComponent], templateUrl: './product-list.component.html', styleUrl: './product-list.component.scss' })
export class ProductListComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  readonly products = signal<Product[]>([]);
  readonly categories = signal<string[]>([]);
  readonly selectedCategory = signal('all');
  readonly loading = signal(true);
  readonly error = signal('');
  readonly filteredProducts = computed(() => this.selectedCategory() === 'all' ? this.products() : this.products().filter(product => product.category === this.selectedCategory()));

  ngOnInit(): void { this.loadProducts(); this.loadCategories(); }
  addToCart(product: Product): void { this.cartService.add(product); }
  setCategory(category: string): void { this.selectedCategory.set(category); }
  retry(): void { this.loadProducts(); }

  private loadProducts(): void {
    this.loading.set(true); this.error.set('');
    this.productService.getProducts().pipe(finalize(() => this.loading.set(false))).subscribe({
      next: products => this.products.set(products),
      error: () => this.error.set('We could not load the products. Please try again.')
    });
  }
  private loadCategories(): void {
    this.productService.getCategories().subscribe({ next: categories => this.categories.set(categories), error: () => this.categories.set([]) });
  }
}
