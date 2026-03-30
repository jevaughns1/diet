import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stats-card.component.html',
})
export class StatsCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;
  @Input({ required: true }) subtitle!: string;
  @Input({ required: true }) icon!: any; // The icon object (e.g., Search, Flame)
  @Input({ required: true }) color: 'mint' | 'orange' | 'blue' | 'purple' = 'mint';

  // Mapping the colors to Tailwind classes
  colorClasses: Record<string, string> = {
    mint: 'bg-mint-100 text-mint-600',
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  get containerClass(): string {
    return this.colorClasses[this.color] || this.colorClasses['mint'];
  }
}
