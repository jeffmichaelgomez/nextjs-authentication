'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
	FormTitle,
	ProfileInfo,
	GlassBox,
	ActionGroup,
	Container,
	LabelP,
	Button,
    AdminButton,
} from './ProfileStyles';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProfilePage() {
	const router = useRouter();
	const [user, setUser] = React.useState({
		id: null,
		email: '',
		username: '',
		isAdmin: false,
	});

	const logout = async () => {
		try {
			await axios.get('/api/users/logout');
			toast.success('Logout Success');
			router.push('/login');
		} catch (error: any) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		// Fetch user details when the component mounts
		const fetchUserDetails = async () => {
			try {
				const res = await axios.get('/api/users/user');
				setUser({
					id: res.data.user._id,
					email: res.data.user.email,
					username: res.data.user.username,
					isAdmin: res.data.user.isAdmin,
				});
			} catch (error: any) {
				console.log(error.message);
				toast.error('Failed to fetch user details');
			}
		};

		fetchUserDetails();
	}, []);

	return (
		<Container>
			<GlassBox>
				<FormTitle>Profile Dashboard</FormTitle>

				{/* User Details */}
				<ProfileInfo>
					<LabelP>
						<strong>Username:</strong> {user.username}
					</LabelP>
					<LabelP>
						<strong>Email:</strong> {user.email}
					</LabelP>
					<LabelP>
						<strong>User ID:</strong>{' '}
						{user.id ? (
							<Link href={`/profile/${user.id}`}>Click to View</Link>
						) : (
							'Loading...'
						)}
					</LabelP>
					<LabelP>
						<strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}
					</LabelP>
				</ProfileInfo>

				{/* Buttons */}
				<ActionGroup>
					<AdminButton
						onClick={() => router.push('/products')}
						disabled={!user.isAdmin}
					>
						Admin Panel
					</AdminButton>
					<Button onClick={logout}>Logout</Button>
				</ActionGroup>
			</GlassBox>
		</Container>
	);
}

