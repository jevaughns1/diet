import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar';
import { CalorieCardComponent } from './calorie.component';
import { HeaderComponent } from './header';
import { MealTimelineComponent } from './meal-timeline';
import { ProteinGaugeComponent } from './protein.component';

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
  ],
  template: `
    <div class="flex min-h-screen bg-gray-50">
      <app-sidebar
        class="hidden lg:block w-64 fixed h-full border-r border-gray-200 bg-white z-20"
      ></app-sidebar>

      <main class="flex-1 lg:ml-64 flex flex-col">
        <app-header [user]="user"></app-header>

        <div class="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <app-calorie-card [status]="dailyStatus"></app-calorie-card>
            <app-protein-gauge
              [current]="dailyStatus?.proteinConsumed || 0"
              [goal]="dailyStatus?.proteinGoal || 150"
            ></app-protein-gauge>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div class="xl:col-span-2">
              <app-meal-timeline
                (refreshRequest)="refreshAllData()"
                [userId]="userId"
                [meals]="mealLogs"
              ></app-meal-timeline>
            </div>

            <div class="space-y-6">
              <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 class="font-bold text-gray-800 mb-4">Daily Insight</h3>
                <p class="text-sm text-gray-600 leading-relaxed">You are tracking well</p>
                <button
                  (click)="refreshAllData()"
                  class="mt-4 text-xs font-bold text-mint-600 hover:text-mint-700 uppercase tracking-widest"
                >
                  Manual Sync
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  userId: string = '158f53e0-e842-4eea-891c-1fca91fae2e1';
  user: any = null;
  mealLogs: any[] = [];

  // Default object to prevent "undefined" errors in templates
  dailyStatus: any = {
    caloriesConsumed: 0,
    proteinConsumed: 0,
    calorieGoal: 2000,
    proteinGoal: 150,
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.refreshAllData();
  }

  refreshAllData(): void {
    this.fetchUser();
    this.fetchMealLogs();
  }

  private fetchUser(): void {
    this.http.get(`/users/${this.userId}`).subscribe({
      next: (data) => {
        this.user = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('User fetch failed', err),
    });
  }

  private fetchMealLogs(): void {
    if (!this.userId) return;

    // Use Observable subscribe instead of async/await to stay in Angular Zone
    this.http.get<MealEntry[]>(`/daily-log/user-logs?userId=${this.userId}`).subscribe({
      next: (data) => {
        const rawLogs = Array.isArray(data) ? data : [];

        this.mealLogs = rawLogs.map((log: any) => ({
          id: log.id || log.date,
          time: log.time || this.formatTime(log.date),
          mealType: log.mealType || 'Meal',
          items: log.foodItems || [],
          calories: log.foodItems
            ? log.foodItems.reduce((s: number, f: any) => s + (f.calories || 0), 0)
            : 0,
          protein: log.foodItems
            ? log.foodItems.reduce((s: number, f: any) => s + (f.protein || 0), 0)
            : 0,
          tags: log.tags || [],
        }));

        this.updateStatus();
        console.log('Meal logs updated', this.mealLogs);

        // Force the UI to detect the new data immediately
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Logs fetch failed', err);
        this.mealLogs = [];
      },
    });
  }

  private updateStatus(): void {
    // CRITICAL: We create a NEW object reference here using the spread operator
    // This ensures child components (CalorieCard/ProteinGauge) trigger their @Input updates
    this.dailyStatus = {
      ...this.dailyStatus,
      caloriesConsumed: this.mealLogs.reduce((sum, log) => sum + (log.calories || 0), 0),
      proteinConsumed: this.mealLogs.reduce((sum, log) => sum + (log.protein || 0), 0),
    };
  }

  private formatTime(date: string): string {
    if (!date) return '--:--';
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
