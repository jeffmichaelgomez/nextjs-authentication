import styled from 'styled-components';

export const FormWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column; // To stack children vertically
	align-items: center;
	height: 100vh;
	padding: 1rem;
	background-color: #f4f5f7;
	overflow-y: auto;
`;

export const StyledForm = styled.form`
	background-color: #ffffff;
	padding: 2rem 4rem;
	border-radius: 10px;
	box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
	width: 60%;
	max-width: 600px;
	color: #000;
`;

export const FormTitle = styled.h2`
	font-size: 24px;
	margin-bottom: 1.5rem;
	color: black;
`;

export const FormGroup = styled.div`
	margin-bottom: 1.5rem;
`;

export const StyledLabel = styled.label`
	display: block;
	font-size: 14px;
	margin-bottom: 8px;
`;

export const StyledInput = styled.input`
	width: 100%;
	padding: 10px 12px;
	font-size: 16px;
	border-radius: 5px;
	border: 1px solid #ccc;
	transition: border 0.2s;

	&:focus {
		border: 1px solid #0077ff;
		outline: none;
	}
`;

export const SubmitButton = styled.button`
	background-color: #0077ff;
	color: #ffffff;
	padding: 10px 15px;
	border: 5px;
	border-radius: 25px 25px;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.2s;
	margin-right: 10px;

	&:hover {
		background-color: #0055cc;
	}
`;

export const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	color: black;

	td:last-child {
		border: none;
	}

	th,
	td {
		padding: 10px;
		border: 1px solid #ccc;
		text-align: center;
	}

	th {
		background-color: #f4f5f7;
	}

	tr:nth-child(even) {
		background-color: #f9f9f9;
	}

	tr:hover {
		background-color: #f4f5f7;
	}
`;

export const TopSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 20px;
`;

export const SearchWrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SearchInput = styled(StyledInput)`
	color: black;
	max-width: 500px;
	margin: 0 auto;
`;
