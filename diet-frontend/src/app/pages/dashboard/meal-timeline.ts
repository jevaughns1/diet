import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MealEntry {
  id: string;
  time: string;
  mealType: string;
  items: string[];
  tags: { text: string; color: string }[];
}

@Component({
  selector: 'app-meal-timeline',
  templateUrl: './meal-timeline.html',
  styleUrls: ['./meal-timeline.scss'],
  imports: [CommonModule],
})
export class MealTimelineComponent {
  @Input() meals: MealEntry[] = [];
}
