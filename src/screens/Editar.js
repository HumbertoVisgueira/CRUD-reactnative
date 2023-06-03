import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import EmojiPicker from 'rn-emoji-keyboard';
import { updateDoc, doc } from 'firebase/firestore';
import { database } from '../../config/fb';

export default function Editar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, emoji, name, price, isSold } = route.params;
  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(price.toString());
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(emoji);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdate = async () => {
    if (editedName === '' || editedPrice === '') {
      // Verifica se os campos estão vazios
      setErrorMessage('Preencha todos os campos');
      return;
    }

    try {
      // Atualize o documento no banco de dados com os novos valores
      const productRef = doc(database, 'products', id);
      await updateDoc(productRef, {
        name: editedName,
        price: parseInt(editedPrice),
        emoji: selectedEmoji,
      });
      navigation.goBack();
    } catch (error) {
      console.log('Erro ao atualizar o documento: ', error);
    }
  };

  const handlePickEmoji = (emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
    setIsEmojiPickerOpen(false);
  };

  const formatPrice = (value) => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/[^0-9]/g, '');
    // Divide o valor em partes inteiras e decimais
    const integerPart = numericValue.slice(0, -2);
    const decimalPart = numericValue.slice(-2);
    // Formata o valor com a adição do "R$" e a vírgula separando as partes decimais
    const formattedValue = `R$ ${integerPart},${decimalPart}`;
    return formattedValue;
  };

  const handlePriceChange = (value) => {
    // Verifica se o valor inserido contém apenas números
    const numericValue = value.replace(/[^0-9]/g, '');
    setEditedPrice(numericValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar produto</Text>
      <View style={styles.emojiContainer}>
        <Text
          style={styles.emoji}
          onPress={() => setIsEmojiPickerOpen(true)}
        >
          {selectedEmoji}
        </Text>
        {isEmojiPickerOpen && (
          <EmojiPicker
            onEmojiSelected={handlePickEmoji}
            open={isEmojiPickerOpen}
            onClose={() => setIsEmojiPickerOpen(false)}
          />
        )}
      </View>
      <TextInput
        style={styles.inputContainer}
        value={editedName}
        onChangeText={setEditedName}
      />
      <TextInput
        style={styles.inputContainer}
        value={formatPrice(editedPrice)}
        onChangeText={handlePriceChange}
        keyboardType="numeric"
      />
      <Button title="Atualizar" onPress={handleUpdate} />
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
    padding: 10,
    margin: 6,
    borderRadius: 6,
    backgroundColor: '#ddd',
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
