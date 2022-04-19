import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import Home from './Screens/Home';
import OrderandReview from './Screens/OrderandReview';
import AllOrders from './Screens/AllOrders';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SmartXLiving" component={Login} />
        <Stack.Screen name="SmartXLiving" component={Home} />
        <Stack.Screen name="Review and Confirm Choice" component={OrderandReview} />
        <Stack.Screen name="Previous Choices" component={AllOrders} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
