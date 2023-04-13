import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './src/homepage/Homepage';
import Login from './src/login/Login';
import ForgotPassword from './src/forgot-password/ForgotPassword';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD049vRuQw9-60ZNbx0S9JRZjIIkkL1gUE',
  authDomain: 'theloginapp-a4505.firebaseapp.com',
  databaseURL: 'https://project-46666739079.firebaseio.com',
  storageBucket: 'theloginapp-a4505.appspot.com',
};

const app = firebase.initializeApp(firebaseConfig);

if (firebase.apps.includes(app)) {
  console.log('FIREBASE INITIALISED');
} else {
  console.log('FIREBASE NOT INITIALISED');
}

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const navigationOptions = {
    title: 'Home',
    headerLeft: () => <></>,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={navigationOptions}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
