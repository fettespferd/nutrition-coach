import React from 'react';
import { FoodItem } from '@/types/nutrition';
import { commonFoods } from '@/data/food-database';

interface FoodCategoriesProps {
  onSelect: (food: FoodItem) => void;
}

const categories = [
  {
    name: 'Proteinquellen',
    foods: ['Hühnerbrust', 'Lachs', 'Thunfisch in Wasser', 'Tofu', 'Ei', 'Hüttenkäse', 'Schwarze Bohnen']
  },
  {
    name: 'Kohlenhydrate',
    foods: ['Reis gekocht', 'Kartoffel gekocht', 'Quinoa gekocht', 'Vollkornbrot', 'Süßkartoffel', 'Hafer Flocken Zart']
  },
  {
    name: 'Gemüse',
    foods: ['Brokkoli', 'Karotten', 'Spinat', 'Paprika', 'Tomaten', 'Avocado']
  },
  {
    name: 'Obst',
    foods: ['Banane', 'Apfel', 'Orange', 'Beeren', 'Kiwi']
  },
  {
    name: 'Milchprodukte',
    foods: ['Griechischer Joghurt', 'Vollmilch 3.5%', 'Hafermilch', 'Hüttenkäse']
  },
  {
    name: 'Öle & Fette',
    foods: ['Olivenöl', 'Butter', 'Mandeln']
  },
  {
    name: 'Nüsse & Samen',
    foods: ['Mandeln', 'Leinsamen', 'Chia Samen', 'Erdnussbutter']
  },
  {
    name: 'Hülsenfrüchte',
    foods: ['Kichererbsen', 'Schwarze Bohnen', 'Tofu']
  }
];

export default function FoodCategories({ onSelect }: FoodCategoriesProps) {
  // Prüfe, ob ein Element in der Datenbank existiert
  const getFoodItem = (foodName: string): FoodItem | undefined => {
    // Exakte Übereinstimmung zuerst prüfen
    let foodItem = commonFoods.find(f => f.name === foodName);
    
    // Wenn nicht gefunden, probiere teilweise Übereinstimmung
    if (!foodItem) {
      foodItem = commonFoods.find(f => 
        f.name.toLowerCase().includes(foodName.toLowerCase()) ||
        foodName.toLowerCase().includes(f.name.toLowerCase())
      );
    }
    
    return foodItem;
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Häufig verwendet</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.name}>
            <h4 className="text-sm font-medium text-gray-700 mb-2">{category.name}</h4>
            <div className="flex flex-wrap gap-2">
              {category.foods.map((food) => {
                const foodItem = getFoodItem(food);
                return (
                  <button
                    key={food}
                    onClick={() => {
                      if (foodItem) onSelect(foodItem);
                    }}
                    disabled={!foodItem}
                    className={`px-3 py-1 text-sm rounded-full 
                      ${foodItem 
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer' 
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'}
                      transition-colors`}
                  >
                    {food}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}