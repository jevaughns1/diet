import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calorie-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
      <h3 class="text-lg font-semibold text-gray-800 mb-6 tracking-tight">Calories Today</h3>
      <div class="flex flex-col items-center justify-center">
        <div class="relative w-48 h-48 mb-6">
          <svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#FFF0E5" stroke-width="3" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#FF8C42"
              stroke-width="3"
              [attr.stroke-dasharray]="percentage + ' 100'"
              stroke-linecap="round"
              class="transition-all duration-700 ease-out"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <div class="text-4xl font-bold text-gray-800">{{ remaining }}</div>
            <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
              remaining
            </div>
          </div>
        </div>

        <div class="w-full space-y-4">
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span class="text-sm font-medium text-gray-500">Consumed</span>
            <span class="text-sm font-bold text-gray-800">{{ consumed }} kcal</span>
          </div>
          <div class="flex justify-between items-center px-3">
            <span class="text-sm font-medium text-gray-500">Daily Goal</span>
            <span class="text-sm font-bold text-gray-400">{{ total }} kcal</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CalorieCardComponent {
  // This @Input() status matches what Dashboard is sending
  @Input() status: any = null;

  get total(): number {
    return this.status?.calorieGoal || 2000;
  }

  get consumed(): number {
    return this.status?.caloriesConsumed || 0;
  }

  get remaining(): number {
    const rem = this.total - this.consumed;
    return rem > 0 ? rem : 0;
  }

  get percentage(): number {
    if (this.total <= 0) return 0;
    // For SVG dasharray logic, we ensure it doesn't exceed 100
    const p = (this.consumed / this.total) * 100;
    return Math.min(p, 100);
  }
}
