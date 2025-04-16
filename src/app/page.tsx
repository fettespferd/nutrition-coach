'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DailyOverview from '@/components/ui/DailyOverview';
import MealList from '@/components/ui/MealList';
import FoodSearch from '@/components/ui/FoodSearch';
import { useNutritionStore } from '@/lib/store';
import { FoodItem } from '@/types/nutrition';

export default function Home() {
  const { addMealItem } = useNutritionStore();
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');

  const handleFoodSelect = (food: FoodItem) => {
    addMealItem(selectedMealType, food);
  };

  const mealTypes = [
    { id: 'breakfast', name: 'Frühstück' },
    { id: 'lunch', name: 'Mittagessen' },
    { id: 'dinner', name: 'Abendessen' },
    { id: 'snacks', name: 'Snacks' },
  ];

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Linke Spalte - Tagesübersicht und Mahlzeiten */}
        <div className="lg:col-span-8 space-y-6">
          <DailyOverview />
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <MealList />
          </div>
        </div>

        {/* Rechte Spalte - Lebensmittel hinzufügen */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6 sticky top-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Lebensmittel hinzufügen
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {mealTypes.map((meal) => (
                  <button
                    key={meal.id}
                    onClick={() => setSelectedMealType(meal.id as typeof selectedMealType)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedMealType === meal.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {meal.name}
                  </button>
                ))}
              </div>
            </div>

            <FoodSearch onSelect={handleFoodSelect} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 