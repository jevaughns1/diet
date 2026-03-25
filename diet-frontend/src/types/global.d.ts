export {};
declare global {
  export interface MealEntry {
    id: string;
    time: string;
    mealType?: string;
    items: foodItem[];
    tags?: { text: string; color: string }[];
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  }

  export interface foodItem {
    name: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  }
}
