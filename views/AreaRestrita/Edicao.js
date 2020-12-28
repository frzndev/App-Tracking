import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {css} from '../../assets/css/styles';

import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita"

const Edicao = ({navigation}) => {

  return (
    <View style={[css.container, css.containerTop]}>
      <MenuAreaRestrita title="Edição" navigation={navigation} />
    </View>
  );

}

export default Edicao;