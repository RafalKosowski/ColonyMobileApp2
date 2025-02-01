import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getChildren, addChild, removeChild } from '../services/colony';

// Typ dla dziecka
type Child = {
  id: number;
  imie: string;
  nazwisko: string;
  dataUrodzenia: string;
};

// Typ odpowiedzi z API
type GetChildrenResponse = {
  data: Child[];
};

const ColonyManagement = () => {
  const [children, setChildren] = useState<Child[]>([]); // Typowanie dla listy dzieci
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [dataUrodzenia, setDataUrodzenia] = useState(''); // Nowe pole dla dataUrodzenia
  const [grupaId, setGrupaId] = useState(0);  // Nowe pole dla grupaId
  const [statusId, setStatusId] = useState(0);  // Nowe pole dla statusId
  const rodzicId = 1; // Możesz dynamicznie pobrać z API

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      const response: GetChildrenResponse = await getChildren(rodzicId);
      const data = response.data;  // Zakładając, że dane są w polu `data`
      setChildren(data);
    } catch (error) {
      console.error("Błąd ładowania dzieci", error);
    }
  };

  const handleAddChild = async () => {
    if (imie && nazwisko && dataUrodzenia) {
      const dziecko = {
        id: 1,  // Dodaj id
        dzieckoId: 123,
        imie: "Jan",
        nazwisko: "Kowalski",
        dataUrodzenia: "2010-01-01",
        grupaId: 5,
        statusId: 1
      };
  
      try {
        await addChild(dziecko);  // Przesyłamy obiekt do funkcji addChild
        loadChildren();  // Ładujemy ponownie dzieci po dodaniu
      } catch (error) {
        console.error("Błąd dodawania dziecka", error);
      }
    } else {
      console.error("Wszystkie pola muszą być wypełnione!");
    }
  };
  

  const handleRemoveChild = async (id: number) => {
    try {
      await removeChild(id);
      loadChildren(); // Ładujemy ponownie dzieci po usunięciu
    } catch (error) {
      console.error("Błąd usuwania dziecka", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Dodaj dziecko:</Text>
      <TextInput
        placeholder="Imię"
        value={imie}
        onChangeText={setImie}
        style={styles.input}
      />
      <TextInput
        placeholder="Nazwisko"
        value={nazwisko}
        onChangeText={setNazwisko}
        style={styles.input}
      />
      <TextInput
        placeholder="Data urodzenia"
        value={dataUrodzenia}
        onChangeText={setDataUrodzenia}
        style={styles.input}
      />
      <TextInput
        placeholder="Grupa ID"
        keyboardType="numeric"
        value={grupaId.toString()}
        onChangeText={(value) => setGrupaId(parseInt(value))}
        style={styles.input}
      />
      <TextInput
        placeholder="Status ID"
        keyboardType="numeric"
        value={statusId.toString()}
        onChangeText={(value) => setStatusId(parseInt(value))}
        style={styles.input}
      />
      <Button
        title="Dodaj"
        onPress={handleAddChild}
      />

      <FlatList
        data={children}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.childContainer}>
            <Text>{item.imie} {item.nazwisko} - {item.dataUrodzenia}</Text>
            <Button
              title="Usuń"
              onPress={() => handleRemoveChild(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  childContainer: {
    marginVertical: 10,
  },
});

export default ColonyManagement;
