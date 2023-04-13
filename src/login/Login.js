import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import firebase from 'firebase/compat';

const Login = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const style = useStyles(theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleLogIn = async () => {
    console.log('Logging In...');
    const strongRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );
    if (!strongRegex.test(email)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
    if (password.length < 8) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        var user = userCredential.user;
        console.log('logged in');
      })
      .catch(error => {
        console.log('ERROR', error);
        if (error.code === 'auth/user-not-found') {
          alert('User not found, please sign up first!');
        } else {
          alert('An error occurred while logging in: ' + error.message);
        }
      });
  };
  const handleSignUp = async () => {
    console.log('signing up');
    const strongRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );
    if (!strongRegex.test(email)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
    if (password.length < 8) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        var user = userCredential.user;

        console.log('signed up');
        console.log(user);
      })
      .catch(error => {
        console.log('SIGNUP ERROR', error);
        if (error.code === 'auth/email-already-in-use') {
          alert('User already exists, please sign in!');
        } else {
          alert('An error occurred while logging in: ' + error.message);
        }
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('AUTH CHANGING');
        navigation.navigate('Home');
      }
    });
  }, []);

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image
          resizeMode="contain"
          style={style.logo}
          source={require('../assets/images/pexels-joshy-tnf-4052752.jpg')}
        />
      </View>
      <View>
        <TextInput
          inputMode="email"
          editable
          numberOfLines={1}
          maxLength={40}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          style={style.input}
        />
        {!isEmailValid && (
          <Text style={style.errorMessage}>Email is not valid</Text>
        )}
        <TextInput
          secureTextEntry={show}
          editable
          numberOfLines={1}
          maxLength={40}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          style={style.input}
          right={
            <TextInput.Icon
              icon={show ? 'eye' : 'eye-off'}
              onPress={() => setShow(!show)}
            />
          }
        />
        {!isPasswordValid && (
          <Text style={style.errorMessage}>
            Password is not valid, must be at least 8 characters
          </Text>
        )}
      </View>

      <View style={style.buttonContainer}>
        <TouchableOpacity style={style.button} onPress={handleLogIn}>
          <Text style={style.signOutText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.button} onPress={handleSignUp}>
          <Text style={style.signOutText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={style.signOutText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'yellow',
    },
    input: {
      marginHorizontal: 10,
      marginVertical: 5,
      backgroundColor: 'white',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    button: {
      padding: 10,
      margin: 10,
      borderRadius: 10,
      backgroundColor: '#841584',
    },
    signOutText: {
      color: '#FFFF',
    },
    errorMessage: {
      color: 'red',
    },
    imageContainer: {
      paddingBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      borderRadius: 200 / 2,
      height: 200,
      width: 200,
      borderColor: '#FFFF',
      borderWidth: 1,
    },
  });

export default Login;
