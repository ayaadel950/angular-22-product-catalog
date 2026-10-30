import { computed, Injectable, signal } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userState = signal<User | null>(null);
  readonly currentUser = this.userState.asReadonly();
  readonly isLoggedIn = computed(() => this.userState() !== null);

  login(email: string, password: string): void { this.userState.set({ name: email.split('@')[0], email, password }); }
  register(user: User): void { this.userState.set(user); }
  logout(): void { this.userState.set(null); }
}
