import React, { useState, useEffect } from 'react';
import { Text, View, Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from '@expo/vector-icons/FontAwesome'

import {css} from '../../assets/css/styles';

import {Profile, Cadastro, Edicao} from '../index';

const AreaRestrita = ({navigation}) => {

  const Tab = createMaterialBottomTabNavigator();
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser(){
      let response = await AsyncStorage.getItem('userData');
      let json = JSON.parse(response);
      setUser(json.name);
    }
    getUser();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Aviso", "Deseja mesmo sair da Aplicação?", [
        {
          text: "Não",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Sim", onPress: () => 
          {
            navigation.navigate("Home");
            BackHandler.exitApp();
          }
        }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Tab.Navigator
      activeColor = '#F58634'
      inactiveColor = '#fff'
      barStyle = {css.area_tab}
    >
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon:() => (
            <Icon name="users" size={20} color="#999" />
          )
        }}
      />
      <Tab.Screen 
        name="Cadastro" 
        component={Cadastro} 
        options={{
          tabBarIcon:() => (
            <Icon name="archive" size={20} color="#999" />
          )
        }}
      />
      <Tab.Screen 
        name="Edicao" 
        component={Edicao} 
        options={{
          tabBarIcon:() => (
            <Icon name="edit" size={20} color="#999" />
          )
        }}
      />
    </Tab.Navigator>
  );

}

export default AreaRestrita;