// Dashboard.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { DashboardNavigationProp } from '../navigation/AppNavigator'; // Importowanie typu
import AsyncStorage from '@react-native-async-storage/async-storage';

// Typowanie propsów ekranu, aby używały typu nawigacji
type Props = { 
  navigation: DashboardNavigationProp; // Typowanie nawigacji
};

const Dashboard: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Panel Główny</Text>

      <Button
        title="Zarządzanie kolonią"
        onPress={() => navigation.navigate('ColonyManagement')}
      />

      <Button
        title="Płatności"
        onPress={() => navigation.navigate('PaymentScreen')}
      />

      <Button
        title="Wyloguj"
        onPress={() => {
          AsyncStorage.removeItem('token');
          navigation.replace('Login');
        }}
      />
    </View>
  );
};

export default Dashboard;
