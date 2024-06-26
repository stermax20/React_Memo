import React, { useState } from "react";
import styled from "styled-components";
import FormInput from "./FormInput";
import authService from "../api/axios";
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await authService.signup(email, password, name);
      console.log(response)
      if(response.status === 200) {
        alert("회원가입에 성공하였습니다.");
        navigate("/login")
      }
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
          <h1>회원가입</h1>
      <FormInput
        label="이름"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormInput
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <ButtonContainer>
        <StyledButton type="submit">회원가입</StyledButton>
        <LoginButton type="button" onClick={() => navigate("/login")}>로그인</LoginButton>
      </ButtonContainer>
    </StyledForm>
  );
};

export default SignupForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  flex: 1;
  margin-right: 10px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  flex: 1;
  
  &:hover {
    background-color: #5a6268;
  }
`;
