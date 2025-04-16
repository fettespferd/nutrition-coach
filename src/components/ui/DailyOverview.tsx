import React from 'react';
import { useNutritionStore } from '@/lib/store';

interface ProgressBarProps {
  current: number;
  target: number;
  label: string;
  color: string;
}

function ProgressBar({ current, target, label, color }: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{current} / {target}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function DailyOverview() {
  const { dailyNutrition, nutritionGoals } = useNutritionStore();
  
  // Berechne die Zielwerte basierend auf den Prozentsätzen
  const targetProtein = (nutritionGoals.dailyCalories * (nutritionGoals.proteinPercentage / 100)) / 4; // 4 kcal pro Gramm Protein
  const targetCarbs = (nutritionGoals.dailyCalories * (nutritionGoals.carbsPercentage / 100)) / 4; // 4 kcal pro Gramm Kohlenhydrate
  const targetFat = (nutritionGoals.dailyCalories * (nutritionGoals.fatPercentage / 100)) / 9; // 9 kcal pro Gramm Fett

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Tagesübersicht</h2>
      
      <div className="space-y-4">
        <ProgressBar
          current={dailyNutrition.totalCalories}
          target={nutritionGoals.dailyCalories}
          label="Kalorien (kcal)"
          color="bg-blue-500"
        />
        
        <ProgressBar
          current={dailyNutrition.totalProtein}
          target={targetProtein}
          label="Protein (g)"
          color="bg-red-500"
        />
        
        <ProgressBar
          current={dailyNutrition.totalCarbs}
          target={targetCarbs}
          label="Kohlenhydrate (g)"
          color="bg-green-500"
        />
        
        <ProgressBar
          current={dailyNutrition.totalFat}
          target={targetFat}
          label="Fett (g)"
          color="bg-yellow-500"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Nährwertverteilung</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-lg font-semibold text-red-500">
              {Math.round((dailyNutrition.totalProtein * 4 / dailyNutrition.totalCalories) * 100 || 0)}%
            </div>
            <div className="text-sm text-gray-500">Protein</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-lg font-semibold text-green-500">
              {Math.round((dailyNutrition.totalCarbs * 4 / dailyNutrition.totalCalories) * 100 || 0)}%
            </div>
            <div className="text-sm text-gray-500">Kohlenhydrate</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-lg font-semibold text-yellow-500">
              {Math.round((dailyNutrition.totalFat * 9 / dailyNutrition.totalCalories) * 100 || 0)}%
            </div>
            <div className="text-sm text-gray-500">Fett</div>
          </div>
        </div>
      </div>
    </div>
  );
} 