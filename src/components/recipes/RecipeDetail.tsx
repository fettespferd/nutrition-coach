import Image from 'next/image';
import { Recipe } from '@/types/nutrition';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Clock, Users, Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecipeDetailProps {
  recipe: Recipe;
  onAddToFavorites?: () => void;
  onAddToMeal?: () => void;
}

export function RecipeDetail({ recipe, onAddToFavorites, onAddToMeal }: RecipeDetailProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Linke Spalte mit Bild und Grundinfos */}
        <div className="md:w-1/2">
          {recipe.imageUrl ? (
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image
                src={recipe.imageUrl}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-square bg-gray-200 rounded-lg" />
          )}
          
          <div className="flex gap-2 mt-4">
            <Button 
              className="flex-1" 
              variant="outline"
              onClick={onAddToFavorites}
            >
              <Heart className="w-4 h-4 mr-2" />
              Zu Favoriten
            </Button>
            <Button 
              className="flex-1"
              onClick={onAddToMeal}
            >
              <Plus className="w-4 h-4 mr-2" />
              Zu Mahlzeit
            </Button>
          </div>

          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Gesamtzeit: {totalTime} Min.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{recipe.servings} Portionen</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader className="p-4 pb-2">
              <h3 className="font-semibold">Nährwerte pro Portion</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                <p>Kalorien: {Math.round(recipe.totalNutrients.calories / recipe.servings)} kcal</p>
                <p>Protein: {Math.round(recipe.totalNutrients.protein / recipe.servings)}g</p>
                <p>Kohlenhydrate: {Math.round(recipe.totalNutrients.carbohydrates / recipe.servings)}g</p>
                <p>Fett: {Math.round(recipe.totalNutrients.fat / recipe.servings)}g</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rechte Spalte mit Zutaten und Anleitung */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
          <p className="text-gray-600 mb-6">{recipe.description}</p>

          <Card className="mb-6">
            <CardHeader className="p-4 pb-2">
              <h2 className="text-xl font-semibold">Zutaten</h2>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{ingredient.foodItem.name}</span>
                    <span>
                      {ingredient.amount} {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <h2 className="text-xl font-semibold">Zubereitung</h2>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ol className="list-decimal list-inside space-y-2">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 