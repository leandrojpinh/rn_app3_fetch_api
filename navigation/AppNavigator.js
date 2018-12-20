import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';

export default createSwitchNavigator({          
  Login: LoginScreen,
  Main: MainTabNavigator,
});