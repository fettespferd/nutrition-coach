import { Recipe } from '@/types/nutrition';
import { v4 as uuidv4 } from 'uuid';

const createNutrient = (name: string, amount: number, unit: string) => ({
  name,
  amount,
  unit
});

const createFoodItem = (name: string, servingSize: number, servingUnit: string, calories: number, protein: number, carbs: number, fat: number, brand?: string) => ({
  id: uuidv4(),
  name,
  brand,
  servingSize,
  servingUnit,
  nutrients: {
    calories: createNutrient('Kalorien', calories, 'kcal'),
    protein: createNutrient('Protein', protein, 'g'),
    carbohydrates: createNutrient('Kohlenhydrate', carbs, 'g'),
    fat: createNutrient('Fett', fat, 'g')
  }
});

export const exampleRecipes: Recipe[] = [
  {
    id: uuidv4(),
    name: 'Klassische Lasagne',
    description: 'Eine traditionelle italienische Lasagne mit Hackfleisch, Tomatensauce und Béchamel.',
    ingredients: [
      {
        foodItem: createFoodItem('Rinderhackfleisch', 500, 'g', 1185, 125, 0, 74),
        amount: 500,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Lasagneplatten', 250, 'g', 875, 30, 175, 3),
        amount: 250,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Passierte Tomaten', 500, 'ml', 100, 5, 20, 0),
        amount: 500,
        unit: 'ml'
      },
      {
        foodItem: createFoodItem('Milch', 500, 'ml', 325, 17, 24, 18),
        amount: 500,
        unit: 'ml'
      },
      {
        foodItem: createFoodItem('Butter', 50, 'g', 371, 0.4, 0.1, 41),
        amount: 50,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Geriebener Käse', 200, 'g', 740, 45, 2, 60),
        amount: 200,
        unit: 'g'
      }
    ],
    instructions: [
      'Hackfleisch in einer Pfanne anbraten und mit Salz und Pfeffer würzen.',
      'Passierte Tomaten hinzufügen und 20 Minuten köcheln lassen.',
      'Béchamelsauce aus Butter, Mehl und Milch zubereiten.',
      'Lasagneform abwechselnd mit Nudelplatten, Hackfleischsauce und Béchamel schichten.',
      'Mit geriebenem Käse bestreuen.',
      'Bei 180°C für 45 Minuten backen.'
    ],
    servings: 6,
    prepTime: 30,
    cookTime: 45,
    totalNutrients: {
      calories: 3596,
      protein: 222,
      carbohydrates: 221,
      fat: 196
    },
    imageUrl: '/images/recipes/lasagne.jpg'
  },
  {
    id: uuidv4(),
    name: 'Vegetarische Lasagne',
    description: 'Gemüselasagne mit Zucchini, Auberginen und Spinat.',
    ingredients: [
      {
        foodItem: createFoodItem('Zucchini', 300, 'g', 51, 3.6, 9, 0.6),
        amount: 300,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Aubergine', 300, 'g', 75, 3, 18, 0.6),
        amount: 300,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Spinat', 200, 'g', 46, 5.6, 7.2, 0.8),
        amount: 200,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Lasagneplatten', 250, 'g', 875, 30, 175, 3),
        amount: 250,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Ricotta', 250, 'g', 437, 27.5, 10, 32),
        amount: 250,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Tomatensauce', 500, 'ml', 215, 8, 45, 2),
        amount: 500,
        unit: 'ml'
      }
    ],
    instructions: [
      'Gemüse in Scheiben schneiden und kurz anbraten.',
      'Spinat mit Ricotta vermischen.',
      'Lasagneform schichten: Tomatensauce, Nudelplatten, Gemüse, Ricotta-Spinat-Mischung.',
      'Mit Käse bestreuen.',
      'Bei 180°C für 40 Minuten backen.'
    ],
    servings: 6,
    prepTime: 35,
    cookTime: 40,
    totalNutrients: {
      calories: 1699,
      protein: 77.7,
      carbohydrates: 264.2,
      fat: 38.4
    },
    imageUrl: '/images/recipes/veggie-lasagne.jpg'
  },
  {
    id: uuidv4(),
    name: 'Bananen-Porridge mit Toppings',
    description: 'Cremiges Haferflocken-Porridge mit Banane und verschiedenen Toppings.',
    ingredients: [
      {
        foodItem: createFoodItem('Haferflocken', 60, 'g', 236, 8.4, 42.6, 4.8),
        amount: 60,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Banane', 120, 'g', 107, 1.3, 27.4, 0.4),
        amount: 120,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Mandelmilch', 250, 'ml', 30, 1, 0, 2.5),
        amount: 250,
        unit: 'ml'
      },
      {
        foodItem: createFoodItem('Chiasamen', 10, 'g', 49, 1.7, 4.2, 3.1),
        amount: 10,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Honig', 15, 'g', 45, 0, 12.3, 0),
        amount: 15,
        unit: 'g'
      }
    ],
    instructions: [
      'Haferflocken mit Mandelmilch in einem Topf erhitzen.',
      'Die halbe Banane zerdrücken und unterrühren.',
      'Restliche Banane in Scheiben schneiden.',
      'Porridge in eine Schüssel geben.',
      'Mit Bananenscheiben, Chiasamen und Honig toppen.'
    ],
    servings: 1,
    prepTime: 5,
    cookTime: 10,
    totalNutrients: {
      calories: 467,
      protein: 12.4,
      carbohydrates: 86.5,
      fat: 10.8
    },
    imageUrl: '/images/recipes/banana-porridge.jpg'
  },
  {
    id: uuidv4(),
    name: 'Quinoa-Gemüse-Bowl',
    description: 'Gesunde Bowl mit Quinoa, geröstetem Gemüse und Avocado.',
    ingredients: [
      {
        foodItem: createFoodItem('Quinoa', 75, 'g', 274, 10.1, 48.1, 4.4),
        amount: 75,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Süßkartoffel', 150, 'g', 135, 2.1, 31.5, 0.2),
        amount: 150,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Brokkoli', 100, 'g', 34, 2.8, 6.6, 0.4),
        amount: 100,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Kichererbsen', 120, 'g', 180, 8.9, 30, 2.9),
        amount: 120,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Avocado', 75, 'g', 120, 1.5, 6.4, 11),
        amount: 75,
        unit: 'g'
      }
    ],
    instructions: [
      'Quinoa nach Packungsanweisung kochen.',
      'Süßkartoffel würfeln und mit Olivenöl bei 200°C rösten.',
      'Brokkoli dämpfen oder kurz blanchieren.',
      'Kichererbsen mit Gewürzen rösten.',
      'Alle Zutaten in einer Bowl anrichten.',
      'Mit Avocadoscheiben toppen.'
    ],
    servings: 2,
    prepTime: 15,
    cookTime: 25,
    totalNutrients: {
      calories: 743,
      protein: 25.4,
      carbohydrates: 122.6,
      fat: 18.9
    },
    imageUrl: '/images/recipes/quinoa-bowl.jpg'
  },
  {
    id: uuidv4(),
    name: 'Protein-Pancakes',
    description: 'Fluffige Pancakes mit extra Protein und frischen Beeren.',
    ingredients: [
      {
        foodItem: createFoodItem('Proteinpulver Vanille', 30, 'g', 116, 24, 3, 1.5, 'MyProtein'),
        amount: 30,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Haferflocken', 40, 'g', 157, 5.6, 28.4, 3.2),
        amount: 40,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Banane', 100, 'g', 89, 1.1, 22.8, 0.3),
        amount: 100,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Eier', 100, 'g', 155, 12.6, 1.1, 11.2),
        amount: 100,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Beeren-Mix', 100, 'g', 43, 0.7, 10.1, 0.4),
        amount: 100,
        unit: 'g'
      }
    ],
    instructions: [
      'Haferflocken zu Mehl verarbeiten.',
      'Alle Zutaten (außer Beeren) zu einem glatten Teig verrühren.',
      'Pancakes in einer beschichteten Pfanne von beiden Seiten goldbraun backen.',
      'Mit frischen Beeren servieren.'
    ],
    servings: 2,
    prepTime: 10,
    cookTime: 15,
    totalNutrients: {
      calories: 560,
      protein: 44,
      carbohydrates: 65.4,
      fat: 16.6
    },
    imageUrl: '/images/recipes/protein-pancakes.jpg'
  },
  {
    id: uuidv4(),
    name: 'Griechischer Salat',
    description: 'Klassischer griechischer Salat mit Feta und Oliven.',
    ingredients: [
      {
        foodItem: createFoodItem('Tomaten', 200, 'g', 36, 1.8, 7.8, 0.4),
        amount: 200,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Gurke', 200, 'g', 30, 1.3, 7.2, 0.2),
        amount: 200,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Rote Zwiebel', 50, 'g', 20, 0.7, 4.6, 0.1),
        amount: 50,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Feta', 100, 'g', 264, 14.2, 4.1, 21.3),
        amount: 100,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Kalamata Oliven', 50, 'g', 75, 0.5, 3.8, 7.5),
        amount: 50,
        unit: 'g'
      },
      {
        foodItem: createFoodItem('Olivenöl', 30, 'ml', 270, 0, 0, 30),
        amount: 30,
        unit: 'ml'
      }
    ],
    instructions: [
      'Tomaten und Gurken in grobe Stücke schneiden.',
      'Zwiebel in dünne Ringe schneiden.',
      'Feta würfeln.',
      'Alle Zutaten in einer Schüssel mischen.',
      'Mit Olivenöl, Salz und Oregano würzen.'
    ],
    servings: 2,
    prepTime: 15,
    cookTime: 0,
    totalNutrients: {
      calories: 695,
      protein: 18.5,
      carbohydrates: 27.5,
      fat: 59.5
    },
    imageUrl: '/images/recipes/greek-salad.jpg'
  }
]; 