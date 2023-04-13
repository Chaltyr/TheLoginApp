import {useNavigation, useTheme} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect} from 'react';

const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const style = useStyles(theme);

  const handleLogOut = async () => {
    console.log('signing out');
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert('Sign out successful!');
      })
      .catch(error => {
        alert('An error occurred while logging in: ' + error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // var uid = user.uid;
        // var user = user;
        console.log('AUTH CHANGING');
        // console.log('uid', uid);
        // console.log('user', user);
        // User is signed in, navigate to home screen
        navigation.navigate('Login');
      }
    });

    return unsubscribe;
  }, []);
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image
          resizeMode="contain"
          style={style.logo}
          source={require('../assets/images/pexels-victoria-akvarel-4089658.jpg')}
        />
        <Text style={style.homepageText}>Welcome to the Home page!</Text>
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity style={style.button} onPress={handleLogOut}>
          <Text style={style.signOutText}>Sign Out</Text>
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
    homepageText: {
      color: 'black',
      paddingTop: 20,
      fontSize: 25,
    },
  });

export default HomeScreen;
