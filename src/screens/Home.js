import * as React from 'react';
/*import * as RN from 'react-native';*/
import { useNavigation } from '@react-navigation/native';
import { database } from '../../config/fb';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Product from '../components/Product';
import { Feather } from 'react-native-vector-icons';
import {View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';

export default function Home() {

    const [products, setProducts] = React.useState([]);
    const navigation = useNavigation();

 /*   React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <RN.Button title='Adicionar' onPress={() => navigation.navigate('Add')} />
        })
    },[navigation])*/

    React.useEffect(() => {
        const collectionRef = collection(database, 'products');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setProducts(
            querySnapshot.docs.map(doc => ({
                id: doc.id,
                emoji: doc.data().emoji,
                name: doc.data().name,
                price: doc.data().price,
                isSold: doc.data().isSold,
                createdAt: doc.data().createdAt,
            }))
          );
        });
    return unsubscribe;
    },[])

    return(

        <View style={styles.container}>
            <FlatList/>
            <TouchableOpacity
                style={styles.buttonadc}
                onPress={() => navigation.navigate('Add')}
            >
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>

        </View>

       /* <RN.View style={styles.container}>
            <RN.ScrollView contentContainerStyle={{paddingBottom: 100}}>
            <RN.Text style={styles.title}>Produtos</RN.Text>
                {products.map(product => <Product key={product.id} {...product} />)}
            </RN.ScrollView>
        </RN.View>*/
    )

}

/*const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3F9',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 16,
    },

});*/
const  style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        paddingTop:20,
    },
    buttonadc:{
      width:60,
      height:60,
      position:"absolute",
      bottom:30,
      right:20,
      backgroundColor:"#003366",
      borderRadius: 50,
      justifyContent:"center",
      alignItems:"center"


    },
    iconButton:{
        color:"#ffffff",
        fontSize:30,
        fontWeight:"bold",
    }



})
