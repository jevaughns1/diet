import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
  imports: [CommonModule, FormsModule],
})
export class SignupComponent {
  user = {
    userName: '',
    email: '',
    password: '',
    dietType: '',
  };
  error: string = '';
  success: string = '';

  constructor(private http: HttpClient) {}

  signup() {
    this.error = '';
    this.success = '';
    this.http.post('/users/register', this.user).subscribe({
      next: () => {
        this.success = 'Account created! You can now sign in.';
      },
      error: (err) => {
        this.error = err.error?.message || 'Sign up failed.';
      },
    });
  }
}
