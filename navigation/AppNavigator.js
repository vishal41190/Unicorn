import React from 'react';
import { createSwitchNavigator,createAppContainer } from 'react-navigation';
import RegistrationScreen from '../screens/RegistrationScreen'
import HomeScreen from '../screens/HomeScreen'
import AuthLoading from './AuthLoading';


const NavStack = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoading,
  Registration: RegistrationScreen,
  Home:HomeScreen
},
{
initialRouteName: 'AuthLoading',
});

const AppNavigator  = createAppContainer(NavStack);

export default AppNavigator;