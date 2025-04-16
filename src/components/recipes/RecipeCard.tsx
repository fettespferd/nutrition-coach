import Image from 'next/image';
import { Recipe } from '@/types/nutrition';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect?: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Card 
      className="w-full max-w-sm hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect?.(recipe)}
    >
      <CardHeader className="p-0">
        {recipe.imageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={recipe.imageUrl}
              alt={recipe.name}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
        <p className="text-gray-600 line-clamp-2 mb-4">{recipe.description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{totalTime} Min.</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} Port.</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex justify-between w-full text-sm">
          <span>Kalorien: {recipe.totalNutrients.calories}</span>
          <span>Protein: {recipe.totalNutrients.protein}g</span>
        </div>
      </CardFooter>
    </Card>
  );
} 