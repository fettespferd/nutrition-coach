export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
}

export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  servingSize: number;
  servingUnit: string;
  nutrients: {
    calories: Nutrient;
    protein: Nutrient;
    carbohydrates: Nutrient;
    fat: Nutrient;
    fiber?: Nutrient;
    sugar?: Nutrient;
  };
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: {
    foodItem: FoodItem;
    amount: number;
    unit: string;
  }[];
  instructions: string[];
  servings: number;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  totalNutrients: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  };
  imageUrl?: string;
}

export interface FavoriteItem {
  id: string;
  type: 'recipe' | 'food';
  itemId: string;
  dateAdded: string;
}

export interface DailyNutrition {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: {
    breakfast: (FoodItem | Recipe)[];
    lunch: (FoodItem | Recipe)[];
    dinner: (FoodItem | Recipe)[];
    snacks: (FoodItem | Recipe)[];
  };
}

export interface NutritionGoals {
  dailyCalories: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatPercentage: number;
} 