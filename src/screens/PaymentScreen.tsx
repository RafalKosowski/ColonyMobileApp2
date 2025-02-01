import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Linking } from 'react-native';
import { createPayment } from '../services/payment';

const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handlePayment = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Błąd', 'Podaj poprawną kwotę.');
      return;
    }

    const paymentData = {
      amount: parsedAmount,
      description: description,
      rodzicId: 2,
      koloniaDieckoId: 2,
      rodzajPlatnosciId: 2,
      walutaId: 3,
    };

    try {
      
       const paymentResponse = await createPayment(paymentData);
     const redirectUrl = paymentResponse.redirectUrl;
    
      if (redirectUrl) {
        // Przekierowanie na otrzymany URL w przeglądarce
        Linking.openURL(redirectUrl).catch(err => 
          Alert.alert('Błąd', 'Nie udało się otworzyć strony: ' + err)
        );
      } else {
        Alert.alert('Błąd', 'Brak URL do przekierowania.');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Coś poszło nie tak.');
    }
  };

  return (
    <View>
      <Text>Kwota:</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Wpisz kwotę"
      />
      <Text>Opis:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Wpisz opis płatności"
      />
      <Button title="Zatwierdź płatność" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;
