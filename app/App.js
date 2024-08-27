import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [text, setText] = useState('');
  const [address, setAddress] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(true);

  const handleTextChange = (text) => setText(text);

  const searchAddress = () => {
    axios.get(`https://viacep.com.br/ws/${text}/json/`)
      .then(response => {
        setAddress(response.data);
        setIsSearchMode(false);
      })
  };

  const handleNewSearch = () => {
    setIsSearchMode(true);
    setAddress(null);
    setText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Busca CEP</Text>
      <TextInput 
        style={styles.inputText} 
        placeholder="Digite aqui..." 
        onChangeText={handleTextChange}
        keyboardType="numeric"
        value={text}
        editable={isSearchMode}
      />
      <Button 
        title={isSearchMode ? "Buscar" : "Nova Busca"} 
        onPress={isSearchMode ? searchAddress : handleNewSearch} 
      />
      {address && !isSearchMode && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>CEP: {address.cep}</Text>
          <Text style={styles.resultText}>Logradouro: {address.logradouro}</Text>
          <Text style={styles.resultText}>Bairro: {address.bairro}</Text>
          <Text style={styles.resultText}>Localidade: {address.localidade}</Text>
          <Text style={styles.resultText}>UF: {address.uf}</Text>
          <Text style={styles.resultText}>IBGE: {address.ibge}</Text>
          <Text style={styles.resultText}>DDD: {address.ddd}</Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '80%',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginVertical: 10,
  },
});
