import * as React from 'react';
import { useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,StyleSheet } from 'react-native';
import firebase from "../database/firebaseDB";


const db = firebase.firestore();
const auth = firebase.auth();

export default function LoginScreen({ navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    function login() {
      Keyboard.dismiss();
      auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log("error!");
        setErrorText(error.message);
      });
    }


    return (
        //<TouchableWithoutFeedback onPress={Keyboard}>
            <View style={styles.container}>
                <Text styles={styles.title}>Chat App</Text>
                <Text styles={styles.fieldTitle}>Email</Text>
                <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                value={email}
                onChangeText={(Text) => setEmail(Text)}
                ></TextInput>
                <Text styles={styles.fieldTitle}>Password</Text>
                <TextInput
                style={styles.input}
                placeholder="Enter Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(Text) => setPassword(Text)}
                ></TextInput>
                <TouchableOpacity style= {styles.loginButton} onPress={login}>
                    <Text>Log In</Text>
                </TouchableOpacity>
                <Text style={styles.errorText}>{errorText}</Text>

            </View>
        //</TouchableWithoutFeedback>

    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
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
    loginButton: {
        backgroundColor: 'grey',
        padding: 20,
        borderRadius: 10,
        marginTop: 20
      },
      errorText: {
        color:"red",
        marginTop:20,
        marginLeft:20,
        marginRight:20,
        height: 40,

      },
    
  });
  
  