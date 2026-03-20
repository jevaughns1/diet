import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss'],
  imports: [CommonModule, FormsModule],
})
export class SigninComponent {
  credentials = {
    email: '',
    password: '',
  };
  error: string = '';
  success: string = '';

  constructor(private http: HttpClient) {}

  signin() {
    this.error = '';
    this.success = '';
    this.http.post('/login', this.credentials).subscribe({
      next: () => {
        this.success = 'Signed in successfully!';
      },
      error: (err) => {
        this.error = err.error?.message || 'Sign in failed.';
      },
    });
  }
}
