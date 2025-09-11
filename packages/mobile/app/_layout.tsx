import { Stack } from 'expo-router';
import './global.css';
import { useFonts } from 'expo-font';

export default function RootLayout() {
   const [fontsLoaded] = useFonts({
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
   });

   if (!fontsLoaded) {
      return null; // or a splash screen
   }

   return (
      <Stack>
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen
            name="food_detail"
            //   component={FoodDetail}
            options={{ headerShown: false }}
         />
      </Stack>
   );
}
