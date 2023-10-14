'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
	Container,
	GlassBox,
	Input,
	Button,
	InputContainer,
	FormTitle,
	ActionGroup,
	FormRow,
	FormLabelSide,
	LabelP,
	Spinner,
} from './SignupStyles';
import Swal from 'sweetalert2';

export default function SignupPage() {
	const router = useRouter();
	const [user, setUser] = React.useState({
		email: '',
		password: '',
		username: '',
	});

	const [buttonDisabled, setButtonDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [minLoadComplete, setMinLoadComplete] = React.useState(false);

	const onSignup = async () => {
		try {
			setLoading(true); // Start the loading spinner immediately
			setMinLoadComplete(false);

			// This will set minLoadComplete to true after 3 seconds
			setTimeout(() => {
				setMinLoadComplete(true);
			}, 2000);
			const response = await axios.post('/api/users/signup', user);
			console.log('Signup Success', response.data);
			Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'success',
				title: 'Logged in successfully!',
				showConfirmButton: false,
				timer: 1500,
				toast: true, // Enable toast mode
				background: '#efefef',
				showClass: {
					popup: 'animate__animated animate__fadeInDown',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOutUp',
				},
			});
			router.push('/login');
		} catch (error: any) {
			console.log('Signup failed', error.message);
			await Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'error',
				title: 'Account Already Exist',
				text: error.message,
				showConfirmButton: false,
				timer: 1500,
				toast: true, // Enable toast mode
				background: '#efefef',
				showClass: {
					popup: 'animate__animated animate__fadeInDown',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOutUp',
				},
			});
            setLoading(false);  // Stop spinner immediately
		} finally {
			let checkCount = 0;
			const maxChecks = 30;  // Maximum of 3 seconds waiting (30 checks * 100ms)
			const checkInterval = setInterval(() => {
				if (minLoadComplete) {
					console.log("Finally block executed with minLoadComplete as true");
					setLoading(false);
					clearInterval(checkInterval);
				} else if (checkCount >= maxChecks) {
					console.log("Max checks reached. Handling as failure/timeout.");
					// Handle as a failure or timeout
					setLoading(false);
					clearInterval(checkInterval);
				} else {
					console.log("Finally block executed, but waiting for minLoadComplete");
				}
				checkCount++;
			}, 100);
		}
	};

	useEffect(() => {
		if (
			user.email.length > 3 &&
			user.password.length > 3 &&
			user.username.length > 3
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<Container>
			{loading ? (
				<Spinner />
			) : (
				<>
					<GlassBox>
						<FormTitle>{loading ? 'Processing ...' : 'Register'}</FormTitle>

						<FormRow>
							<FormLabelSide htmlFor="username">Username:</FormLabelSide>
							<InputContainer>
								<Input
									id="username"
									type="text"
									value={user.username}
									placeholder="username"
									onChange={(e) =>
										setUser({ ...user, username: e.target.value })
									}
								/>
							</InputContainer>
						</FormRow>

						<FormRow>
							<FormLabelSide htmlFor="email">Email:</FormLabelSide>
							<InputContainer>
								<Input
									id="email"
									type="text"
									value={user.email}
									placeholder="user@mail.com"
									onChange={(e) => setUser({ ...user, email: e.target.value })}
								/>
							</InputContainer>
						</FormRow>

						<FormRow>
							<FormLabelSide htmlFor="password">Password:</FormLabelSide>
							<InputContainer>
								<Input
									id="password"
									type="password"
									value={user.password}
									placeholder="password"
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
								/>
							</InputContainer>
						</FormRow>

						<Button
							onClick={onSignup}
							disabled={buttonDisabled}
						>
							Register
						</Button>

						<ActionGroup>
							<Link
								href="/login"
								passHref
							>
								<LabelP>Login Here</LabelP>
							</Link>
						</ActionGroup>
					</GlassBox>
				</>
			)}
		</Container>
	);
}
