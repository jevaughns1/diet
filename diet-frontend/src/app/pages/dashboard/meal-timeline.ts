import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Utensils, Clock } from 'lucide-angular';

interface MealEntry {
  id: string;
  time: string;
  mealType: string;
  items: string[];
  tags: { text: string; color: string }[];
}

@Component({
  selector: 'app-meal-timeline',
  standalone: true,
  templateUrl: './meal-timeline.html',
  styleUrls: ['./meal-timeline.scss'],
  imports: [CommonModule, LucideAngularModule],
})
export class MealTimelineComponent {
  // Initializing with an empty array prevents the template from trying to loop over undefined
  @Input() meals: MealEntry[] = [];

  readonly UtensilsIcon = Utensils;
  readonly ClockIcon = Clock;
}
