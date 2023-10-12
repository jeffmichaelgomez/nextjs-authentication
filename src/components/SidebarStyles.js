import styled from 'styled-components';

export const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-right: 1px solid #ccc;
  width: 250px;
  padding: 1rem;
  border-right: 1px solid #ccc;
`;

export const SidebarButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  
  &:hover {
    background-color: #fcc203;
    color: #000;
  }
`;
