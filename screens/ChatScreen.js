import React, {useEffect, useState, useCallback} from 'react';
import { Text, View,StyleSheet, Button, TouchableOpacity } from 'react-native';
import firebase from "../database/firebaseDB";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {GiftedChat} from "react-native-gifted-chat";

const db = firebase.firestore().collection("messenges");
const auth = firebase.auth();
const anonymousUser = { name: "Anonymous", id: "1A" };

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(anonymousUser);

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Chat");
        setCurrentUser({ id: user.uid, name: user.email });
      } else {
        navigation.navigate("Login");
        setCurrentUser(anonymousUser);
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

        // This loads data from firebase
        const unsubscribeSnapshot = db
        .orderBy("createdAt", "desc")
        .onSnapshot((collectionSnapshot) => {
          const serverMessages = collectionSnapshot.docs.map((doc) => {
            const data = doc.data();
            console.log(data);
            const returnData = {
              ...doc.data(),
              createdAt: new Date(data.createdAt.seconds * 1000), // convert to JS date object
            };
            return returnData;
          });
          setMessages(serverMessages);
        });


    return () => {
      unsubscribe();
      unsubscribeSnapshot();
    };

  }, []);


  function logout() {
    auth.signOut();
  }

  function sendMessages(newMessages) {
    //console.log(newMessages);
    db.add(newMessages[0]);
    //no need any more
    //setMessages([...newMessages, ...messages]);
  }

    return (
    
      <GiftedChat
      messages={messages}
      onSend={(newMessages) => sendMessages(newMessages)}
      renderUsernameOnMessage={true}
      listViewProps={{
        style: {
          backgroundColor: "#666",
        },
      }}
    />
  );
}