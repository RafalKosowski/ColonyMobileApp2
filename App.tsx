// App.tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/LoginScreen';
import Dashboard from './src/screens/Dashboard';
import ColonyManagement from './src/screens/ColonyManagement';
import PaymentScreen from './src/screens/PaymentScreen';
// import { checkToken } from './src/services/auth'; // Funkcja sprawdzająca token
import { RootStackParamList } from './src/navigation/AppNavigator'; // Importowanie typów

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLogin = async () => {
      const token = await AsyncStorage.getItem('token');
    };

    checkUserLogin();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
              
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="ColonyManagement" component={ColonyManagement} />
              <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
