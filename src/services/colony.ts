import AsyncStorage from '@react-native-async-storage/async-storage';

// Typowanie danych dzieci
type Child = {
  id: number;
  imie: string;
  nazwisko: string;
  dataUrodzenia: string;  // Zakładając, że data jest w formacie ISO 8601 (np. "2000-01-01")
};

// Typowanie odpowiedzi dla dzieci
interface GetChildrenResponse {
  data: Child[];
}

const API_URL = 'https://localhost:7290/api';

// Funkcja do pobierania tokena z AsyncStorage
const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('token');
};

// Funkcja pobierająca dzieci na podstawie rodzica
export const getChildren = async (rodzicId: number): Promise<GetChildrenResponse> => {
  const token = await getToken();

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${API_URL}/Dziecko/rodzic/${rodzicId}`, { method: 'GET', headers });
    if (!response.ok) {
      throw new Error(`Błąd w żądaniu API: ${response.statusText}`);
    }
    const data: GetChildrenResponse = await response.json();
    return data; // Zwrócenie danych dzieci
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Błąd pobierania dzieci');
    } else {
      throw new Error('Nieznany błąd');
    }
  }
};

// Funkcja dodająca dziecko z dodatkowymi danymi
export const addChild = async (childData: Child): Promise<any> => {
  const token = await getToken();

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${API_URL}/Dziecko`, {
      method: 'POST',
      headers,
      body: JSON.stringify(childData),
    });

    if (!response.ok) {
      throw new Error(`Błąd dodawania dziecka: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Błąd dodawania dziecka');
    } else {
      throw new Error('Nieznany błąd');
    }
  }
};

// Funkcja usuwająca dziecko
export const removeChild = async (id: number): Promise<any> => {
  const token = await getToken();

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${API_URL}/Dziecko/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Błąd usuwania dziecka: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Błąd usuwania dziecka');
    } else {
      throw new Error('Nieznany błąd');
    }
  }
};
