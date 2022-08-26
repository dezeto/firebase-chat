import './App.css';
import { signInWithGoogle, auth, db } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
	collection,
	addDoc,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';
import { serverTimestamp } from '@firebase/firestore';

function ChatRoom() {
	const messageRef = collection(db, 'messages');
	const dummy = useRef();

	// const query = messageRef.orderBy('createdAt').limit(25);

	const [messages] = useCollectionData(messageRef, { idField: 'id' });

	const [formValue, setFormValue] = useState('');

	const sendMessage = async (e) => {
		e.preventDefault();

		const { uid, photoURL } = auth.currentUser;

		await addDoc(messageRef, {
			text: formValue,
			createdAt: serverTimestamp(),
			uid,
			photoURL,
		});

		setFormValue('');
		dummy.current.scrollIntoVIew({ behavior: 'smooth' });
	};

	return (
		<>
			<main>
				{messages &&
					messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
				<div ref={dummy}></div>
			</main>

			<form onSubmit={sendMessage}>
				<input
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
				/>
				<button type='submit'>Submit</button>
			</form>
		</>
	);
}

function ChatMessage(props) {
	const { text, uid, photoURL } = props.message;

	const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
	return (
		<div className={`message ${messageClass}`}>
			<img src={photoURL} referrerpolicy='no-referrer' />
			<p>{text}</p>
		</div>
	);
}

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className='App'>
			<header>
				<SignOut />
			</header>
			<section>{user ? <ChatRoom /> : <SignIn />}</section>
		</div>
	);
}

function SignIn() {
	return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
	return (
		auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
	);
}

export default App;
