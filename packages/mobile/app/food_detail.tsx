import {
   View,
   Text,
   ScrollView,
   ImageBackground,
   Image,
   TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import moodImg from '../assets/icons/mood.png';
import light from '../assets/icons/light.png';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';
import axiosInstance from '@/lib/axios';
import MealImageCarousel from './components/MealImageCarousel';
type Nutrition = {
   name: string;
   amount: number;
   unit: string;
   calories: number;
   protein: number;
   carbs: number;
   fat: number;
   sugar: number;
   fiber: number;
};

type Meal = {
   name: string;
   mood: string;
   location: string;
   description: string;
   imageUrls: string[];
   ingredients: string[];
   recipe: string[];
   nutrition: Nutrition[];
};

const food_detail = () => {
   const { id } = useLocalSearchParams<{ id: string }>();
   const router = useRouter();

   const [meal, setMeal] = useState<Meal | null>(null);
   const [nutrition, setNutrition] = useState<Nutrition | null>(null);

   const getMeal = async () => {
      const response = await axiosInstance.get(`/meal/${id}`);
      console.log(response?.data?.meal?.savedMeal);

      setMeal(response?.data?.meal?.savedMeal);
   };
   const getNutritions = async () => {
      const response = await axiosInstance.get(`/meal/nutrition/${id}`);
      console.log(response?.data?.nutrition);

      setNutrition(response?.data?.nutrition);
   };

   useEffect(() => {
      getMeal();
      getNutritions();
   }, []);

   return (
      <SafeAreaProvider>
         <SafeAreaView edges={['top']}>
            <ScrollView>
               {/* <ImageBackground
                  source={{
                     uri: meal?.imageUrls[0],
                  }}
                  className="relative w-full h-64"
               >
                  <TouchableOpacity
                     onPress={() => router.back()}
                     className="absolute top-4 left-4"
                  >
                     <Feather
                        name="chevron-left"
                        size={24}
                        color="white"
                        className="
                        p-2 bg-gray-600 rounded-full opacity-80"
                     />
                  </TouchableOpacity>
               </ImageBackground> */}
               <MealImageCarousel meal={meal!} />
               <View className="-mt-6 bg-gray-100 rounded-t-3xl p-6 overflow-hidden">
                  <Text className="text-2xl font-bolder mb-2">
                     {meal?.name}
                  </Text>
                  <Text className="font-primary text-gray-600 leading-relaxed">
                     {meal?.description}
                  </Text>
               </View>
               <Text className="text-lg font-bolder p-4">
                  Nutrition Information
               </Text>
               <View className="flex flex-col">
                  <View className="flex flex-row justify-between px-4 py-2 border-b border-gray-200">
                     <View className="rounded-xl w-28 bg-white p-4 shadow-md">
                        <Text className="font-bolder text-4xl">
                           {nutrition?.calories}
                        </Text>
                        <Text className="font-primary text-center">
                           Calories
                        </Text>
                     </View>
                     <View className="rounded-xl w-28 bg-white p-4 shadow-md">
                        <Text className="font-bolder text-4xl text-center">
                           {nutrition?.protein}
                           <Text className="text-lg font-primary">
                              {nutrition?.unit}
                           </Text>
                        </Text>
                        <Text className="font-primary text-center">
                           Protein
                        </Text>
                     </View>
                     <View className="rounded-xl w-28 bg-white p-4 shadow-md">
                        <Text className="font-bolder text-4xl text-center">
                           {nutrition?.carbs}
                           <Text className="text-lg font-primary">
                              {nutrition?.unit}
                           </Text>
                        </Text>
                        <Text className="font-primary text-center">Carb</Text>
                     </View>
                  </View>
                  <View className="flex flex-row justify-between px-4 py-2 border-b border-gray-200">
                     <View className="rounded-xl w-28 bg-white p-4 shadow-md">
                        <Text className="font-bolder text-4xl">
                           {nutrition?.fat}
                           <Text className="text-lg font-primary">
                              {nutrition?.unit}
                           </Text>
                        </Text>
                        <Text className="font-primary text-center">Fat</Text>
                     </View>
                     <View className="rounded-xl w-28 bg-white p-4 shadow-md">
                        <Text className="font-bolder text-4xl text-center">
                           {nutrition?.fiber}
                           <Text className="text-lg font-primary">
                              {nutrition?.unit}
                           </Text>
                        </Text>
                        <Text className="font-primary text-center">Fiber</Text>
                     </View>
                     <View className="rounded-xl w-28 bg-white p-4 shadow-md">
                        <Text className="font-bolder text-4xl text-center">
                           {nutrition?.sugar}
                           <Text className="text-lg font-primary">
                              {nutrition?.unit}
                           </Text>
                        </Text>
                        <Text className="font-primary text-center">Suger</Text>
                     </View>
                  </View>
               </View>
               <View>
                  <Text className="font-bolder text-lg p-4">
                     Mood & Body Effect
                  </Text>

                  <View className="flex flex-col gap-y-2">
                     {/* First Card */}
                     <View className="flex-row items-center h-20 bg-orange-50 rounded-lg mx-5 px-3 shadow-sm">
                        <View className="w-10 h-10 items-center justify-center">
                           <Image source={moodImg} className="w-10 h-10" />
                        </View>
                        <View className="flex flex-col ml-3">
                           <Text className="font-bolder text-lg">Mood</Text>
                           <Text className="font-primary text-sm text-gray-600">
                              Uplifting, Energizing
                           </Text>
                        </View>
                     </View>

                     {/* Second Card */}
                     <View className="flex-row items-center h-20 bg-orange-50 rounded-lg mx-5 px-3 shadow-sm">
                        <View className="w-10 h-10 items-center justify-center">
                           <Image source={light} className="w-10 h-10" />
                        </View>
                        <View className="flex flex-col ml-3">
                           <Text className="font-bolder text-lg">
                              Body Effect
                           </Text>
                           <Text className="font-primary text-sm text-gray-600">
                              Relaxing, Refreshing
                           </Text>
                        </View>
                     </View>
                  </View>
               </View>
               <View className="p-6">
                  <Text className="text-2xl font-bolder mb-2">
                     Quick Recipe
                  </Text>
                  <Text className="font-primary text-gray-600 leading-relaxed">
                     A refreshing and nutritious salad packed with quinoa, fresh
                     vegetables, and a light vinaigrette. Perfect for a light
                     lunch or dinner.
                  </Text>
               </View>
               <View className="p-6">
                  <Text className="text-lg font-bolder mb-2">Ingredients</Text>
                  <View className="ml-2">
                     <View className=" space-y-1">
                        {meal?.ingredients.map((item, index) => (
                           <View key={index} className="flex-row items-center">
                              <EvilIcons
                                 name="check"
                                 size={20}
                                 color="green"
                                 className="mr-2"
                              />
                              <Text className="font-primary text-gray-700">
                                 {item}
                              </Text>
                           </View>
                        ))}
                     </View>
                  </View>
               </View>

               {/* Recipe Steps */}
               <View className="p-6">
                  <Text className="text-lg font-bolder mb-2">Recipe</Text>
                  <View className="ml-4">
                     {meal?.recipe?.map((rec, index) => {
                        return (
                           <Text
                              key={index}
                              className="font-primary text-gray-700 mb-1"
                           >
                              {index + 1}
                              {'. '}
                              {rec}
                           </Text>
                        );
                     })}
                  </View>
               </View>

               {/* YouTube Video */}
               <View className="p-6 h-64">
                  <Text className="text-lg font-bolder mb-2">
                     Watch Recipe Video
                  </Text>
                  <WebView
                     source={{
                        uri: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                     }}
                     className="flex-1 rounded-lg overflow-hidden"
                  />
               </View>
            </ScrollView>
         </SafeAreaView>
      </SafeAreaProvider>
   );
};

export default food_detail;
