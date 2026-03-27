import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class SigninComponent {
  credentials = { userName: '', password: '' };
  error: string = '';
  success: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {}

  signin() {
    this.error = '';
    this.success = '';
    this.http.post<any>('/users/login', this.credentials).subscribe({
      next: (user) => {
        this.success = 'Signed in successfully!';
        // Update the global state
        this.authService.login(user);
        // Navigate away
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.error = err.error?.message || 'Sign in failed.';
      },
    });
  }
}
