import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule, X, Plus, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-log-meal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div
      class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in duration-200"
      >
        <button
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          (click)="close.emit()"
        >
          <lucide-icon [name]="XIcon" class="w-6 h-6"></lucide-icon>
        </button>

        <h2 class="text-2xl font-bold mb-2 text-gray-800">
          {{ editMeal ? 'Edit Meal' : 'Log Meal' }}
        </h2>
        <p class="text-sm text-gray-500 mb-6">Record your nutrition for this entry.</p>

        <form
          [formGroup]="form"
          (ngSubmit)="submit()"
          class="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"
        >
          <div formArrayName="foodItems" class="space-y-4">
            <div
              *ngFor="let food of foodItems.controls; let i = index"
              [formGroupName]="i"
              class="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group"
            >
              <div class="flex justify-between items-center mb-3">
                <span class="text-xs font-bold text-mint-600 uppercase tracking-tighter"
                  >Item #{{ i + 1 }}</span
                >
                <button
                  type="button"
                  class="text-red-500 hover:text-red-600 transition-colors"
                  (click)="removeFood(i)"
                  *ngIf="foodItems.length > 1"
                >
                  <lucide-icon [name]="TrashIcon" class="w-4 h-4"></lucide-icon>
                </button>
              </div>

              <input
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mint-500 outline-none mb-3 transition-all"
                formControlName="name"
                placeholder="Food name (e.g., Avocado Toast)"
              />

              <div class="grid grid-cols-4 gap-2">
                <div class="flex flex-col">
                  <span class="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1">Cals</span>
                  <input
                    class="w-full p-2 border border-gray-200 rounded-lg text-center text-sm"
                    type="number"
                    formControlName="calories"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1">Prot</span>
                  <input
                    class="w-full p-2 border border-gray-200 rounded-lg text-center text-sm"
                    type="number"
                    formControlName="protein"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1">Carb</span>
                  <input
                    class="w-full p-2 border border-gray-200 rounded-lg text-center text-sm"
                    type="number"
                    formControlName="carbs"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1">Fat</span>
                  <input
                    class="w-full p-2 border border-gray-200 rounded-lg text-center text-sm"
                    type="number"
                    formControlName="fat"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="w-full mt-4 py-3 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl hover:border-mint-400 hover:text-mint-600 hover:bg-mint-50 transition-all flex items-center justify-center gap-2"
            (click)="addFood()"
          >
            <lucide-icon [name]="PlusIcon" class="w-4 h-4"></lucide-icon>
            Add Another Item
          </button>

          <div class="flex gap-3 mt-8">
            <button
              type="submit"
              class="flex-1 bg-mint-500 hover:bg-mint-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-mint-100 transition-all disabled:opacity-50"
              [disabled]="form.invalid || submitting"
            >
              {{ submitting ? 'Logging...' : editMeal ? 'Update Meal' : 'Log Meal' }}
            </button>
            <button
              type="button"
              class="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-all"
              (click)="close.emit()"
            >
              Cancel
            </button>
          </div>

          <div
            *ngIf="feedback"
            class="mt-4 p-3 bg-mint-50 text-mint-700 rounded-lg text-sm text-center font-medium"
          >
            {{ feedback }}
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LogMealFormComponent implements OnInit {
  @Input() userId!: string;
  @Input() editMeal: any = null; // Passed from Timeline
  @Output() close = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  readonly XIcon = X;
  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash2;

  form: any;
  submitting = false;
  feedback = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.form = this.fb.group({
      foodItems: this.fb.array([]),
    });
  }

  ngOnInit() {
    // If we have edit data, map it to the form
    if (this.editMeal && this.editMeal.items && this.editMeal.items.length > 0) {
      this.editMeal.items.forEach((item: any) => {
        this.foodItems.push(
          this.fb.group({
            name: [item.name, Validators.required],
            calories: [item.calories || 0, [Validators.required, Validators.min(0)]],
            carbs: [item.carbs || 0, [Validators.required, Validators.min(0)]],
            protein: [item.protein || 0, [Validators.required, Validators.min(0)]],
            fat: [item.fat || 0, [Validators.required, Validators.min(0)]],
          }),
        );
      });
    } else {
      // Default behavior for new meal
      this.addFood();
    }
  }

  createFoodItem() {
    return this.fb.group({
      name: ['', Validators.required],
      calories: [0, [Validators.required, Validators.min(0)]],
      carbs: [0, [Validators.required, Validators.min(0)]],
      protein: [0, [Validators.required, Validators.min(0)]],
      fat: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get foodItems() {
    return this.form.get('foodItems') as FormArray;
  }

  addFood() {
    this.foodItems.push(this.createFoodItem());
  }

  removeFood(index: number) {
    this.foodItems.removeAt(index);
  }

  submit() {
    if (this.form.invalid || !this.userId || this.submitting) return;
    this.submitting = true;
    this.feedback = '';

    const isEdit = !!(this.editMeal && this.editMeal.id);
    if (isEdit) {
      const payload = {
        logId: this.editMeal.id,
        foodItems: this.form.value.foodItems,
        mealType: this.editMeal.mealType,
        time: this.editMeal.time,
      };
      this.http.put('/daily-log/edit-log', payload, { responseType: 'text' }).subscribe({
        next: (res: any) => {
          this.feedback = 'Meal updated successfully!';
          this.submitting = false;
          setTimeout(() => {
            this.submitted.emit(res);
          }, 800);
        },
        error: (err) => {
          console.error('Submit Error:', err);
          this.feedback = 'Failed to save meal.';
          this.submitting = false;
        },
      });
    } else {
      this.http
        .post(`/daily-log/log-meal?userId=${this.userId}`, this.form.value.foodItems, {
          responseType: 'text',
        })
        .subscribe({
          next: (res: any) => {
            this.feedback = 'Meal logged successfully!';
            this.submitting = false;
            setTimeout(() => {
              this.submitted.emit(res);
            }, 800);
          },
          error: (err) => {
            console.error('Submit Error:', err);
            this.feedback = 'Failed to save meal.';
            this.submitting = false;
          },
        });
    }
  }
}
