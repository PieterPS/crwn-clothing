import { signInWithGooglePopup, creatUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	const logGoogleUser = async () => {
		try {
			const { user } = await signInWithGooglePopup();
			await creatUserDocumentFromAuth(user);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
		</div>
	);
};

export default SignIn;
