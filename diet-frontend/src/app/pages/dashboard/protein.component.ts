import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-protein-gauge',
  standalone: true,
  template: `
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 class="text-lg font-semibold text-gray-800 mb-6">Daily Protein Goal</h3>
      <div class="relative flex flex-col items-center">
        <!-- Semi-circular gauge background -->
        <div class="relative w-80 h-40 overflow-hidden">
          <!-- Background arc -->
          <div class="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 200 100" class="w-full">
              <!-- Background arc -->
              <path
                d="M 10 100 A 90 90 0 0 1 190 100"
                fill="none"
                stroke="#E8F5F0"
                stroke-width="20"
                stroke-linecap="round"
              />
              <!-- Progress arc -->
              <path
                d="M 10 100 A 90 90 0 0 1 190 100"
                fill="none"
                stroke="#5DD4A8"
                stroke-width="20"
                stroke-linecap="round"
                [attr.stroke-dasharray]="progressArc + ' 283'"
                style="transition: stroke-dasharray 0.5s ease"
              />
            </svg>
          </div>
          <!-- Center content -->
          <div class="absolute inset-0 flex flex-col items-center justify-end pb-6">
            <div class="text-5xl font-bold text-gray-800">{{ current }}g</div>
            <div class="text-base text-gray-500 mt-2">of {{ goal }}g</div>
          </div>
        </div>
        <!-- Progress bar -->
        <div class="w-full mt-8">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>{{ roundedPercentage }}% Complete</span>
            <span>{{ goal - current }}g remaining</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProteinGaugeComponent {
  @Input() current = 0;
  @Input() goal = 0;

  get percentage(): number {
    return this.goal > 0 ? Math.min((this.current / this.goal) * 100, 100) : 0;
  }

  get progressArc(): number {
    return (this.percentage / 100) * 283;
  }

  get roundedPercentage(): number {
    return Math.round(this.percentage);
  }
}
