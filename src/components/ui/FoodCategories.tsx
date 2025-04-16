import React from 'react';
import { FoodItem } from '@/types/nutrition';
import { commonFoods } from '@/data/food-database';

interface FoodCategoriesProps {
  onSelect: (food: FoodItem) => void;
}

const categories = [
  {
    name: 'Proteinquellen',
    foods: ['Hühnerbrust', 'Lachs', 'Thunfisch', 'Tofu', 'Ei']
  },
  {
    name: 'Kohlenhydrate',
    foods: ['Reis', 'Kartoffel', 'Quinoa', 'Vollkornbrot', 'Süßkartoffel']
  },
  {
    name: 'Gemüse',
    foods: ['Brokkoli', 'Karotten', 'Spinat', 'Paprika', 'Tomaten']
  },
  {
    name: 'Obst',
    foods: ['Banane', 'Apfel', 'Orange', 'Beeren', 'Kiwi']
  },
  {
    name: 'Milchprodukte',
    foods: ['Griechischer Joghurt', 'Vollmilch', 'Käse', 'Skyr', 'Hafermilch']
  }
];

export default function FoodCategories({ onSelect }: FoodCategoriesProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Häufig verwendet</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.name}>
            <h4 className="text-sm font-medium text-gray-700 mb-2">{category.name}</h4>
            <div className="flex flex-wrap gap-2">
              {category.foods.map((food) => (
                <button
                  key={food}
                  onClick={() => {
                    const foodItem = commonFoods.find(f => f.name.includes(food));
                    if (foodItem) onSelect(foodItem);
                  }}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 
                           text-gray-700 transition-colors"
                >
                  {food}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 