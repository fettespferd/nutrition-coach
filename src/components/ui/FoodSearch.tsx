import React, { useState } from 'react';
import { FoodItem } from '@/types/nutrition';
import { searchFoods } from '@/lib/api';
import AmountSelector from './AmountSelector';
import FoodCategories from './FoodCategories';

interface FoodSearchProps {
  onSelect: (food: FoodItem) => void;
}

export default function FoodSearch({ onSelect }: FoodSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [amount, setAmount] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchFoods(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Fehler bei der Suche:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setAmount(food.servingSize || 100);
  };

  const handleAmountConfirm = () => {
    if (selectedFood) {
      const adjustedFood: FoodItem = {
        ...selectedFood,
        servingSize: amount,
        nutrients: {
          ...selectedFood.nutrients,
          calories: {
            ...selectedFood.nutrients.calories,
            amount: (selectedFood.nutrients.calories.amount * amount) / 100
          },
          protein: {
            ...selectedFood.nutrients.protein,
            amount: (selectedFood.nutrients.protein.amount * amount) / 100
          },
          carbohydrates: {
            ...selectedFood.nutrients.carbohydrates,
            amount: (selectedFood.nutrients.carbohydrates.amount * amount) / 100
          },
          fat: {
            ...selectedFood.nutrients.fat,
            amount: (selectedFood.nutrients.fat.amount * amount) / 100
          }
        }
      };
      onSelect(adjustedFood);
      setSelectedFood(null);
      setQuery('');
      setResults([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Lebensmittel suchen..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 
                   focus:border-transparent"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500" />
          </div>
        )}
      </div>

      {results.length > 0 && !selectedFood && (
        <div className="border rounded-lg divide-y max-h-60 overflow-y-auto">
          {results.map((food) => (
            <button
              key={food.id}
              onClick={() => handleFoodSelect(food)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex justify-between 
                       items-center"
            >
              <div>
                <div className="font-medium">{food.name}</div>
                {food.brand && (
                  <div className="text-sm text-gray-500">{food.brand}</div>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {food.nutrients.calories.amount} kcal / {food.servingSize}
                {food.servingUnit}
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedFood && (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{selectedFood.name}</h3>
              {selectedFood.brand && (
                <p className="text-sm text-gray-500">{selectedFood.brand}</p>
              )}
            </div>
            <button
              onClick={() => setSelectedFood(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex justify-between items-center">
            <AmountSelector
              amount={amount}
              unit={selectedFood.servingUnit || 'g'}
              onChange={setAmount}
            />
            <button
              onClick={handleAmountConfirm}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                       transition-colors"
            >
              Hinzufügen
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-gray-600">Kalorien</p>
              <p className="font-medium">
                {((selectedFood.nutrients.calories.amount * amount) / 100).toFixed(1)} kcal
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600">Protein</p>
              <p className="font-medium">
                {((selectedFood.nutrients.protein.amount * amount) / 100).toFixed(1)}g
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600">Kohlenhydrate</p>
              <p className="font-medium">
                {((selectedFood.nutrients.carbohydrates.amount * amount) / 100).toFixed(1)}g
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600">Fett</p>
              <p className="font-medium">
                {((selectedFood.nutrients.fat.amount * amount) / 100).toFixed(1)}g
              </p>
            </div>
          </div>
        </div>
      )}

      {!selectedFood && query.length < 2 && (
        <FoodCategories onSelect={handleFoodSelect} />
      )}
    </div>
  );
} 