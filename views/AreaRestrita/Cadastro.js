import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import config from "../../config/config.json"

import {css} from '../../assets/css/styles';

import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita"

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
    setProduct(null);
  }, [response]);
  
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
    let json = await response.json();
    setResponse(json);
  }

  // Compartilhar o QRCode
  async function shareQR() {
    const image = config.urlRoot + 'img/code.png'
    
    FileSystem.downloadAsync(
      image,
      FileSystem.documentDirectory + 'code.png'
    ).then(({uri}) => {
      Sharing.shareAsync(uri);
    });
    
    await Sharing.shareAsync();
  }

  return (
    <View style={[css.container, css.containerTop]}>
      <MenuAreaRestrita title="Registo" navigation={navigation} />

      {
        response && (
          <View>
            <Image source={{uri: response, height: 180, width: 180}} />
            <Button title="Partilhar" onPress={() => shareQR()}/>
          </View>
        )
      }

      <View style={css.login_input}>
        <TextInput 
          placeholder= "Nome do Produto: "
          onChangeText = {text => setProduct(text)}
          value = {product}
        />
      </View>

      <TouchableOpacity style={css.login_button} onPress={() => sendForm()}>
        <Text style={css.login_buttonText}>Registar Produto</Text>
      </TouchableOpacity>
    </View>
  );

}

export default Cadastro;