import React from 'react';
import { useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,StyleSheet } from 'react-native';

export default function LoginScreen({ navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <text styles={styles.title}>Chat App</text>
                <text styles={styles.fieldTitle}>Email</text>
                <TextInput
                style={styles.input}
                placeholder="Enter Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                ></TextInput>
                <text styles={styles.fieldTitle}>Password</text>
                <TextInput
                style={styles.input}
                placeholder="Enter Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                ></TextInput>
                <TouchableOpacity style= {styles.loginButton} onPress={null}>
                    <text style={styles.loginButton}>Log In</text>
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>

    );
  }

  const styles = StyleSheet.create({
    container: {
        marginLeft: 15, 
        marginRight: 15,
      },
    title: {
      fontSize: 50, 
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20
    },
    fieldTitle: {
        fontSize: 30, 
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    input: {
        margin: 20,
        borderWidth: 1,
        width: "90%",
        padding: 10,
        borderColor: "#ccc",
      },
    fieldTitle: {
        fontSize: 30, 
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },

  })
  
  