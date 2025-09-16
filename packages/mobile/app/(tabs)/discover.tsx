import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '@/lib/axios';

export default function discover() {
   const [data, setData] = useState(null);

   const fetchData = async () => {
      try {
         const response = await axiosInstance.get('/test');
         console.log(response.data?.data);
         setData(response.data?.data);
         await axiosInstance.post('/users', {
            emailAddress: 'kidusbw@gmail.com',
            username: 'kidusbw',
         });
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <View className=" flex-1 justify-center items-center">
         <Text className="text-xl font-bold">{data}</Text>
      </View>
   );
}
