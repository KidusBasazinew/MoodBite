import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
   Image,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   StyleSheet,
   Text,
   TextInput,
   View,
} from 'react-native';
import { z } from 'zod';
import Button from './components/Button';
import logo from '../assets/images/logo.png';

const schema = z.object({
   name: z.string().min(2, 'Enter your name'),
   email: z.string().email('Enter a valid email'),
   password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function Signup() {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({ resolver: zodResolver(schema) });

   const onSubmit = (data: FormData) => {
      console.log('Signup:', data);
      router.replace('/(tabs)');
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
            <Image source={logo} className="w-24 h-24" />
            <Text style={styles.title} className="mt-10 font-bolder">
               Create account
            </Text>
            <Text style={styles.subtitle} className="font-primary">
               Join MoodBite today
            </Text>

            <View style={styles.inputContainer}>
               <View style={styles.inputWrapper}>
                  <MaterialIcons name="person" size={24} color="gray" />
                  <Controller
                     control={control}
                     name="name"
                     render={({ field: { onChange, value } }) => (
                        <TextInput
                           style={styles.textInput}
                           className="font-primary"
                           placeholder="Full name"
                           placeholderTextColor="#999"
                           value={value}
                           onChangeText={onChange}
                        />
                     )}
                  />
               </View>
               {errors.name && (
                  <Text className="font-primary text-red-500">
                     {errors.name.message}
                  </Text>
               )}

               <View style={styles.inputWrapper}>
                  <MaterialIcons name="email" size={24} color="gray" />
                  <Controller
                     control={control}
                     name="email"
                     render={({ field: { onChange, value } }) => (
                        <TextInput
                           style={styles.textInput}
                           className="font-primary"
                           placeholder="Email"
                           placeholderTextColor="#999"
                           autoCapitalize="none"
                           keyboardType="email-address"
                           value={value}
                           onChangeText={onChange}
                        />
                     )}
                  />
               </View>
               {errors.email && (
                  <Text className="font-primary text-red-500">
                     {errors.email.message}
                  </Text>
               )}

               <View style={styles.inputWrapper}>
                  <MaterialIcons name="lock" size={24} color="gray" />
                  <Controller
                     control={control}
                     name="password"
                     render={({ field: { onChange, value } }) => (
                        <TextInput
                           style={styles.textInput}
                           className="font-primary"
                           placeholder="Password"
                           placeholderTextColor="#999"
                           secureTextEntry
                           value={value}
                           onChangeText={onChange}
                        />
                     )}
                  />
               </View>
               {errors.password && (
                  <Text className="font-primary text-red-500">
                     {errors.password.message}
                  </Text>
               )}

               <Button
                  title="Sign Up"
                  containerStyle={'mt-4'}
                  onPress={handleSubmit(onSubmit)}
               />

               <View className="mt-4 flex-row justify-center">
                  <Text className="font-primary text-gray-600">
                     Already have an account?{' '}
                  </Text>
                  <Link href="/login" className="font-primary text-yellow-500">
                     Log in
                  </Link>
               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
}

const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: '#fff' },
   scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 40,
   },
   title: { fontSize: 24, textAlign: 'center', marginBottom: 4 },
   subtitle: {
      fontSize: 14,
      color: '#6B7280',
      textAlign: 'center',
      marginBottom: 16,
   },
   inputContainer: { width: '100%', gap: 2 },
   inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 9999,
      height: 48,
      paddingHorizontal: 16,
      marginBottom: 2,
   },
   textInput: { flex: 1, fontSize: 14, paddingVertical: 0 },
});
