import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: end;
	min-height: 100vh;
	padding: 0.5rem;
	background: linear-gradient(
		to right,
		#bd5b5b,
		#000000
	); /* Equivalent to bg-gradient-to-r from-blue-500 to-green-500 in Tailwind */
`;

export const GlassBox = styled.div`
	align-items: center;
	background: rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(10px);
	padding: 1.5rem;
	padding-right: 3rem; /* Padding to the right */
	width: 550px; /* This will make your form wider. Adjust as needed */
	max-width: 90%; /* Ensuring the width doesn't exceed the viewport on smaller devices */
	border-radius: 15px;
	margin-right: 20rem;
`;

export const Input = styled.input`
	color: black;
	display: block;
	padding: 0.5rem;
	width: 100%;
	flex: 0.5; // ensures the inputs take up twice the space of the labels
	margin-bottom: 15px;
	border-radius: 15px;
	outline: none;
	&:focus {
		border-color: #4a5568;
	}
`;

export const Button = styled.button`
	color: black;
	display: block; /* Ensures the button takes up full width of its parent */
	margin: 1rem auto; /* Centers the button */
	padding: 0.5rem;
	width: 30%; /* Makes the button wider; adjust as needed */
	border-radius: 15px;
	outline: none;
	background-color: ${(props) => (props.disabled ? '#827f80' : '#e1426a')};
	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	&:hover {
		background-color: ${(props) => (props.disabled ? '#827f80' : '#91072a')};
	}
	margin-top: 3rem;
	font-weight: 500;
`;

export const FormTitle = styled.h1`
	font-size: 2rem; /* Increase the font size. Adjust as needed */
	margin-bottom: 1.5rem;
	text-align: center;
`;

export const FormLabel = styled.label`
	display: block;
	margin-bottom: 0.5rem;
	font-weight: 500;
`;

export const ActionGroup = styled.div`
	text-align: center;
	margin-top: 1rem;
	width: 80%; /* Makes the links section wider */
	margin-left: auto;
	margin-right: auto;
`;

export const FormRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 80%;
	margin: 0 auto;
	margin-bottom: 1.5rem;
`;

export const FormLabelSide = styled(FormLabel)`
	margin-bottom: 0;
	flex: 0.5; // ensures the labels take up equal space
`;

export const InputContainer = styled.div`
	flex: 1; /* Take up the remaining space */
`;

export const LabelP = styled.p`
	color: lightgreen;
	justify-content: space-between;
	font-weight: 500;
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
	border: 5px solid rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	border-top: 5px solid #fff;
	width: 40px;
	height: 40px;
	animation: ${spin} 1s linear infinite;
	position: fixed; /* Positioning it fixed */
	top: 50%; /* Centering vertically */
	left: 50%; /* Centering horizontally */
	transform: translate(-50%, -50%); /* Fine-tuning the centering */
`;
