import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [text, setText] = useState('');
  const [address, setAddress] = useState(null);

  const valueChangeEvent = (text) => setText(text);
  const searchAddress = () => {
    if (text) {
      axios.get(`https://viacep.com.br/ws/${text}/json/`)
        .then(response => {
          if (response.data.erro) {
            Alert.alert('Erro', 'CEP não encontrado!');
          } else {
            setAddress(response.data);
          }
        })
        .catch(() => {
          Alert.alert('Erro', 'Não foi possível buscar o CEP!');
        });
    } else {
      Alert.alert('Atenção', 'Digite um CEP válido!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Busca CEP:</Text>
      <View style={styles.buttonContainer}>
        <TextInput 
          style={styles.inputText} 
          placeholder="Digite aqui..." 
          onChangeText={valueChangeEvent}
          keyboardType="numeric"
          value={text}
        />
        <Button title="Buscar" onPress={searchAddress} />
      </View>
      {address && (
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
  counterText: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  inputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    width: '80%',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 2,
  },
});