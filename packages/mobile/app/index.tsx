import { Text, View } from 'react-native';
import './global.css';
export default function Index() {
   return (
      <View
         style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <Text className="text-9xl text-red-600">Hello</Text>
         <Text className="text-9xl text-red-600">Hello</Text>
         <Text className="text-9xl text-red-600">Hello</Text>
      </View>
   );
}
