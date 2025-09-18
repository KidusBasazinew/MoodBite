import React, { useRef, useState } from 'react';
import {
   View,
   Image,
   FlatList,
   Dimensions,
   TouchableOpacity,
   Animated,
   StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface Props {
   meal: {
      imageUrls: string[];
   };
}

const MealImageCarousel: React.FC<Props> = ({ meal }) => {
   const router = useRouter();
   const scrollX = useRef(new Animated.Value(0)).current;
   const [currentIndex, setCurrentIndex] = useState(0);

   return (
      <View style={styles.container}>
         {/* Image Carousel */}
         <FlatList
            data={meal.imageUrls}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            onScroll={Animated.event(
               [{ nativeEvent: { contentOffset: { x: scrollX } } }],
               { useNativeDriver: false }
            )}
            onMomentumScrollEnd={(e) => {
               const index = Math.round(e.nativeEvent.contentOffset.x / width);
               setCurrentIndex(index);
            }}
            renderItem={({ item }) => (
               <Image
                  source={{ uri: item }}
                  style={styles.image}
                  resizeMode="cover"
               />
            )}
         />

         {/* Back Button */}
         <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
         >
            <Feather name="chevron-left" size={24} color="white" />
         </TouchableOpacity>

         {/* Pagination Dots */}
         <View style={styles.dotsContainer}>
            {meal.imageUrls.map((_, i) => {
               const opacity = scrollX.interpolate({
                  inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp',
               });

               return (
                  <Animated.View key={i} style={[styles.dot, { opacity }]} />
               );
            })}
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      position: 'relative',
      width: '100%',
      height: 260,
   },
   image: {
      width: width,
      height: 260,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
   },
   backButton: {
      position: 'absolute',
      top: 16,
      left: 16,
      padding: 8,
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: 20,
   },
   dotsContainer: {
      position: 'absolute',
      bottom: 12,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
   },
   dot: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: 'white',
      marginHorizontal: 4,
   },
});

export default MealImageCarousel;
