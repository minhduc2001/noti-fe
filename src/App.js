import { useEffect, useState } from 'react';
import { initializeApp, getApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
import { getMessagingToken, onMessageListener } from './firebase';
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import Login from './page/Login';

function App() {
  const [notify, setNotify] = useState('');
  useEffect(() => {
    // getMessagingToken();
    const channel = new BroadcastChannel("notifications");
    channel.addEventListener("message", (event) => {
      console.log("Receive background: ", event.data);
    });
  },[])

  // useEffect(() => {
  //   getMessagingToken();
  // },[])

  useEffect(() => {
   onMessageListener().then(data => {
      setNotify(data.notification.title+ Math.random()*10000)
      alert(data.notification.title)
   })
}, [notify])

//   const call = async ()=>{
//     const messaging = messaging();
// // Add the public key generated from the console here.
//     const a = await getToken(messaging, {vapidKey: "BKBGwZGAD8Q8yL2mIm1NriOEOStQeCFVbS5i0N6nimAXsgJu0K4JP-rtCAGwPv-KJTRuUdli0zXZPi6dP2bthq4"});
//     console.log(a);
//   }
  // useEffect(() => {

  //   const firebaseConfig = {
  //     apiKey: "AIzaSyD20pMRwsMZcDP9PKWYtiDM2ul7ihSy5y0",
  //     authDomain: "notify-217b7.firebaseapp.com",
  //     projectId: "notify-217b7",
  //     storageBucket: "notify-217b7.appspot.com",
  //     messagingSenderId: "998866802897",
  //     appId: "1:998866802897:web:52a4c9f5fa104fcfe98df0",
  //     measurementId: "G-D2P0EY73ER"
  //   };

  //   initializeApp(firebaseConfig);
    
  //   // call();
  // if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('./firebase-messaging-sw.js')
  //       .then(registration => {
  //         console.log('Service worker registered: ', registration);
  //       })
  //       .catch(error => {
  //         console.log('Service worker registration failed: ', error);
  //       });
  //   }

    // const messaging = firebase.;
    // messaging.requestPermission().then(() => {
    //   console.log('Notification permission granted.');
    //   return messaging.getToken();
    // }).then((token) => {
    //   console.log('Token: ', token);
    //   // Lưu token vào cơ sở dữ liệu hoặc gửi nó đến máy chủ để lưu trữ
    // }).catch((err) => {
    //   console.log('Unable to get permission to notify.', err);
    // });

    
  // }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login></Login>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
