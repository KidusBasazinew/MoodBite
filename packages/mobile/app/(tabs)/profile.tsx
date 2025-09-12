import { View, Text, Image, Alert } from 'react-native';
import React from 'react';
import { useClerk, useUser } from '@clerk/clerk-expo';
import Button from '../components/Button';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
   const { user } = useUser();
   const { signOut } = useClerk();

   const handleSignOut = async () => {
      try {
         await signOut();
         router.replace('/sign-in');
      } catch (err) {
         console.error(JSON.stringify(err, null, 2));
      }
   };

   const handlePickImage = async () => {
      const permission =
         await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
         return Alert.alert(
            'Permission required',
            'We need access to your photos'
         );
      }

      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ use this in your version
         allowsEditing: true,
         aspect: [1, 1],
         quality: 0.8,
      });

      if (!result.canceled) {
         const asset = result.assets[0];

         // ✅ Create a file-like object (no blob needed)
         const file = {
            uri: asset.uri,
            name: 'profile.jpg',
            type: 'image/jpeg',
         } as any;

         try {
            await user?.setProfileImage({ file });
            await user?.reload(); // Refresh user data
         } catch (error) {
            console.error('Upload failed', error);
         }
      }
   };

   return (
      <View className="flex-1 justify-center items-center gap-4">
         <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
         />
         <Text>{user?.emailAddresses[0]?.emailAddress}</Text>
         <Text>{user?.username}</Text>

         <Button title="Upload Profile Image" onPress={handlePickImage} />
         <Button title="Log Out" onPress={handleSignOut} />
      </View>
   );
};

export default Profile;
