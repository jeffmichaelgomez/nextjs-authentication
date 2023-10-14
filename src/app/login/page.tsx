'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
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
} from './LoginStyles';
import Swal from 'sweetalert2';

export default function LoginPage() {
	const router = useRouter();
	const [user, setUser] = React.useState({
		email: '',
		password: '',
	});

	const [buttonDisabled, setButtonDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const [minLoadComplete, setMinLoadComplete] = React.useState(false);

	const onLogin = async () => {
		setLoading(true);  // Start the loading spinner immediately
        setMinLoadComplete(false);
		// This will set minLoadComplete to true after 1.5 seconds
		setTimeout(() => {
			setMinLoadComplete(true);
		}, 2000);
		try {
			setLoading(true);
			const response = await axios.post('/api/users/login', user);
			console.log('Login success', response.data);
			Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'success',
				title: 'Logged in successfully!',
				showConfirmButton: false,
				timer: 2000,
				toast: true, // Enable toast mode
				background: '#efefef',
				showClass: {
					popup: 'animate__animated animate__fadeInDown',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOutUp',
				},
			});
			router.push('/profile');
		} catch (error: any) {
			console.log('Signup failed', error.message);
			await Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'error',
				title: 'Incorrect Credentials',
				text: error.message,
				showConfirmButton: false,
				timer: 1500,
				toast: true,
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
		if (user.email.length > 3 && user.password.length > 3) {
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
						<FormTitle>{loading ? 'Processing ...' : 'Login'}</FormTitle>
						<FormRow>
							<FormLabelSide htmlFor="email">Email:</FormLabelSide>
							<InputContainer>
								<Input
									id="email"
									type="text"
									value={user.email}
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
									onChange={(e) =>
										setUser({ ...user, password: e.target.value })
									}
								/>
							</InputContainer>
						</FormRow>

						<Button
							onClick={onLogin}
							disabled={buttonDisabled}
						>
							Login
						</Button>
						<ActionGroup>
							<Link
								href="/signup"
								className="border-right: 15px"
								passHref
							>
								<LabelP>Register Here</LabelP>
							</Link>
							<Link
								href="/forgotpassword"
								passHref
							>
								<LabelP>Forgot Password</LabelP>
							</Link>
						</ActionGroup>
					</GlassBox>
				</>
			)}
		</Container>
	);
}
