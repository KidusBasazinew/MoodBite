import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import { View, Text } from 'react-native';

export default function TabLayout() {
   return (
      <Tabs
         screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false, // custom labels
            tabBarIcon: ({ focused }) => {
               let icon: any;

               if (route.name === 'index') {
                  // Use Octicons for Home
                  icon = (
                     <Octicons
                        name="home"
                        size={28}
                        color={focused ? 'black' : 'gray'}
                     />
                  );
               } else {
                  // Use MaterialIcons for others
                  let iconName: keyof typeof MaterialIcons.glyphMap = 'home';
                  if (route.name === 'discover') iconName = 'restaurant';
                  if (route.name === 'history') iconName = 'history';
                  if (route.name === 'profile') iconName = 'person-outline';

                  icon = (
                     <MaterialIcons
                        name={iconName}
                        size={28}
                        color={focused ? 'black' : 'gray'}
                     />
                  );
               }
               return (
                  <View className="items-center">
                     {/* Only the selected tab moves up and has yellow background */}
                     <View
                        className={`rounded-full items-center justify-center ${
                           focused
                              ? 'w-16 h-16 bg-yellow-400 -mt-4 shadow-lg'
                              : 'w-18 h-18  w-full mt-6'
                        }`}
                     >
                        {icon}
                     </View>
                     <Text
                        className={`w-full text-xs mt-1  ${
                           focused
                              ? 'font-bolder mt-5 text-black'
                              : 'font-primary text-gray-500'
                        }`}
                     >
                        {route.name === 'index'
                           ? 'Home'
                           : route.name.charAt(0).toUpperCase() +
                             route.name.slice(1)}
                     </Text>
                  </View>
               );
            },
            tabBarStyle: {
               position: 'absolute',
               height: 70,
               backgroundColor: 'white',
               borderTopWidth: 0,
               elevation: 0,
            },
         })}
      >
         <Tabs.Screen name="index" />
         <Tabs.Screen name="discover" />
         <Tabs.Screen name="history" />
         <Tabs.Screen name="profile" />
      </Tabs>
   );
}
