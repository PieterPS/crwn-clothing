import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAMUiKlAckkShZoIPsAXDx2JL0rN0IMPis',
	authDomain: 'crwn-clothing-9a1c9.firebaseapp.com',
	projectId: 'crwn-clothing-9a1c9',
	storageBucket: 'crwn-clothing-9a1c9.appspot.com',
	messagingSenderId: '649743706864',
	appId: '1:649743706864:web:d4dbeca3ccde6d92747035',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const creatUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.error('error creating the user', error.message);
		}
	}

	return userDocRef;
};
