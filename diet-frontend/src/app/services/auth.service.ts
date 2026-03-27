import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Initialize signal from localStorage to persist login on refresh
  user = signal<any>(this.getUserFromStorage());

  private getUserFromStorage() {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  }

  login(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
    this.user.set(userData);
  }

  logout() {
    localStorage.removeItem('user');
    this.user.set(null);
  }
}
