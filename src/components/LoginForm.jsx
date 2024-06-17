import React, { useState } from "react";
import styled from "styled-components";
import FormInput from "./FormInput";
import authService from "../api/axios";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login(email, password);
      if (response.status === 200) {
        alert("로그인에 성공하였습니다.");
        navigate("/memos")
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        alert("잘못된 이메일 또는 비밀번호입니다.");
      } else {
        alert("로그인에 실패하였습니다.");
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h1>로그인</h1>
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
        <StyledButton type="submit">로그인</StyledButton>
        <SignupButton type="button" onClick={() => navigate("/signup")}>회원가입</SignupButton>
      </ButtonContainer>
    </StyledForm>
  );
};

export default LoginForm;

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

const SignupButton = styled.button`
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
