import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({ selector: 'app-login', imports: [ReactiveFormsModule, RouterLink], templateUrl: './login.component.html' })
export class LoginComponent {
  private readonly fb = inject(FormBuilder); private readonly auth = inject(AuthService); private readonly router = inject(Router); private readonly route = inject(ActivatedRoute);
  readonly form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]] });
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const { email, password } = this.form.getRawValue(); this.auth.login(email, password); void this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl') ?? '/products'); }
}
