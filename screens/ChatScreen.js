import React, {useEffect, useState, useCallback} from 'react';
import { Text, View,StyleSheet, Button, TouchableOpacity } from 'react-native';
import firebase from "../database/firebaseDB";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {GiftedChat} from "react-native-gifted-chat";

const db = firebase.firestore().collection("messenges");

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);


  useEffect(() => {

    const unsubscribe = db
    .orderBy("createdAt", "desc")
    .onSnapshot((collectionSnapshot) => {
      const serverMessages = collectionSnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log(data);
        const jsDate = new Date(data.createdAt.seconds *1000);
        const newDoc = {
          ...data,
          createdAt: jsDate,
        };
      });
      setMessages(serverMessages);
    });

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
    return unsubscribe;

  }, []);


  function logout() {
    firebase.auth().signOut();
  }

  function sendMessages(newMessages) {
    console.log(newMessages);
    //db.add(newMessages[0]);
    //no need any more
    setMessages([...newMessages, ...messages]);
  }



    return (
    
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        name:" test dummy",
      }}
    />
   
    );
  }