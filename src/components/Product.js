import React from 'react';
import * as RN from 'react-native';
import { database } from '../../config/fb';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Product({
  id,
  emoji,
  name,
  price,
  isSold,
}) {
  const navigation = useNavigation();

  const onDelete = () => {
    const docRef = doc(database, 'products', id);
    deleteDoc(docRef);
  };

  const onEdit = () => {
    const docRef = doc(database, 'products', id);
    updateDoc(docRef, {
      isSold: true,
    });
  };

  const handleEdit = () => {
    navigation.navigate('Editar', {
      id: id,
      emoji: emoji,
      name: name,
      price: price,
      isSold: isSold,
    });
  };

  const formatPrice = (value) => {
    const numericValue = value.toString();
    const integerPart = numericValue.slice(0, -2);
    const decimalPart = numericValue.slice(-2);
    const formattedValue = `R$ ${integerPart},${decimalPart}`;
    return formattedValue;
  };

  return (
    <RN.View>
      <RN.View style={styles.productContainer}>
        <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {emoji ? <RN.Text style={styles.emoji}>{emoji}</RN.Text> : null}
          <RN.View style={{ flexDirection: 'row' }}>
            <AntDesign onPress={handleEdit} name="edit" size={24} color="blue" style={styles.editButton} />
            <AntDesign onPress={onDelete} name="delete" size={24} color="red" />
          </RN.View>
        </RN.View>
        <RN.Text style={styles.name}>{name}</RN.Text>
        <RN.Text style={styles.price}>{formatPrice(price)}</RN.Text>
        {isSold ? (
          <RN.TouchableOpacity
            style={[styles.button, { backgroundColor: 'gray' }]}
          >
            <RN.Text style={styles.buttonText}>Vendido</RN.Text>
          </RN.TouchableOpacity>
        ) : (
          <RN.TouchableOpacity onPress={onEdit} style={styles.button}>
            <RN.Text style={styles.buttonText}>Comprar</RN.Text>
          </RN.TouchableOpacity>
        )}
      </RN.View>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  productContainer: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
  },
  emoji: {
    fontSize: 100,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
  },
  button: {
    backgroundColor: '#0FA5E9',
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    marginRight: 15,
  },
});
