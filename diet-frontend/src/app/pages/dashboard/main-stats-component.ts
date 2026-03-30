import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Droplets, LucideAngularModule, Wheat } from 'lucide-angular';

import { StatsCardComponent } from './stats-card.component';
import { CalorieCardComponent } from './calorie.component';
import { ProteinGaugeComponent } from './protein.component';
import { MealTimelineComponent } from './meal-timeline';
import { GoalCalendarComponent } from './goal-calendar.component';

@Component({
  selector: 'app-main-stats',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    StatsCardComponent,
    MealTimelineComponent,
    CalorieCardComponent,
    ProteinGaugeComponent,
    GoalCalendarComponent,
  ],
  template: `
    <div class="space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <app-stats-card
          title="Carbs"
          [value]="dailyStatus?.carbsConsumed || 0"
          [subtitle]="dailyStatus?.carbsGoal || 300"
          [icon]="CarbIcon"
          color="purple"
        ></app-stats-card>

        <app-stats-card
          title="Fat Goal"
          [value]="dailyStatus?.fatConsumed || 0"
          [subtitle]="dailyStatus?.fatGoal || 70"
          [icon]="FatIcon"
          color="blue"
        ></app-stats-card>

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
      </div>
    </div>
  `,
})
export class MainStatsComponent implements OnInit {
  userId: string = '';
  user: any = null;
  mealLogs: any[] = [];

  readonly CarbIcon = Wheat;
  readonly FatIcon = Droplets;

  dailyStatus: any = {
    caloriesConsumed: 0,
    proteinConsumed: 0,
    calorieGoal: 2450,
    proteinGoal: 150,
    carbsGoal: 300,
    fatGoal: 70,
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userId = user.publicID || user.publicId || user.id;
      this.user = user;
      this.refreshAllData();
    } else {
      this.router.navigateByUrl('/signin');
    }
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
    this.http.get<any[]>(`/daily-log/user-logs/today?userId=${this.userId}`).subscribe({
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
          carbs: log.foodItems
            ? log.foodItems.reduce((s: number, f: any) => s + (f.carbs || 0), 0)
            : 0,
          fat: log.foodItems ? log.foodItems.reduce((s: number, f: any) => s + (f.fat || 0), 0) : 0,
        }));
        this.updateStatus();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Logs fetch failed', err),
    });
  }

  private updateStatus(): void {
    this.dailyStatus = {
      ...this.dailyStatus,
      caloriesConsumed: this.mealLogs.reduce((sum, log) => sum + (log.calories || 0), 0),
      proteinConsumed: this.mealLogs.reduce((sum, log) => sum + (log.protein || 0), 0),
      carbsConsumed: this.mealLogs.reduce((sum, log) => sum + Math.round(log.carbs) || 0, 0),
      fatConsumed: this.mealLogs.reduce((sum, log) => sum + (log.fat || 0), 0),
    };
  }

  private formatTime(date: string): string {
    if (!date) return '--:--';
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
