import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Cadastro = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      setErrorMessage('Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não correspondem');
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Cadastro realizado com sucesso
        let user = userCredential.user;
        navigation.navigate('Home');
      })
      .catch((error) => {
        setErrorMessage('E-mail inválido');
      });
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDownBig" style={styles.titleContainer}>
        <Text style={styles.title}>Cadastro</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUpBig" style={styles.formContainer}>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <TextInput
          placeholder="Confirmar senha"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Já possui uma conta? Faça login</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});

export default Cadastro;
