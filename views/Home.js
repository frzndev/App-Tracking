import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import Icon from '@expo/vector-icons/FontAwesome'

import {css} from '../assets/css/styles';

const Home = (props) => {

  return (
    <View style={css.container2}>

      <TouchableOpacity style={css.button_home} onPress = {() => props.navigation.navigate('Login')} >
        <Icon name="power-off" size={80} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => props.navigation.navigate('Rastreio')} >
        <Icon name="road" size={80} color="#999" />
      </TouchableOpacity>

    </View>
  );

}

export default Home;