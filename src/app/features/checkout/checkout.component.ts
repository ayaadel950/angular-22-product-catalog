import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
@Component({ selector: 'app-checkout', imports: [ReactiveFormsModule], templateUrl: './checkout.component.html' })
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder); private readonly cart = inject(CartService); readonly submitted = signal(false);
  readonly form = this.fb.nonNullable.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], address: ['', [Validators.required, Validators.minLength(5)]], quantity: [1, [Validators.required, Validators.min(1)]] });
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.cart.clear(); this.submitted.set(true); }
}
