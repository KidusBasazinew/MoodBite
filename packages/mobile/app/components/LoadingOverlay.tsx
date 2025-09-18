import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface Props {
   message?: string;
}

const LoadingOverlay = ({ message = 'Loading...' }: Props) => {
   return (
      <View
         style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.35)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 50,
         }}
      >
         <View
            style={{
               backgroundColor: 'rgba(0,0,0,0.6)',
               paddingHorizontal: 20,
               paddingVertical: 16,
               borderRadius: 16,
               alignItems: 'center',
               gap: 8,
            }}
         >
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ color: 'white', fontWeight: '600' }}>{message}</Text>
         </View>
      </View>
   );
};

export default LoadingOverlay;
