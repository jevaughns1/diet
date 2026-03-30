import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CheckCircle2 } from 'lucide-angular';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-goal-calendar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './goal-calendar.component.html',
})
export class GoalCalendarComponent implements OnInit {
  private goalService = inject(GoalService);

  readonly CheckIcon = CheckCircle2;
  days = signal<any[]>([]);
  streak = signal(0);

  ngOnInit() {
    this.goalService.getGoalHistory().subscribe((history) => {
      this.generateFullCalendar(history);
    });
  }

  generateFullCalendar(history: any[]) {
    const calendarDays = [];
    const today = new Date();

    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      d.setHours(0, 0, 0, 0);

      // Find if we have a log for this specific date
      const logMatch = history.find((h) => new Date(h.date).setHours(0, 0, 0, 0) === d.getTime());

      calendarDays.push({
        date: d,
        status: logMatch ? logMatch.status : 'missed',
        calories: logMatch ? logMatch.totalCalories : 0,
      });
    }

    this.days.set(calendarDays);
    this.calculateStreak(calendarDays);
  }

  calculateStreak(days: any[]) {
    let currentStreak = 0;
    // Work backwards from today to find the consecutive 'met' status
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].status === 'met') currentStreak++;
      else if (i !== days.length - 1) break; // Break if we hit a non-met day (unless it's today)
    }
    this.streak.set(currentStreak);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'met':
        return 'bg-mint-500 border-mint-600 shadow-sm shadow-mint-100';
      case 'partial':
        return 'bg-orange-400 border-orange-500';
      default:
        return 'bg-gray-100 border-gray-200'; // Missed or No Log
    }
  }
}
