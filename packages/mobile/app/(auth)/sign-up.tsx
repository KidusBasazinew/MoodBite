import { useSignUp } from '@clerk/clerk-expo';
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
   TouchableOpacity,
   View,
} from 'react-native';
import { z } from 'zod';
import logo from '../../assets/images/logo.png';
import Button from '../components/Button';

const verificationSchema = z.object({
   code: z.string().min(6, 'Enter a valid code'),
});

const signUpSchema = z.object({
   username: z.string().min(2, 'Enter your username'),
   email: z.string().email('Enter a valid email'),
   password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof signUpSchema>;
type VerificationData = z.infer<typeof verificationSchema>;
export default function Signup() {
   const { isLoaded, signUp, setActive } = useSignUp();
   const [pendingVerification, setPendingVerification] = React.useState(false);
   const [verificationError, setVerificationError] = React.useState<string>('');
   const [isVerifying, setIsVerifying] = React.useState(false);
   const [signUpError, setSignUpError] = React.useState<string>('');
   const [isSigningUp, setIsSigningUp] = React.useState(false);

   // const [code, setCode] = React.useState('');
   const {
      control: verificationControl,
      handleSubmit: handleVerifySubmit,
      formState: { errors: verificationErrors },
   } = useForm<VerificationData>({ resolver: zodResolver(verificationSchema) });

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({ resolver: zodResolver(signUpSchema) });

   const onSubmit = async (data: FormData) => {
      if (!isLoaded) return;
      console.log(data);
      try {
         await signUp.create({
            username: data.username,
            emailAddress: data.email,
            password: data.password,
         });

         // Send user an email with verification code
         await signUp.prepareEmailAddressVerification({
            strategy: 'email_code',
         });
         // Set 'pendingVerification' to true to display second form
         // and capture OTP code
         setPendingVerification(true);
      } catch (error: any) {
         console.error(JSON.stringify(error, null, 2));
      }
   };

   const onVerifyPress = async (data: VerificationData) => {
      if (!isLoaded) return;

      try {
         const signUpAttempt = await signUp.attemptEmailAddressVerification({
            code: data.code,
         });

         if (signUpAttempt.status === 'complete') {
            await setActive({ session: signUpAttempt.createdSessionId });
            router.replace('/');
         } else {
            // If the status is not complete, check why. User may need to
            // complete further steps.
            console.error(JSON.stringify(signUpAttempt, null, 2));
         }
      } catch (error: any) {
         // See https://clerk.com/docs/custom-flows/error-handling
         // for more info on error handling
         console.error(JSON.stringify(error, null, 2));
      }
   };

   if (pendingVerification) {
      return (
         <View className="flex-1 justify-center items-center px-6">
            <Text className="text-2xl font-bold mb-6">Verify your email</Text>
            <Text className="text-gray-600 mb-8 text-center">
               We've sent a verification code to your email address. Please
               enter it below.
            </Text>

            <Controller
               control={verificationControl}
               name="code"
               render={({ field: { onChange, value } }) => (
                  <TextInput
                     style={styles.textInput}
                     className="font-primary"
                     placeholder="Enter verification code"
                     placeholderTextColor="#999"
                     value={value}
                     onChangeText={onChange}
                     keyboardType="numeric"
                     maxLength={6}
                     editable={!isVerifying}
                  />
               )}
            />

            {verificationErrors.code && (
               <Text className="font-primary text-red-500 mt-2">
                  {verificationErrors.code.message}
               </Text>
            )}

            {verificationError && (
               <Text className="font-primary text-red-500 mt-2 text-center">
                  {verificationError}
               </Text>
            )}

            <TouchableOpacity
               onPress={handleVerifySubmit(onVerifyPress)}
               disabled={isVerifying}
               className={`mt-6 px-8 py-3 rounded-lg ${
                  isVerifying ? 'bg-gray-400' : 'bg-blue-500'
               }`}
            >
               <Text className="text-white font-bold">
                  {isVerifying ? 'Verifying...' : 'Verify'}
               </Text>
            </TouchableOpacity>

            <TouchableOpacity
               onPress={() => setPendingVerification(false)}
               className="mt-4"
               disabled={isVerifying}
            >
               <Text className="text-blue-500">Back to sign up</Text>
            </TouchableOpacity>
         </View>
      );
   }

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
                     name="username"
                     render={({ field: { onChange, value } }) => (
                        <TextInput
                           style={styles.textInput}
                           className="font-primary"
                           placeholder="User name"
                           placeholderTextColor="#999"
                           value={value}
                           onChangeText={onChange}
                        />
                     )}
                  />
               </View>
               {errors.username && (
                  <Text className="font-primary text-red-500">
                     {errors.username.message}
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
                  <Link
                     href="/sign-in"
                     className="font-primary text-yellow-500"
                  >
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
