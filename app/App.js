import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handlerSub = () => setCount(count - 1);
  const handlerText = (text) => setText(text);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Busca CEP:</Text>
      <View style={styles.buttonContainer}>
        <TextInput style={styles.inputText} placeholder="Digite aqui..." onChangeText={handlerText}/>
        <Button title="Buscar" onPress={handlerSub} />
      </View>
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
});