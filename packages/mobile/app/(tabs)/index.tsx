import React from 'react';
import {
   ImageBackground,
   Text,
   TextInput,
   View,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   StyleSheet,
} from 'react-native';
import robot from '../../assets/images/robot_recomanded.png';
import Button from '../components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';

const schema = z.object({
   feeling: z.string().min(2, 'Feeling must be at least 2 characters'),
   location: z.string().min(2, 'Location must be at least 2 characters'),
});
type FormData = z.infer<typeof schema>;

export default function Index() {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({
      resolver: zodResolver(schema),
   });

   const onSubmit = (data: FormData) => {
      console.log('Form submitted:', data);
      router.push({ pathname: '/food_detail', params: { ...data } });
   };

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={styles.container}
      >
         <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
         >
            {/* Robot Image */}
            <ImageBackground source={robot} style={styles.robot} />

            {/* Greeting Text */}
            <Text style={styles.greeting} className="font-primary">
               Hi! I’m MOOdy 🤖. How are you feeling today? Tell me, and I’ll
               suggest the perfect food!
            </Text>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
               {/* Mood Input */}
               <View style={styles.inputWrapper}>
                  <MaterialIcons
                     name="sentiment-satisfied-alt"
                     size={24}
                     color="gray"
                  />
                  <Controller
                     control={control}
                     name="feeling"
                     render={({ field: { onChange, value } }) => (
                        <TextInput
                           className="font-primary"
                           style={styles.textInput}
                           placeholder="Type your mood..."
                           placeholderTextColor="#999"
                           value={value}
                           onChangeText={onChange}
                        />
                     )}
                  />
               </View>
               {errors.feeling && (
                  <Text className="font-primary text-red-500">
                     {errors.feeling.message}
                  </Text>
               )}

               {/* Location Input */}
               <View style={styles.inputWrapper}>
                  <MaterialIcons name="location-on" size={24} color="gray" />

                  <Controller
                     control={control}
                     name="location"
                     render={({ field: { onChange, value } }) => (
                        <TextInput
                           className="font-primary"
                           style={styles.textInput}
                           placeholder="What is your location?"
                           placeholderTextColor="#999"
                           value={value}
                           onChangeText={onChange}
                        />
                     )}
                  />
               </View>
               {errors.location && (
                  <Text className="mr-12 font-primary  text-red-500">
                     {errors.location.message}
                  </Text>
               )}
               <Button
                  title="Get Recommendations"
                  containerStyle={'mt-4'}
                  onPress={handleSubmit(onSubmit)}
               />
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 40,
   },
   robot: {
      width: 208, // w-52
      height: 192, // h-48
      marginBottom: 16,
   },
   greeting: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
      color: '#374151', // gray-700
      marginBottom: 24,
   },
   inputContainer: {
      width: '100%',
      gap: 2,
   },
   inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#D1D5DB', // gray-300
      borderRadius: 9999,
      height: 48,
      paddingHorizontal: 16,
      marginBottom: 2,
   },
   textInput: {
      flex: 1,
      fontSize: 14,
      paddingVertical: 0, // keeps text vertically centered
   },
});
