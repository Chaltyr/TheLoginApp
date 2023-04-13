import {useNavigation, useTheme} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {TextInput, Icon} from 'react-native-paper';
import firebase from 'firebase/compat';
import {useState} from 'react';
import 'firebase/auth';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const style = useStyles(theme);

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const auth = firebase.auth();

  const handlePasswordResetRequest = async () => {
    console.log('Sending in request...');
    const strongRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );
    if (!strongRegex.test(email)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset has been sent to ' + email);
        navigation.navigate('Login');
      })
      .catch(error => {
        alert('An error occurred while logging in: ' + error.message);
      });
  };
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image
          resizeMode="contain"
          style={style.logo}
          source={require('../assets/images/pexels-dominika-roseclay-6792353.jpg')}
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
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={style.button}
          onPress={handlePasswordResetRequest}>
          <Text style={style.signOutText}>Send</Text>
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
    inputContainer: {},
    input: {
      padding: 10,
      margin: 10,
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

export default ForgotPassword;
