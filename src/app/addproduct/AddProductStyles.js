import styled from 'styled-components';

export const FormWrapper = styled.div`
  flex: 1;  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 1rem;
  background-color: #f4f5f7;
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
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0055cc;
  }
`;
