import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseConfig } from "./constants";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let messaging;

if (typeof window !== "undefined") {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
}

export const getMessagingToken = async () => {
  let currentToken = "";
  if (!messaging) return;
  try {
    currentToken = await messaging.getToken({
      vapidKey:
        "BI0h8hXxUUYRoko2OTas4a8W58goUxcOdKgqov2PPqpCszvtcYpsfFWqojuMBGO6A-lU7wU8kBpiWapa0N0DYBc",
    });
    localStorage.setItem("token", currentToken);
    return currentToken;
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
