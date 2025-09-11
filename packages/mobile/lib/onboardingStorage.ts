import * as SecureStore from 'expo-secure-store';

const ONBOARDING_KEY = 'onboardingCompleted';

export async function getIsOnboarded(): Promise<boolean> {
   try {
      const value = await SecureStore.getItemAsync(ONBOARDING_KEY);
      return value === 'true';
   } catch {
      return false;
   }
}

export async function setOnboarded(): Promise<void> {
   try {
      await SecureStore.setItemAsync(ONBOARDING_KEY, 'true');
   } catch {
      // ignore
   }
}
