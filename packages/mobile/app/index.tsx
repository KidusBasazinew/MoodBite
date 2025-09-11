import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { getIsOnboarded } from '../lib/onboardingStorage';

export default function Index() {
   const [checked, setChecked] = useState(false);
   const [onboarded, setOnboarded] = useState(false);

   useEffect(() => {
      getIsOnboarded().then((v) => {
         setOnboarded(v);
         setChecked(true);
      });
   }, []);

   if (!checked) return null;

   if (onboarded) {
      return <Redirect href="/(tabs)" />;
   }
   return <Redirect href="/onboarding" />;
}
