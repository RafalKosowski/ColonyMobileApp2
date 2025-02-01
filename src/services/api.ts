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
  } catch (error) {
    throw error;
  }
};

export default api;
