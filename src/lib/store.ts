import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DailyNutrition, FoodItem, NutritionGoals, Recipe, FavoriteItem } from '@/types/nutrition';

type MealItem = FoodItem | Recipe;

interface NutritionStore {
  dailyNutrition: DailyNutrition;
  nutritionGoals: NutritionGoals;
  favorites: FavoriteItem[];
  addMealItem: (mealType: keyof DailyNutrition['meals'], item: MealItem) => void;
  removeMealItem: (mealType: keyof DailyNutrition['meals'], itemId: string) => void;
  addToFavorites: (item: MealItem, type: 'food' | 'recipe') => void;
  removeFromFavorites: (favoriteId: string) => void;
  setNutritionGoals: (goals: NutritionGoals) => void;
}

const defaultGoals: NutritionGoals = {
  dailyCalories: 2000,
  proteinPercentage: 30,
  carbsPercentage: 40,
  fatPercentage: 30,
};

function getItemNutrients(item: MealItem) {
  if ('nutrients' in item) {
    return {
      calories: item.nutrients.calories.amount,
      protein: item.nutrients.protein.amount,
      carbs: item.nutrients.carbohydrates.amount,
      fat: item.nutrients.fat.amount,
    };
  }
  return {
    calories: item.totalNutrients.calories / item.servings,
    protein: item.totalNutrients.protein / item.servings,
    carbs: item.totalNutrients.carbohydrates / item.servings,
    fat: item.totalNutrients.fat / item.servings,
  };
}

export const useNutritionStore = create<NutritionStore>()(
  persist(
    (set) => ({
      dailyNutrition: {
        date: new Date().toISOString(),
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        meals: {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
        },
      },
      nutritionGoals: defaultGoals,
      favorites: [],
      addMealItem: (mealType, item) =>
        set((state) => {
          const nutrients = getItemNutrients(item);
          const updatedMeals = {
            ...state.dailyNutrition.meals,
            [mealType]: [...state.dailyNutrition.meals[mealType], item],
          };
          return {
            dailyNutrition: {
              ...state.dailyNutrition,
              meals: updatedMeals,
              totalCalories: state.dailyNutrition.totalCalories + nutrients.calories,
              totalProtein: state.dailyNutrition.totalProtein + nutrients.protein,
              totalCarbs: state.dailyNutrition.totalCarbs + nutrients.carbs,
              totalFat: state.dailyNutrition.totalFat + nutrients.fat,
            },
          };
        }),
      removeMealItem: (mealType, itemId) =>
        set((state) => {
          const item = state.dailyNutrition.meals[mealType].find((item) => item.id === itemId);
          if (!item) return state;

          const nutrients = getItemNutrients(item);
          const updatedMeals = {
            ...state.dailyNutrition.meals,
            [mealType]: state.dailyNutrition.meals[mealType].filter((item) => item.id !== itemId),
          };

          return {
            dailyNutrition: {
              ...state.dailyNutrition,
              meals: updatedMeals,
              totalCalories: state.dailyNutrition.totalCalories - nutrients.calories,
              totalProtein: state.dailyNutrition.totalProtein - nutrients.protein,
              totalCarbs: state.dailyNutrition.totalCarbs - nutrients.carbs,
              totalFat: state.dailyNutrition.totalFat - nutrients.fat,
            },
          };
        }),
      addToFavorites: (item, type) =>
        set((state) => ({
          favorites: [
            ...state.favorites,
            {
              id: crypto.randomUUID(),
              type,
              itemId: item.id,
              dateAdded: new Date().toISOString(),
            },
          ],
        })),
      removeFromFavorites: (favoriteId) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== favoriteId),
        })),
      setNutritionGoals: (goals) => set({ nutritionGoals: goals }),
    }),
    {
      name: 'nutrition-storage',
    }
  )
); 