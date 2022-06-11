import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sing-up-form.styles.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => setFormFields(defaultFormFields);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) return alert('Password do not match');

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);

			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') return alert('Cannot create user, email already in use.');
			console.error('user creation encountered an error', error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					value={displayName}
					onChange={handleChange}
					name="displayName"
					type="text"
					required
				/>
				<FormInput label="Email" value={email} onChange={handleChange} name="email" type="email" required />
				<FormInput label="Password" value={password} onChange={handleChange} name="password" type="password" required />
				<FormInput
					label="Confirm Password"
					value={confirmPassword}
					onChange={handleChange}
					name="confirmPassword"
					type="password"
					required
				/>
				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
