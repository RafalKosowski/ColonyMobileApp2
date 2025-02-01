import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://localhost:7290/api';

// Funkcja do pobierania tokena z AsyncStorage
const getToken = async (): Promise<string | null> => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

export const createPayment = async (paymentData: {
  amount: number;
  description: string;
  rodzicId: number;
  koloniaDieckoId: number;
  rodzajPlatnosciId: number;
  walutaId: number;
}) => {
  const token = await getToken();

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${API_URL}/payments/create`, {
      method: 'POST',
      headers,
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Błąd przy tworzeniu płatności');
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Błąd przy tworzeniu płatności');
    } else {
      throw new Error('Nieznany błąd');
    }
  }
};
