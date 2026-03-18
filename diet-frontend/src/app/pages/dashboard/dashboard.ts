import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';
import { MealTimelineComponent } from './meal-timeline';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    HeaderComponent,
    SidebarComponent,
    MealTimelineComponent,
  ],
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
    this.http.get(`/daily-log/user-logs?userId=${this.userId}`).subscribe(
      (data: any) => {
        this.mealLogs = Array.isArray(data)
          ? data.map((log) => ({
              id: log.id || log._id || log.date,
              time: log.time || this.formatTime(log.date),
              mealType: log.mealType || 'Meal',
              items: log.foodItems ? log.foodItems.map((item: any) => item.name) : [],
              tags: log.tags || [],
            }))
          : [];
      },
      () => (this.mealLogs = []),
    );
  }

  formatTime(date: string) {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
