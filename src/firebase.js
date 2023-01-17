import { useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseConfig } from './constants';

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
      vapidKey: 'BKBGwZGAD8Q8yL2mIm1NriOEOStQeCFVbS5i0N6nimAXsgJu0K4JP-rtCAGwPv-KJTRuUdli0zXZPi6dP2bthq4',
    });
    localStorage.setItem('token' , currentToken)
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