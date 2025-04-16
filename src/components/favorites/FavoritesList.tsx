import { FavoriteItem, Recipe, FoodItem } from '@/types/nutrition';
import { RecipeCard } from '../recipes/RecipeCard';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface FavoritesListProps {
  favorites: FavoriteItem[];
  recipes: Recipe[];
  foodItems: FoodItem[];
  onRemoveFavorite: (id: string) => void;
  onSelectRecipe?: (recipe: Recipe) => void;
  onSelectFood?: (food: FoodItem) => void;
}

export function FavoritesList({
  favorites,
  recipes,
  foodItems,
  onRemoveFavorite,
  onSelectRecipe,
  onSelectFood,
}: FavoritesListProps) {
  const favoriteRecipes = favorites
    .filter((fav) => fav.type === 'recipe')
    .map((fav) => ({
      favorite: fav,
      recipe: recipes.find((recipe) => recipe.id === fav.itemId)
    }))
    .filter((item): item is { favorite: FavoriteItem; recipe: Recipe } => item.recipe !== undefined);

  const favoriteFoods = favorites
    .filter((fav) => fav.type === 'food')
    .map((fav) => ({
      favorite: fav,
      food: foodItems.find((food) => food.id === fav.itemId)
    }))
    .filter((item): item is { favorite: FavoriteItem; food: FoodItem } => item.food !== undefined);

  return (
    <Tabs defaultValue="recipes" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="recipes">Rezepte</TabsTrigger>
        <TabsTrigger value="foods">Lebensmittel</TabsTrigger>
      </TabsList>
      <TabsContent value="recipes">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteRecipes.map(({ favorite, recipe }) => (
            <div key={favorite.id} className="relative">
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-10"
                onClick={() => onRemoveFavorite(favorite.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <RecipeCard
                recipe={recipe}
                onSelect={onSelectRecipe}
              />
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="foods">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteFoods.map(({ favorite, food }) => (
            <div key={favorite.id} className="relative">
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-10"
                onClick={() => onRemoveFavorite(favorite.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Card className="cursor-pointer" onClick={() => onSelectFood?.(food)}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{food.name}</h3>
                  {food.brand && <p className="text-sm text-gray-500">{food.brand}</p>}
                  <div className="mt-2">
                    <p>Kalorien: {food.nutrients.calories.amount}{food.nutrients.calories.unit}</p>
                    <p>Protein: {food.nutrients.protein.amount}{food.nutrients.protein.unit}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
} 