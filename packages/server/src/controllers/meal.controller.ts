import { GoogleGenerativeAI } from '@google/generative-ai';
import { type Request, type Response } from 'express';
import prisma from '../prismaClient';

interface UnsplashPhoto {
   urls: {
      regular: string;
   };
}

interface UnsplashResponse {
   results: UnsplashPhoto[];
}
export const createMeal = async (req: Request, res: Response) => {
   const { clerkId, mood, location } = req.body;
   // - Preferences: ${preferences?.join(', ') || 'none'}
   // - Allergies: ${allergies?.join(', ') || 'none'}

   console.log(clerkId, mood, location);

   try {
      const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;
      const prompt = `
       Generate a meal recommendation that can improve someone’s mood. 
         The output should be structured and include all fields below. 
         Consider the user’s mood, location, preferences, and allergies if given. 
         Provide realistic food items and nutrition values.
    Generate a meal recommendation that can improve someone’s mood.
    Output in valid JSON ONLY, following this structure.

    Consider:
    - Mood: ${mood}
    - Location: ${location}
    - name: short name of the meal you prepare for me

    JSON format:
    {
      "name":"short name of the meal you prepare for me",
      "mood": "${mood}",
      "location": "${location}",
      "description": "A short appetizing description of the meal.",
      "ingredients": ["item1", "item2", "item3"],
      "recipe": ["step 1", "step 2", "step 3"],
      "nutrition": [
        {
          "name": "Main Nutrition Info",
          "amount": 250,
          "unit": "g",
          "calories": 500,
          "protein": 25,
          "carbs": 60,
          "fat": 15,
          "sugar": 5,
          "fiber": 8
        }
      ]
    }
    `;

      const textResult = await genAi
         .getGenerativeModel({ model: 'gemini-1.5-flash' })
         .generateContent([prompt]);

      const mealData = parseMarkdownToJson(textResult.response.text());

      if (!mealData) {
         console.error('AI returned invalid JSON:', textResult.response.text());
         return res.status(500).json({ error: 'Invalid AI JSON' });
      }

      // const searchQuery =
      //    meal.name?.trim() || meal.description?.trim() || meal.mood?.trim();

      const searchQuery = getUnsplashQuery(mealData);
      const query = `food ${searchQuery}`.trim(); // e.g., "food salmon bowl"
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${unsplashApiKey}&orientation=squarish&per_page=3`;

      const imageResponse = await fetch(url);

      const data = (await imageResponse.json()) as UnsplashResponse;

      const imagesUrl = data.results
         .map((photo) => photo.urls?.regular)
         .filter(Boolean);

      const user = await prisma.user.findUnique({
         where: { clerkId },
      });

      if (!user) {
         return res.status(404).json({ error: 'User not found' });
      }
      const savedMeal = await prisma.meal.create({
         data: {
            userId: user?.id, // from req.body
            name: mealData.name,
            mood: mealData.mood || mood,
            location: mealData.location || location,
            description: mealData.description,
            imageUrls: imagesUrl,
            ingredients: mealData.ingredients,
            recipe: mealData.recipe,
            nutrition: {
               create: mealData.nutrition.map((n: any) => ({
                  name: n.name,
                  amount: n.amount,
                  unit: n.unit,
                  calories: n.calories,
                  protein: n.protein,
                  carbs: n.carbs,
                  fat: n.fat,
                  sugar: n.sugar,
                  fiber: n.fiber,
               })),
            },
         },
         include: { nutrition: true },
      });

      res.status(201).json({ meal: { savedMeal } });
   } catch (error) {
      console.error('❌ Backend error:', error);
      res.status(500).json({
         error: error instanceof Error ? error.message : String(error),
      });
   }
};
function parseMarkdownToJson(markdown: string): any {
   try {
      // Remove markdown code fences if they exist
      const cleaned = markdown
         .replace(/```json\s*/gi, '') // remove ```json
         .replace(/```\s*/g, '') // remove ```
         .trim();

      // Try parsing into JSON
      return JSON.parse(cleaned);
   } catch (error) {
      console.error('❌ Failed to parse JSON from markdown:', error);
      return null;
   }
}
export const getMeal = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const meal = await prisma.meal.findUnique({
         where: { id },
         include: {
            nutrition: true,
            user: {
               select: {
                  id: true,
                  username: true,
                  emailAddress: true,
               },
            },
         },
      });

      if (!meal) {
         return res.status(404).json({ error: 'Meal not found' });
      }

      res.status(200).json({ meal: { savedMeal: meal } });
   } catch (error) {
      console.error('Error fetching meal:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
};

export const getNutritionByMealId = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      if (!id) {
         return res.status(404).json({ message: 'Meal not found!' });
      }

      const nutrition = await prisma.nutrition.findFirst({
         where: { mealId: id },
      });

      if (!nutrition) {
         return res.status(404).json({ message: 'Nutrition not found!' });
      }

      res.status(200).json({ nutrition });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
};

function getUnsplashQuery(meal: any) {
   if (!meal) return 'food';
   // Use only main name keywords
   let query = meal.name || meal.description || meal.mood;
   query = query.split('with')[0].split('(')[0].split(',')[0].trim();
   return query || 'food';
}
