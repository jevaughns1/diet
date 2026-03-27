import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Utensils, Clock } from 'lucide-angular';
import { LogMealFormComponent } from './log.component';
import { MealDetailModalComponent } from './meal-detail-modal.component';

@Component({
  selector: 'app-meal-timeline',
  standalone: true,
  templateUrl: './meal-timeline.html',
  styleUrls: ['./meal-timeline.scss'],
  imports: [CommonModule, LucideAngularModule, LogMealFormComponent, MealDetailModalComponent],
})
export class MealTimelineComponent {
  // Initializing with an empty array prevents the template from trying to loop over undefined
  @Input() meals: MealEntry[] = [];
  @Input() userId: string = '';

  @Output() refreshRequest = new EventEmitter<void>(); // Add an output to talk to Dashboard

  onMealDeleted() {
    this.refreshRequest.emit();
  }

  readonly UtensilsIcon = Utensils;
  readonly ClockIcon = Clock;

  showLogMealForm = false;
  editMeal: any = null;
  selectedMeal: any = null;

  addMeal() {
    this.editMeal = null;
    this.showLogMealForm = true;
  }

  onMealLogged() {
    this.showLogMealForm = false;
    this.editMeal = null;
    this.refreshRequest.emit();
  }

  openMealDetail(meal: any) {
    this.selectedMeal = meal;
  }
  closeMealDetail() {
    this.selectedMeal = null;
  }

  onEditMeal(meal: any) {
    this.selectedMeal = null;
    this.editMeal = meal;
    this.showLogMealForm = true;
  }
}
