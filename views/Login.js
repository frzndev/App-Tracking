import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, Platform, Text, Image, TextInput, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

import config from "../config/config.json"

import {css} from '../assets/css/styles';

const Login = ({navigation}) => {

    const [display, setDisplay] = useState('none');
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        verifyLogin();
    }, []);

    useEffect(() => {
        if ( login === true ){
            biometric();
        }
    }, [login]);

    // Verificar se o usuário já possui algum login
    async function verifyLogin(){
        let response = await AsyncStorage.getItem('userData');
        let json = await JSON.parse(response);
        if (json !== null){
            setUser(json.name);
            setPassword(json.password);
            setLogin(true);
        }
    }

    //Biometria
    async function biometric(){
        let compatible = await LocalAuthentication.hasHardwareAsync();
        if(compatible){
            let biometricRecords = await LocalAuthentication.isEnrolledAsync();
            if (!biometricRecords){
                alert('Biometria não reconhecida !');
            } else {
                let result = await LocalAuthentication.authenticateAsync();
                if (result.success){
                    sendForm();
                } else{
                    setUser(null);
                    setPassword(null);
                }
            }
        }
    }

    // Envio do Formulário para o BackEnd
    async function sendForm()
    {
        let response = await fetch(`${config.urlRoot}login`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user,
                password: password
            })
        });

        let json = await response.json();

        if(json === 'error'){
            setDisplay('flex');
            setTimeout(() => {
                setDisplay('none');
            }, 5000);
            await AsyncStorage.clear();
        } else {
            await AsyncStorage.setItem('userData', JSON.stringify(json));
            navigation.navigate('AreaRestrita')
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}  style={[css.container, css.darkbg]}>
            <View>
                <Image source={require('../assets/img/logo.png')} />
            </View>

            <View>
                <Text style={css.login_msg(display)}>Username ou Senha Inválidos !</Text>
            </View>

            <View style={css.login_form}>
                <TextInput style={css.login_input} placeholder='Username: ' onChangeText={text => setUser(text)} />
                <TextInput style={css.login_input} placeholder='Password: ' onChangeText={text => setPassword(text)} secureTextEntry={true} />
                <TouchableOpacity style={css.login_button} onPress={() => sendForm()}>
                    <Text style={css.login_buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );

}

export default Login;