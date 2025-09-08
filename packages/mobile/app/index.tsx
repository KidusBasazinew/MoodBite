import { Text, View } from 'react-native';
import './global.css';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';

export default function Index() {
   const [data, setData] = useState(null);

   const fetchData = async () => {
      const response = await axios.get('/test');
      setData(response.data.data);
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <View>
         <Text className="text-9xl text-red-600">
            {data ? data : 'Loading...'}
         </Text>
      </View>
   );
}
