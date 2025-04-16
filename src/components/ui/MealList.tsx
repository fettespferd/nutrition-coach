import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useNutritionStore } from '@/lib/store';
import { FoodItem, Recipe } from '@/types/nutrition';

type MealItem = FoodItem | Recipe;
type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

interface MealSectionProps {
  title: string;
  items: MealItem[];
  mealType: MealType;
  onRemove: (mealType: MealType, itemId: string) => void;
}

function getItemCalories(item: MealItem): number {
  if ('nutrients' in item) {
    return item.nutrients.calories.amount;
  }
  return item.totalNutrients.calories / item.servings;
}

function getItemServingInfo(item: MealItem): string {
  if ('nutrients' in item) {
    return `${item.servingSize} ${item.servingUnit}`;
  }
  return `${item.servings} Portion${item.servings > 1 ? 'en' : ''}`;
}

function MealSection({ title, items, mealType, onRemove }: MealSectionProps) {
  const totalCalories = items.reduce((sum, item) => sum + getItemCalories(item), 0);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">{Math.round(totalCalories)} kcal</span>
      </div>
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">Keine Einträge</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">
                  {getItemServingInfo(item)} • {Math.round(getItemCalories(item))} kcal
                </div>
              </div>
              <button
                onClick={() => onRemove(mealType, item.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Entfernen"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function MealList() {
  const { dailyNutrition, removeMealItem } = useNutritionStore();

  const meals = [
    { type: 'breakfast' as const, title: 'Frühstück' },
    { type: 'lunch' as const, title: 'Mittagessen' },
    { type: 'dinner' as const, title: 'Abendessen' },
    { type: 'snacks' as const, title: 'Snacks' },
  ];

  return (
    <div className="space-y-6">
      {meals.map((meal) => (
        <MealSection
          key={meal.type}
          title={meal.title}
          items={dailyNutrition.meals[meal.type]}
          mealType={meal.type}
          onRemove={removeMealItem}
        />
      ))}
    </div>
  );
} 