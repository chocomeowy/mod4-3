import React, {useEffect, useState} from 'react';
import { Text, View,StyleSheet, Button, TouchableOpacity } from 'react-native';
import firebase from "../database/firebaseDB";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {GiftedChat} from "react-native-gifted-chat";

const db = firebase.firestore();

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //logged in
        navigation.navigate("Chat", {id: user.id, email: user.email});
      } else {
        //logged out get kicked back to login page
        navigation.navigate("Login");
      }
    });

//put the logout button in the header
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons
          name="logout"
          size={24}
          color="grey"
          style={{ marginRight: 20}}
          />

        </TouchableOpacity>
      ),
    });

    setMessages([
      {
        _id:1,
        text: "hello there",
        createdAt: new Date(),
        user:{
          _id: 2,
          name: "demo person",
          avatar: " https://placeimg.com/140/140/any",
        },
      },

    ]);

  }, []);

  function logout() {
    firebase.auth().signOut();
  }

  function sendMessages(newMessages) {
    console.log(newMessages);
    setMessages([...newMessages, ...messages]);
  }



    return (
      <View>
        <Text>Chat</Text>

      </View>
    );
  }

