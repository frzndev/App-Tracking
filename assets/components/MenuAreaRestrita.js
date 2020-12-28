import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@expo/vector-icons/FontAwesome'

import {css} from '../../assets/css/styles';

const MenuAreaRestrita = (props) => {

  async function logout() {
        await AsyncStorage.clear();
        props.navigation.navigate("Login");
  }

  return (
    <View style={css.area_menu}>
      <TouchableOpacity style={css.button_home2} onPress={() => props.navigation.navigate("Home")}>
        <Icon name="home" size={20} color="#999" />
      </TouchableOpacity>

      <Text style={css.area_title}>{props.title}</Text>

      <TouchableOpacity style={css.button_logout} onPress={() => logout()}>
        <Icon name="sign-out" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );

}

export default MenuAreaRestrita;