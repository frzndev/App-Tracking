import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@expo/vector-icons/FontAwesome'
import config from "../../config/config.json"

import {css} from '../../assets/css/styles';


import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita"

const Profile = ({navigation}) => {

  const [idUser, setIdUser] = useState(null);
  const [passwordAntiga, setPasswordAntiga] = useState(null);
  const [novaPassword, setNovaPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [Msg, setMsg] = useState(null);

  useEffect(() => {
    async function getIdUser(){
      let response = await AsyncStorage.getItem('userData');
      let json = JSON.parse(response);
      setIdUser(json.id);
    }
    getIdUser();
  });

  async function sendForm() {
    let response = await fetch(`${config.urlRoot}verifyPassword`, {
      method: 'POST',
      body: JSON.stringify({
        id: idUser,
        passwordAntiga: passwordAntiga,
        novaPassword: novaPassword,
        confPassword: confPassword
      }), 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    let json = await response.json();
    setMsg(json);
  }

  return (
    <View style={[css.container, css.containerTop]}>
      <MenuAreaRestrita title="Perfil" navigation={navigation} />

      <View>
        <Text>{Msg}</Text>
        <TextInput style={css.login_input} placeholder="Password Antiga:" onChangeText={text => setPasswordAntiga(text)} />
        <TextInput style={css.login_input} placeholder="Nova Password:" onChangeText={text => setNovaPassword(text)} />
        <TextInput style={css.login_input} placeholder="Confirmar Password:" onChangeText={text => setConfPassword(text)} />
        <TouchableOpacity style={css.login_button} onPress={() => sendForm()}>
          <Text style={css.login_buttonText} >Alterar Password</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

}

export default Profile;