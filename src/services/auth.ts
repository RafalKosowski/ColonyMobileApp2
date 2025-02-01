import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://localhost:7290/api';

// Typowanie parametrów w funkcji api
const api = async (endpoint: string, method: string = 'GET', body: any = null): Promise<any> => {
  const token = await AsyncStorage.getItem('token');
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error('Błąd w żądaniu API');
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Teraz error jest typu Error i możemy używać jego właściwości
      throw new Error(error.message || 'Nieznany błąd');
    } else {
      // Obsługuje przypadek, gdy error nie jest typu Error
      throw new Error('Nieznany błąd');
    }
  }
};
// services/auth.ts


// Funkcja logowania
export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await api('/Login', 'POST', { email, password });
    // Możesz zapisać token w AsyncStorage, jeśli odpowiedź zawiera token
    if (response.token) {
      await AsyncStorage.setItem('token', response.token);
    }
    return response;
  } catch (error: unknown) {
    throw new Error('Błąd logowania: ' + (error instanceof Error ? error.message : 'Nieznany błąd'));
  }
};


export default api;
