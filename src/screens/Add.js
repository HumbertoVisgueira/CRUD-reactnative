import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EmojiPicker from 'rn-emoji-keyboard';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../config/fb';

export default function Add() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    emoji: '📷',
    name: '',
    price: '',
    isSold: false,
    createdAt: new Date(),
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handlePick = (emojiObject) => {
    setNewItem({
      ...newItem,
      emoji: emojiObject.emoji,
    });
  };

  const onSend = async () => {
    if (newItem.name === '' || newItem.price === '') {
      // Verifica se os campos estão vazios
      setErrorMessage('Preencha todos os campos');
      return;
    }

    navigation.goBack();
    const docRef = await addDoc(collection(database, 'products'), newItem);
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const integerPart = numericValue.slice(0, -2);
    const decimalPart = numericValue.slice(-2);
    const formattedValue = `R$ ${integerPart},${decimalPart}`;
    return formattedValue;
  };

  const handlePriceChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setNewItem({ ...newItem, price: numericValue });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vender produto</Text>
      <Text onPress={() => setIsOpen(true)} style={styles.emoji}>
        {newItem.emoji}
      </Text>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <TextInput
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        style={styles.inputContainer}
        placeholder='Nome do Produto'
      />
      <TextInput
        onChangeText={handlePriceChange}
        value={formatPrice(newItem.price)}
        style={styles.inputContainer}
        placeholder='Preço R$'
        keyboardType='numeric'
      />
      <Button title='Publicar' onPress={onSend} />
      {errorMessage !== '' && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  emojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
  inputContainer: {
    width: '90%',
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});
