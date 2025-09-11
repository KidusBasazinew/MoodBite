import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import './global.css';

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
         <Stack.Screen name="onboarding" options={{ headerShown: false }} />
         <Stack.Screen name="login" options={{ headerShown: false }} />
         <Stack.Screen name="signup" options={{ headerShown: false }} />
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen
            name="food_detail"
            //   component={FoodDetail}
            options={{ headerShown: false }}
         />
      </Stack>
   );
}
