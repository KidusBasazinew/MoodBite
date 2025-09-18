import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

interface Props {
   title?: string;
   onPress?: () => void;
   containerStyle?: string;
   textStyle?: object;
   disabled?: boolean;
   loading?: boolean;
}

const Button = ({
   title,
   onPress,
   containerStyle,
   textStyle,
   disabled,
   loading,
}: Props) => {
   return (
      <View
         className={`bg-yellow-400 rounded-full px-6 py-3 ${containerStyle}`}
      >
         {loading ? (
            <ActivityIndicator color="#fff" />
         ) : (
            <Text
               className={`text-center ${textStyle} text-white font-bolder`}
               onPress={onPress}
               disabled={disabled}
            >
               {title}
            </Text>
         )}
      </View>
   );
};

export default Button;
