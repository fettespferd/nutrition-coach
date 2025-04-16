import { FoodItem } from '@/types/nutrition';
import { searchLocalFoods } from '@/data/food-database';

export async function searchFoods(query: string): Promise<FoodItem[]> {
  return searchLocalFoods(query);
} 