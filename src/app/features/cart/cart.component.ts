import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
@Component({ selector: 'app-cart', imports: [CurrencyPipe, RouterLink], templateUrl: './cart.component.html', styleUrl: './cart.component.scss' })
export class CartComponent { readonly cart = inject(CartService); }
