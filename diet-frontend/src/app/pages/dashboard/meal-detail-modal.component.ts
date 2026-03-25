import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  LucideAngularModule,
  Flame,
  Beef,
  Wheat,
  Droplets,
  X,
  Pencil,
  Trash2,
  Info,
} from 'lucide-angular';

@Component({
  selector: 'app-meal-detail-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      *ngIf="meal"
      class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      (click)="onClose.emit()"
    >
      <div
        class="bg-white rounded-3xl max-w-2xl w-full h-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        (click)="$event.stopPropagation()"
      >
        <div
          class="bg-gradient-to-br from-mint-500 to-mint-600 px-8 py-6 flex items-center justify-between flex-shrink-0"
        >
          <div>
            <h2 class="text-2xl font-bold text-white">{{ meal.mealType }}</h2>
            <p class="text-mint-100 text-sm font-medium opacity-90">{{ meal.time }}</p>
          </div>
          <button
            (click)="onClose.emit()"
            class="w-10 h-10 rounded-xl bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-all"
          >
            <lucide-icon [name]="XIcon" class="w-5 h-5"></lucide-icon>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar">
          <div class="p-8 bg-gray-50/50 border-b border-gray-100">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Nutrition Summary
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                <div
                  class="w-8 h-8 mx-auto rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mb-3"
                >
                  <lucide-icon [name]="FlameIcon" class="w-4 h-4"></lucide-icon>
                </div>
                <div class="text-xl font-bold text-gray-800">{{ totals.calories }}</div>
                <div class="text-[10px] font-bold text-gray-400 uppercase">Calories</div>
              </div>
              <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                <div
                  class="w-8 h-8 mx-auto rounded-lg bg-mint-50 text-mint-600 flex items-center justify-center mb-3"
                >
                  <lucide-icon [name]="ProteinIcon" class="w-4 h-4"></lucide-icon>
                </div>
                <div class="text-xl font-bold text-gray-800">{{ totals.protein }}g</div>
                <div class="text-[10px] font-bold text-gray-400 uppercase">Protein</div>
              </div>
              <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                <div
                  class="w-8 h-8 mx-auto rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3"
                >
                  <lucide-icon [name]="CarbIcon" class="w-4 h-4"></lucide-icon>
                </div>
                <div class="text-xl font-bold text-gray-800">{{ totals.carbs }}g</div>
                <div class="text-[10px] font-bold text-gray-400 uppercase">Carbs</div>
              </div>
              <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                <div
                  class="w-8 h-8 mx-auto rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3"
                >
                  <lucide-icon [name]="FatIcon" class="w-4 h-4"></lucide-icon>
                </div>
                <div class="text-xl font-bold text-gray-800">{{ totals.fat }}g</div>
                <div class="text-[10px] font-bold text-gray-400 uppercase">Fat</div>
              </div>
            </div>
          </div>

          <div class="p-8">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Detailed Items
            </h3>
            <div *ngIf="meal.items && meal.items.length > 0; else noItems" class="space-y-3">
              <div
                *ngFor="let item of meal.items"
                class="bg-white border border-gray-100 rounded-2xl p-5 hover:border-mint-200 transition-colors shadow-sm"
              >
                <div class="flex items-start justify-between mb-4">
                  <h4 class="font-bold text-gray-800 text-lg">{{ item.name || 'Unnamed Item' }}</h4>
                  <span class="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                    {{ item.calories || 0 }} kcal
                  </span>
                </div>
                <div class="grid grid-cols-3 gap-4">
                  <div class="flex flex-col">
                    <span class="text-[10px] font-bold text-gray-400 uppercase mb-1">Protein</span>
                    <span class="text-sm font-bold text-mint-600">{{ item.protein || 0 }}g</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[10px] font-bold text-gray-400 uppercase mb-1">Carbs</span>
                    <span class="text-sm font-bold text-purple-600">{{ item.carbs || 0 }}g</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[10px] font-bold text-gray-400 uppercase mb-1">Fat</span>
                    <span class="text-sm font-bold text-blue-600">{{ item.fat || 0 }}g</span>
                  </div>
                </div>
              </div>
            </div>

            <ng-template #noItems>
              <div
                class="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200"
              >
                <lucide-icon
                  [name]="InfoIcon"
                  class="w-8 h-8 text-gray-300 mx-auto mb-2"
                ></lucide-icon>
                <p class="text-gray-400 text-sm">No specific food items recorded for this meal.</p>
              </div>
            </ng-template>
          </div>
        </div>

        <div class="bg-gray-50/50 border-t border-gray-100 p-6 flex gap-4 flex-shrink-0">
          <button
            (click)="edit.emit(meal)"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-all shadow-sm"
          >
            <lucide-icon [name]="EditIcon" class="w-4 h-4"></lucide-icon>
            Edit Entry
          </button>
          <button
            class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold transition-all"
            (click)="delete()"
          >
            <lucide-icon [name]="DeleteIcon" class="w-4 h-4"></lucide-icon>
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
})
export class MealDetailModalComponent implements OnInit, OnDestroy {
  @Input() meal: any = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>(); // Added for edit functionality

  readonly FlameIcon = Flame;
  readonly ProteinIcon = Beef;
  readonly CarbIcon = Wheat;
  readonly FatIcon = Droplets;
  readonly XIcon = X;
  readonly EditIcon = Pencil;
  readonly DeleteIcon = Trash2;
  readonly InfoIcon = Info;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }

  delete() {
    if (!this.meal?.id) return;
    this.http
      .delete(`/daily-log/delete-log?logId=${this.meal.id}`, { responseType: 'text' })
      .subscribe({
        next: (res: any) => {
          this.deleted.emit();
          this.onClose.emit();
        },
        error: (err) => {
          console.error('--- DELETE ERROR ---', err);
        },
      });
  }

  get totals() {
    const foodList = this.meal?.items || [];
    return foodList.reduce(
      (acc: any, item: any) => ({
        calories: acc.calories + (item.calories || 0),
        carbs: acc.carbs + (item.carbs || 0),
        protein: acc.protein + (item.protein || 0),
        fat: acc.fat + (item.fat || 0),
      }),
      { calories: 0, carbs: 0, protein: 0, fat: 0 },
    );
  }
}
