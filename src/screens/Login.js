import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage('Preencha todos os campos');
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('Usuário e/ou senha inválidos.');
        } else {
          setErrorMessage('Ocorreu um erro ao realizar o login. Tente novamente mais tarde.');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDownBig" style={styles.titleContainer}>
        <Text style={styles.title}>Login</Text>
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

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.registerLink}>Não possui uma conta? Registre-se</Text>
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
  loginButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});

export default Login;
