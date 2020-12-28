import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {css} from './assets/css/styles';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Home, Login, Rastreio} from './views';
import AreaRestrita from './views/AreaRestrita/AreaRestrita';

const App = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home"
            component={Home}
            options={{
              title:"Bem-Vindo",
              headerStyle:{backgroundColor:"#F58634"},
              headerTintColor:'#333',
              headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
            }}
          />
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{
              headerShown:false
            }}
          />
          <Stack.Screen name="Rastreio" component={Rastreio} />
          <Stack.Screen 
            name="AreaRestrita" 
            component={AreaRestrita} 
            options={{
              headerShown:false
            }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;