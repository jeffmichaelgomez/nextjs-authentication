import styled from 'styled-components';

export const StyledSidebar = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 2rem;
	border-right: 1px solid #ccc;
	width: 250px;
	padding: 1rem;
	font-weight: 500;
`;

export const SidebarButton = styled.button`
	margin-top: 5px;
	color: black;
	padding: 10px 15px;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.2s;
	font-weight: 600;
	border-radius: 15px;
	background-color: #e1426a;
	&:hover {
		background-color: #91072a;
		font-weight: 1000;
	}
`;

export const AdminTitle = styled.h1`
	font-weight: 600;
`;
