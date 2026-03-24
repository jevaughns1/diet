import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalorieCardComponent } from './calorie.component';
import { HeaderComponent } from './header';
import { LogMealFormComponent } from './log.component';
import { MealTimelineComponent } from './meal-timeline';
import { ProteinGaugeComponent } from './protein.component';
import { SidebarComponent } from './sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    HeaderComponent,
    SidebarComponent,
    MealTimelineComponent,
    CalorieCardComponent,
    ProteinGaugeComponent,
    LogMealFormComponent,
  ],
  template: `
    <div class="flex min-h-screen bg-gray-50">
      <app-sidebar
        class="hidden lg:block w-64 fixed h-full border-r border-gray-200 bg-white z-20"
      ></app-sidebar>

      <main class="flex-1 lg:ml-64 flex flex-col">
        <app-header [user]="user" (toggleSidebar)="(true)"></app-header>

        <div class="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
          <button (click)="refreshAllData()">refresh</button>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <app-calorie-card [status]="dailyStatus"></app-calorie-card>
            <app-protein-gauge
              [current]="dailyStatus?.proteinConsumed || 0"
              [goal]="dailyStatus?.proteinGoal || 150"
            ></app-protein-gauge>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div class="xl:col-span-2">
              <app-meal-timeline [meals]="mealLogs" (addClick)="showLogMealForm = true">
              </app-meal-timeline>
            </div>

            <div class="space-y-6">
              <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 class="font-bold text-gray-800 mb-4">Daily Insight</h3>
                <p class="text-sm text-gray-600 leading-relaxed">
                  You are 20g away from your protein goal for today. Consider adding a Greek yogurt
                  to your next snack!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <app-log-meal-form
        *ngIf="showLogMealForm"
        [userId]="userId"
        (close)="showLogMealForm = false"
        (submitted)="onMealLogged($event)"
      >
      </app-log-meal-form>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  userId: string = '158f53e0-e842-4eea-891c-1fca91fae2e1'; // Replace with real Auth logic
  user: any = null;
  dailyStatus: any = null;
  mealLogs: any[] = [];
  showLogMealForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshAllData();
  }

  refreshAllData() {
    this.fetchUser();
    this.fetchDailyStatus();
    this.fetchMealLogs();
  }

  fetchUser() {
    this.http.get(`/users/${this.userId}`).subscribe((data) => (this.user = data));
  }

  fetchDailyStatus() {
    if (!this.userId) return;
    this.http.get(`/api/status-bar/daily?userId=${this.userId}`).subscribe({
      next: (data: any) => (this.dailyStatus = data),
      error: (err) => {
        console.error('API Error:', err);
        // Set default values so the Gauge components don't crash
        this.dailyStatus = {
          caloriesConsumed: 0,
          calorieGoal: 2000,
          proteinConsumed: 0,
          proteinGoal: 150,
        };
      },
    });
  }

  fetchMealLogs() {
    this.http.get(`/daily-log/user-logs?userId=${this.userId}`).subscribe((data: any) => {
      this.mealLogs = data || [];
    });
  }

  onMealLogged(res: any) {
    this.showLogMealForm = false;
    this.refreshAllData(); // Live update UI
  }
}
