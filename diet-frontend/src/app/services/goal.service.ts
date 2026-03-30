import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class GoalService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  getGoalHistory(): Observable<any[]> {
    const userId = this.auth.user()?.publicID;
    const userTarget = this.auth.user()?.calorieTarget || 2000;

    return this.http.get<any[]>(`/daily-log/user-logs?userId=${userId}`).pipe(
      map((logs) => {
        return logs.map((log) => {
          // Sum up calories from all food items in that day's log
          const totalCals = log.foodItems.reduce(
            (sum: number, item: any) => sum + item.calories,
            0,
          );

          let status: 'met' | 'partial' | 'missed' = 'missed';

          // Logic: Met if within 100 calories of target, Partial if within 300
          const diff = Math.abs(totalCals - userTarget);
          if (totalCals >= 2450) status = 'met';
          else if (diff <= 300) status = 'partial';
          else status = 'missed';

          return {
            date: new Date(log.date),
            status: status,
            totalCalories: totalCals,
          };
        });
      }),
    );
  }
}
