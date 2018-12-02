import React from 'react';
import { createSwitchNavigator,createAppContainer } from 'react-navigation';
import RegistrationScreen from '../screens/RegistrationScreen'
import HomeScreen from '../screens/HomeScreen'
import AuthLoading from './AuthLoading';
import LoginScreen from '../screens/LoginScreen'

const NavStack = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoading,
  Registration: RegistrationScreen,
  LogIn:LoginScreen,
  Home:HomeScreen,
  
},
{
initialRouteName: 'AuthLoading',
});

const AppNavigator  = createAppContainer(NavStack);

export default AppNavigator;