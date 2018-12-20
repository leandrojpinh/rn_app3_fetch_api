import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import PatrocinadorScreen from '../screens/PatrocinadorScreen';
import DetalheScreen from '../screens/DetalheScreen';
import FavoritoScreen from '../screens/FavoritoScreen';
import DetalheFavoritoScreen from '../screens/DetalheFavoritoScreen';
import LogoutScreen from '../screens/LogoutScreen';
import LoginScreen from '../screens/LoginScreen';

const PatrocinadorStack = createStackNavigator({
  Patrocinador: PatrocinadorScreen,
  DetalhePatrocinador: DetalheScreen
});

PatrocinadorStack.navigationOptions = {
  tabBarLabel: 'Patrocinadores',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-list'
          : 'md-list'
      }
    />
  ),
};

const DetalheStack = createStackNavigator({
  DetalhePatrocinador: DetalheScreen,
});

DetalheStack.navigationOptions = {
  tabBarLabel: 'Detalhe',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const FavoritoStack = createStackNavigator({
  Favorito: FavoritoScreen,
  DetalheFavorito: DetalheFavoritoScreen
});

FavoritoStack.navigationOptions = {
  tabBarLabel: 'Meus Favoritos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
    />
  ),
};

const LogoutStack = createStackNavigator({
  Logout: LogoutScreen,
  LoginScreen: LoginScreen
});

LogoutStack.navigationOptions = {
  tabBarLabel: 'Meus dados',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  PatrocinadorStack,
  FavoritoStack,
  LogoutStack
});
