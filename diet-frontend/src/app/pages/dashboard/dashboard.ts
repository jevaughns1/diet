import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [CommonModule, FormsModule, DatePipe],
})
export class DashboardComponent {
  userId: string = '';
  user: any = null;
  dailyStatus: any = null;
  mealLogs: any[] = [];

  constructor(private http: HttpClient) {}

  fetchUser() {
    if (!this.userId) return;
    this.http.get(`/users/${this.userId}`).subscribe({
      next: (data: any) => (this.user = data),
      error: () => (this.user = null),
    });
  }

  fetchDailyStatus() {
    if (!this.userId) return;
    this.http.get(`/status-bar/daily?userId=${this.userId}`).subscribe({
      next: (data: any) => (this.dailyStatus = data),
      error: () => (this.dailyStatus = null),
    });
  }

  fetchMealLogs() {
    if (!this.userId) return;
    this.http.get(`/daily-log/user-logs?userId=${this.userId}`).subscribe({
      next: (data: any) => (this.mealLogs = data),
      error: () => (this.mealLogs = []),
    });
  }
}
