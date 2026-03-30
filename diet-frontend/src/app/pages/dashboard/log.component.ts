import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule, X, Plus, Trash2, Search, Loader2 } from 'lucide-angular';
import { map, of, catchError } from 'rxjs';

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

        <h2 class="text-2xl font-bold mb-1 text-gray-800">
          {{ editMeal ? 'Edit Meal' : 'Log Meal' }}
        </h2>
        <p class="text-sm text-gray-500 mb-6">
          Search the USDA database or enter details manually.
        </p>

        <div class="relative mb-6">
          <div
            class="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 focus-within:ring-2 focus-within:ring-mint-500 transition-all"
          >
            <lucide-icon
              *ngIf="!searching"
              [name]="SearchIcon"
              class="w-5 h-5 text-gray-400"
            ></lucide-icon>
            <lucide-icon
              *ngIf="searching"
              [name]="LoaderIcon"
              class="w-5 h-5 text-mint-500 animate-spin"
            ></lucide-icon>

            <input
              [formControl]="searchControl"
              (keydown.enter)="onSearch($event)"
              placeholder="Search food & press Enter..."
              class="w-full bg-transparent px-3 py-3 outline-none text-gray-700 text-sm"
              autocomplete="off"
            />

            <button
              *ngIf="searchControl.value"
              type="button"
              (click)="clearSearch()"
              class="p-1 hover:bg-gray-200 rounded-full text-gray-400 transition-colors mr-2"
            >
              <lucide-icon [name]="XIcon" class="w-3.5 h-3.5"></lucide-icon>
            </button>

            <button
              type="button"
              (click)="onSearch()"
              class="text-xs font-bold text-mint-600 hover:text-mint-700 whitespace-nowrap"
            >
              Search
            </button>
          </div>

          <div
            *ngIf="suggestions.length > 0"
            class="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden max-h-60 overflow-y-auto animate-in slide-in-from-top-2 duration-200"
          >
            <div
              *ngFor="let food of suggestions"
              (click)="selectFood(food)"
              class="p-4 hover:bg-mint-50 cursor-pointer border-b border-gray-50 last:border-none transition-colors flex justify-between items-center"
            >
              <div class="pr-4">
                <div class="font-bold text-gray-800 text-sm line-clamp-1">
                  {{ food.description | titlecase }}
                </div>
                <div class="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                  {{ food.brandName || 'Standard Reference' }}
                </div>
              </div>
              <div
                class="text-xs font-bold text-mint-600 bg-mint-50 px-2 py-1 rounded-lg flex-shrink-0"
              >
                + Add
              </div>
            </div>
          </div>
        </div>

        <form
          [formGroup]="form"
          (ngSubmit)="submit()"
          class="max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar"
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
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mint-500 outline-none mb-3 transition-all text-sm font-medium"
                formControlName="name"
                placeholder="Food name"
              />

              <div class="grid grid-cols-4 gap-2">
                <div class="flex flex-col">
                  <span class="text-[10px] font-bold text-gray-400 uppercase text-center mb-1"
                    >Cals</span
                  >
                  <input
                    class="w-full p-2 border border-gray-200 rounded-lg text-center text-sm"
                    type="number"
                    formControlName="calories"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-bold text-gray-400 uppercase text-center mb-1"
                    >Prot</span
                  >
                  <input
                    class="w-full p-2 border border-gray-200 rounded-lg text-center text-sm"
                    type="number"
                    formControlName="protein"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-bold text-gray-400 uppercase text-center mb-1"
                    >Carb</span
                  >
                  <input
                    class="w-full p-2 border border-gray-200 rounded-lg text-center text-sm"
                    type="number"
                    formControlName="carbs"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-bold text-gray-400 uppercase text-center mb-1"
                    >Fat</span
                  >
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
            class="w-full mt-4 py-3 border-2 border-dashed border-gray-200 text-gray-400 rounded-xl hover:border-mint-400 hover:text-mint-600 hover:bg-mint-50 transition-all flex items-center justify-center gap-2 font-medium"
            (click)="addFood()"
          >
            <lucide-icon [name]="PlusIcon" class="w-4 h-4"></lucide-icon>
            Add Manual Item
          </button>

          <div class="flex gap-3 mt-8">
            <button
              type="submit"
              class="flex-1 bg-mint-500 hover:bg-mint-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-mint-100 transition-all disabled:opacity-50"
              [disabled]="form.invalid || submitting"
            >
              {{ submitting ? 'Processing...' : editMeal ? 'Update Meal' : 'Log Meal' }}
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
            class="mt-4 p-3 bg-mint-50 text-mint-700 rounded-lg text-xs text-center font-bold uppercase tracking-wider"
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
  @Input() editMeal: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  readonly XIcon = X;
  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash2;
  readonly SearchIcon = Search;
  readonly LoaderIcon = Loader2;

  private readonly USDA_KEY = 'Fi1fpqVPUtcoP13p18E27BoB28vi7fKuQEMV1kIm';

  form: any;
  searchControl = new FormControl('');
  suggestions: any[] = [];
  submitting = false;
  searching = false;
  feedback = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      foodItems: this.fb.array([]),
    });
  }

  ngOnInit() {
    if (this.editMeal && this.editMeal.items && this.editMeal.items.length > 0) {
      this.editMeal.items.forEach((item: any) => this.addFoodWithData(item));
    } else {
      this.addFood();
    }
  }

  onSearch(event?: Event) {
    if (event) event.preventDefault();

    const query = this.searchControl.value?.trim();
    if (!query || query.length < 2) return;

    this.searching = true;
    this.feedback = '🔍 Searching USDA Database...';
    this.suggestions = [];
    this.cdr.detectChanges(); // Update UI to show loading state

    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${this.USDA_KEY}`;

    const body = {
      query: query,
      pageSize: 15,
      dataType: ['Survey (FNDDS)', 'Foundation'],
    };

    this.http
      .post(url, body)
      .pipe(
        map((res: any) => res.foods || []),
        catchError(() => {
          this.feedback = ' API Error. Check your Key.';
          this.searching = false;
          this.cdr.detectChanges();
          return of([]);
        }),
      )
      .subscribe((foods) => {
        this.suggestions = foods;
        this.searching = false;
        this.feedback = foods.length > 0 ? '' : 'No foods found for "' + query + '"';
        this.cdr.detectChanges(); // Critical: Forces dropdown to appear immediately
      });
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.suggestions = [];
    this.feedback = '';
    this.cdr.detectChanges();
  }

  selectFood(food: any) {
    const findNutrient = (id: number) =>
      food.foodNutrients.find((n: any) => n.nutrientId === id)?.value || 0;

    const mappedData = {
      name: food.description,
      calories: findNutrient(1008),
      protein: findNutrient(1003),
      carbs: findNutrient(1005),
      fat: findNutrient(1004),
    };

    // --- NEW LOGIC TO OVERWRITE ITEM #1 IF EMPTY ---
    const firstItem = this.foodItems.at(0);

    // If there's only one item and the name is empty, patch it instead of adding new
    if (this.foodItems.length === 1 && !firstItem.value.name) {
      firstItem.patchValue(mappedData);
    } else {
      this.addFoodWithData(mappedData);
    }
    // -----------------------------------------------

    this.clearSearch();
  }
  addFoodWithData(data: any) {
    const group = this.fb.group({
      name: [data.name, Validators.required],
      calories: [data.calories || 0, [Validators.required, Validators.min(0)]],
      carbs: [data.carbs || 0, [Validators.required, Validators.min(0)]],
      protein: [data.protein || 0, [Validators.required, Validators.min(0)]],
      fat: [data.fat || 0, [Validators.required, Validators.min(0)]],
    });
    this.foodItems.push(group);
    this.cdr.detectChanges();
  }

  get foodItems() {
    return this.form.get('foodItems') as FormArray;
  }

  addFood() {
    this.foodItems.push(
      this.fb.group({
        name: ['', Validators.required],
        calories: [0, [Validators.required, Validators.min(0)]],
        carbs: [0, [Validators.required, Validators.min(0)]],
        protein: [0, [Validators.required, Validators.min(0)]],
        fat: [0, [Validators.required, Validators.min(0)]],
      }),
    );
    this.cdr.detectChanges();
  }

  removeFood(index: number) {
    this.foodItems.removeAt(index);
    this.cdr.detectChanges();
  }

  submit() {
    if (this.form.invalid || !this.userId || this.submitting) return;
    this.submitting = true;
    this.feedback = 'Saving...';
    this.cdr.detectChanges();

    const isEdit = !!(this.editMeal && this.editMeal.id);
    const url = isEdit ? '/daily-log/edit-log' : `/daily-log/log-meal?userId=${this.userId}`;

    const payload = isEdit
      ? {
          logId: this.editMeal.id,
          foodItems: this.form.value.foodItems,
          mealType: this.editMeal.mealType,
          time: this.editMeal.time,
        }
      : this.form.value.foodItems;

    const request = isEdit
      ? this.http.put(url, payload, { responseType: 'text' })
      : this.http.post(url, payload, { responseType: 'text' });

    request.subscribe({
      next: (res: any) => {
        this.feedback = isEdit ? 'Update Successful' : 'Logged Successfully';
        this.cdr.detectChanges();
        setTimeout(() => this.submitted.emit(res), 800);
      },
      error: (err) => {
        this.feedback = 'Submission Failed';
        this.submitting = false;
        this.cdr.detectChanges();
      },
    });
  }
}
