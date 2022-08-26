// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyC10Ph_uYDRE0jxyMp8EsNXS9cvDG_azoo',
	authDomain: 'fir-chat-15f95.firebaseapp.com',
	projectId: 'fir-chat-15f95',
	storageBucket: 'fir-chat-15f95.appspot.com',
	messagingSenderId: '952192881225',
	appId: '1:952192881225:web:4be1c9288800ed52bfa598',
	measurementId: 'G-8T5FK5TLZG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const db = getFirestore(app);
