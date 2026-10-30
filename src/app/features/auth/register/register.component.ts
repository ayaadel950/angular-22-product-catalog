import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({ selector: 'app-register', imports: [ReactiveFormsModule, RouterLink], templateUrl: './register.component.html' })
export class RegisterComponent {
  private readonly fb = inject(FormBuilder); private readonly auth = inject(AuthService); private readonly router = inject(Router);
  readonly form = this.fb.nonNullable.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]] });
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.auth.register(this.form.getRawValue()); void this.router.navigateByUrl('/products'); }
}
