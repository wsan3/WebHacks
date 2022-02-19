import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const app = initializeApp({
    apiKey: "AIzaSyDffuJ0i66b01Hd1vMWOE3VGnvG4Wh79Yc",
    authDomain: "webhacks2022.firebaseapp.com",
    projectId: "webhacks2022",
    storageBucket: "webhacks2022.appspot.com",
    messagingSenderId: "86207572324",
    appId: "1:86207572324:web:0140de55d994295f9cf271",
    measurementId: "G-JF95GQEPEE"
});

export const db = getFirestore(app);