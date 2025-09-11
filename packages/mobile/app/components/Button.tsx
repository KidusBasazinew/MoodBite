import { View, Text } from 'react-native';
import React from 'react';

interface Props {
   title?: string;
   onPress?: () => void;
   containerStyle?: string;
   textStyle?: object;
   disabled?: boolean;
}

const Button = ({
   title,
   onPress,
   containerStyle,
   textStyle,
   disabled,
}: Props) => {
   return (
      <View
         className={`bg-yellow-400 rounded-full px-6 py-3 ${containerStyle}`}
      >
         <Text
            className={`text-center ${textStyle} text-white font-bolder`}
            onPress={onPress}
            disabled={disabled}
         >
            {title}
         </Text>
      </View>
   );
};

export default Button;
