// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { login } from '../services/auth';

type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>; // Typowanie dla ekranu logowania

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Błąd', 'Wprowadź email i hasło.');
      return;
    }

    try {
      await login(email, password);
      navigation.replace('Dashboard'); // Przejście do Dashboard po zalogowaniu
    } catch (error: unknown) {
      if (typeof error === 'string') {
        Alert.alert('Błąd logowania', error);
      } else if (error instanceof Error) {
        Alert.alert('Błąd logowania', error.message);
      } else {
        Alert.alert('Błąd logowania', 'Wystąpił nieznany błąd.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Logowanie</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input} 
          placeholder="Wprowadź email"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Hasło</Text>
        <TextInput 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword} 
          style={styles.input} 
          placeholder="Wprowadź hasło"
        />
      </View>
      
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#343a40',
    textAlign: 'center',
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#495057',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginScreen;
