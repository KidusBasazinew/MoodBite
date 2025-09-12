import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
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
   console.log(process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);
   return (
      <ClerkProvider
         publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
         tokenCache={tokenCache}
      >
         <Stack>
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />

            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
               name="food_detail"
               //   component={FoodDetail}
               options={{ headerShown: false }}
            />
         </Stack>
      </ClerkProvider>
   );
}
