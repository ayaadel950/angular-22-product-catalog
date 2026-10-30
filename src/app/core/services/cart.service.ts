import { computed, Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsState = signal<CartItem[]>([]);
  readonly items = this.itemsState.asReadonly();
  readonly itemCount = computed(() => this.itemsState().reduce((sum, item) => sum + item.quantity, 0));
  readonly total = computed(() => this.itemsState().reduce((sum, item) => sum + item.product.price * item.quantity, 0));

  add(product: Product): void {
    this.itemsState.update(items => {
      const existing = items.find(item => item.product.id === product.id);
      return existing
        ? items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { product, quantity: 1 }];
    });
  }

  remove(productId: number): void { this.itemsState.update(items => items.filter(item => item.product.id !== productId)); }
  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) { this.remove(productId); return; }
    this.itemsState.update(items => items.map(item => item.product.id === productId ? { ...item, quantity } : item));
  }
  clear(): void { this.itemsState.set([]); }
}
