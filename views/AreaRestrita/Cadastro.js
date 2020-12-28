import React, { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {css} from '../../assets/css/styles';

import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita"
import config from "../../config/config.json"
import { set } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';

const Cadastro = ({navigation}) => {

  const address = config.origin;
  const [code, setCode] = useState(null);
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    randomCode();
  }, []);
  
  // Gerar um codigo random
  async function randomCode() {
    let result = '';
    let length=20;
    let chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    setCode(result);
  }

  // Função para buscar o ID do Utilizador
  async function getUser() {

    let response = await AsyncStorage.getItem('userData');
    let json = JSON.parse(response);
    setUser(json.id);
  }

  // Função para enviar formulário
  async function sendForm() {
    let response = await fetch(`${config.urlRoot}create`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          userId: user,
          code: code,
          product: product,
          local: address
      })
    });
  }

  return (
    <View style={[css.container, css.containerTop]}>
      <MenuAreaRestrita title="Registo" navigation={navigation} />

      <View style={css.login_input}>
        <TextInput 
          placeholder= "Nome do Produto: "
          onChangeText = {text => setProduct(text)}
        />
      </View>

      <TouchableOpacity style={css.login_button} onPress={() => sendForm()}>
        <Text style={css.login_buttonText}>Registar Produto</Text>
      </TouchableOpacity>
    </View>
  );

}

export default Cadastro;