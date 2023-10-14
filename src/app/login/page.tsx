'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Container, GlassBox, Input, Button, InputContainer, FormTitle, ActionGroup, FormRow, FormLabelSide, LabelP} from './LoginStyles';

export default function LoginPage() {
	const router = useRouter();
	const [user, setUser] = React.useState({
		email: '',
		password: '',
	});

	const [buttonDisabled, setButtonDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);

	const onLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.post('/api/users/login', user);
			console.log('Login success', response.data);
			toast.success('Login Success');
			router.push('/profile');
		} catch (error: any) {
			console.log('Login failed', error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
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
            <GlassBox>
                <FormTitle>{loading ? "Processing ..." : "Login"}</FormTitle>

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
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    </InputContainer>
                </FormRow>

                <Button onClick={onLogin} disabled={buttonDisabled}>
                    Login
                </Button>

                <ActionGroup>
                    <Link href="/signup" className="border-right: 15px" passHref>
                    <LabelP>Register Here</LabelP>
                    </Link>
                    <Link href="/forgotpassword" passHref>
                        <LabelP>Forgot Password</LabelP>
                    </Link>
                </ActionGroup>
            </GlassBox>
        </Container>
    );
}
