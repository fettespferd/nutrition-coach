import { FoodItem } from '@/types/nutrition';
import { v4 as uuidv4 } from 'uuid';

const createFoodItem = (
  name: string,
  calories: number,
  protein: number,
  carbs: number,
  fat: number,
  servingSize: number = 100,
  servingUnit: string = 'g',
  brand?: string
): FoodItem => ({
  id: uuidv4(),
  name,
  brand,
  servingSize,
  servingUnit,
  nutrients: {
    calories: { name: 'Kalorien', amount: calories, unit: 'kcal' },
    protein: { name: 'Protein', amount: protein, unit: 'g' },
    carbohydrates: { name: 'Kohlenhydrate', amount: carbs, unit: 'g' },
    fat: { name: 'Fett', amount: fat, unit: 'g' },
  },
});

export const commonFoods: FoodItem[] = [
  createFoodItem('Hafer Flocken Zart', 372, 13.5, 59, 7, 100),
  createFoodItem('Vollmilch 3.5%', 65, 3.4, 4.7, 3.5, 100, 'ml'),
  createFoodItem('Banane', 89, 1.1, 22.8, 0.3, 100),
  createFoodItem('Apfel', 52, 0.3, 14, 0.2, 100),
  createFoodItem('Hühnerbrust', 165, 31, 0, 3.6, 100),
  createFoodItem('Lachs', 208, 20, 0, 13, 100),
  createFoodItem('Reis gekocht', 130, 2.7, 28, 0.3, 100),
  createFoodItem('Kartoffel gekocht', 86, 1.7, 20, 0.1, 100),
  createFoodItem('Vollkornbrot', 247, 8.4, 41.3, 3.4, 100),
  createFoodItem('Ei', 155, 12.6, 1.1, 11.2, 100),
  createFoodItem('Griechischer Joghurt', 133, 9.7, 3.9, 9.1, 100),
  createFoodItem('Mandeln', 579, 21.2, 21.7, 49.9, 100),
  createFoodItem('Olivenöl', 884, 0, 0, 100, 100, 'ml'),
  createFoodItem('Thunfisch in Wasser', 116, 25.5, 0, 1, 100),
  createFoodItem('Quinoa gekocht', 120, 4.4, 21.3, 1.9, 100),
  createFoodItem('Brokkoli', 34, 2.8, 7, 0.4, 100),
  createFoodItem('Süßkartoffel', 86, 1.6, 20.1, 0.1, 100),
  createFoodItem('Kichererbsen', 364, 15, 61, 6, 100),
  createFoodItem('Tofu', 76, 8, 1.9, 4.8, 100),
  createFoodItem('Hafermilch', 46, 1.4, 6.6, 1.5, 100, 'ml', 'Oatly'),
];

export function searchLocalFoods(query: string): FoodItem[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (normalizedQuery.length < 2) return [];
  
  return commonFoods.filter(food => 
    food.name.toLowerCase().includes(normalizedQuery) ||
    food.brand?.toLowerCase().includes(normalizedQuery)
  );
} 