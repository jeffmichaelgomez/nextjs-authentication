import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 2rem;
	background: linear-gradient(to right, #bd5b5b, #000000);
`;

export const GlassBox = styled.div`
	align-items: center;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(5px);
	padding: 2rem 4rem;
	width: 60%;
	max-width: 800px;
	border-radius: 15px;
	box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
	color: #ffffff; // white text for better readability against the frosted glass background
	text-align: center;
`;

export const ProfileInfo = styled.div`
	margin: 2rem 0;
`;

export const LabelP = styled.p`
	color: #e2e2e2; // a lighter shade for better readability
	margin-bottom: 1rem;
	font-size: 1.1rem;
	font-weight: 500;
`;

export const FormTitle = styled.h1`
	font-size: 2.5rem;
	margin-bottom: 1.5rem;
	color: #ffffff;
	font-weight: 600;
`;

export const Button = styled.button`
	color: #ffffff;
	display: block;
	margin: 1rem auto;
	padding: 0.8rem 1.5rem;
	width: 40%;
	border: none;
	border-radius: 25px;
	background-color: rgba(0, 0, 0, 0.5);
	cursor: pointer;
	font-size: 1rem;
	transition: background-color 0.3s, transform 0.3s;

	&:hover {
		background-color: rgba(0, 0, 0, 0.7);
		transform: scale(1.05);
	}
`;

export const ActionGroup = styled.div`
	margin-top: 2rem;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

export const AdminButton = styled.button`
	color: #ffffff;
	display: block;
	margin: 1rem auto;
	padding: 0.8rem 1.5rem;
	width: 40%;
	border: none;
	border-radius: 25px;
	cursor: pointer;
	font-size: 1rem;
	transition: background-color 0.3s, transform 0.3s;

	background-color: ${(props) => (props.disabled ? '#827f80' : '#e1426a')};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	&:hover {
		transform: ${(props) => (props.disabled ? 'scale(1.00)' : 'scale(1.05)')};
		background-color: ${(props) => (props.disabled ? '#827f80' : '#91072a')};
	}
`;
