import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDlGLDXIytUAvcyihKSm9qQSnEEze2SE9U",
  authDomain: "carrito-uniformes-fire.firebaseapp.com",
  databaseURL: "https://carrito-uniformes-fire-default-rtdb.firebaseio.com",
  projectId: "carrito-uniformes-fire",
  storageBucket: "carrito-uniformes-fire.appspot.com",
  messagingSenderId: "991891442182",
  appId: "1:991891442182:web:7c8f881b902fb8712f1187"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)