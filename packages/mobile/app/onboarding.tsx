import { Link, Redirect, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Dimensions, Image, Text, View } from 'react-native';
import { getIsOnboarded, setOnboarded } from '../lib/onboardingStorage';
import Button from './components/Button';

const { width } = Dimensions.get('window');

import onboard1 from '../assets/images/onboard_1.png';
import onboard2 from '../assets/images/onboard_2.png';
import onboard3 from '../assets/images/onboard_3.png';

const slides = [
   {
      key: 'mood',
      title: 'Food for Every Mood',
      subtitle: 'Tell us how you feel.',
      image: onboard1,
   },
   {
      key: 'ai',
      title: 'AI-Powered Picks',
      subtitle: 'Smart AI suggestions.',
      image: onboard2,
   },
   {
      key: 'location',
      title: 'Start your journey',
      subtitle: 'Discover foods that boost your mood.',
      image: onboard3,
   },
];

export default function OnboardingScreen() {
   const router = useRouter();
   const [done, setDone] = useState<boolean | null>(null);
   const [index, setIndex] = useState(0);

   const scrollRef = useRef<ScrollView>(null);
   // useEffect(() => {
   //    getIsOnboarded().then((v) => setDone(v));
   // }, []);
   if (done === true) return <Redirect href="/(tabs)" />;

   const goNext = () => {
      if (index < slides.length - 1) {
         const next = index + 1;
         setIndex(next);
         scrollRef.current?.scrollTo({ x: next * width, animated: true });
      } else {
         // setOnboarded().then(() => router.replace('/(tabs)'));
         router.replace('/sign-in');
      }
   };

   return (
      <View className="flex-1 bg-white">
         <View className="mt-16 mb-6 items-center">
            <Text className="text-3xl font-bolder">MoodBite</Text>
            <View className="mt-2 h-1 w-24 rounded-full bg-yellow-400" />
         </View>

         <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
               const newIndex = Math.round(
                  e.nativeEvent.contentOffset.x / width
               );
               setIndex(newIndex);
            }}
         >
            {slides.map((s) => (
               <View
                  key={s.key}
                  style={{ width }}
                  className="px-6 flex flex-col justify-center items-center"
               >
                  <View className="items-center">
                     <Image
                        source={s.image}
                        style={{ width: width * 0.7, height: width * 0.7 }}
                        resizeMode="contain"
                     />
                  </View>
                  <Text className="mt-6 text-center text-2xl font-bolder">
                     {s.title}
                  </Text>
                  <Text className="font-primary mt-2 text-center text-gray-600">
                     {s.subtitle}
                  </Text>
               </View>
            ))}
         </ScrollView>

         <View className="mb-6 items-center">
            <View className="mb-4 flex-row items-center justify-center gap-2">
               {slides.map((_, i) => (
                  <View
                     key={i}
                     className={`h-2 rounded-full ${i === index ? 'w-6 bg-yellow-400' : 'w-2 bg-gray-300'}`}
                  />
               ))}
            </View>
            <Button
               title={index === slides.length - 1 ? 'Get Started' : 'Next'}
               onPress={goNext}
               containerStyle="w-11/12"
            />
            <Link href="/(tabs)" className="mt-3 text-gray-500 underline">
               Skip for now
            </Link>
         </View>
      </View>
   );
}
