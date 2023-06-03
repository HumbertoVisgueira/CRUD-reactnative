import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import Home from './screens/Home'
import Add from './screens/Add';
import Editar from './screens/Editar';
import Cadastro from './screens/Cadastro';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} options={{
          headerTintColor: "black",
          headerLeft: null
        }} />
        <Stack.Screen name="Editar" component={Editar} />
        <Stack.Screen name="Add" component={Add} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
