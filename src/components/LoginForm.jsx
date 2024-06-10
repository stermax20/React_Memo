import React, { useState } from "react";
import FormInput from "./FormInput";
import authService from "../api/axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      console.log(response.data);
      alert("로그인에 성공하였습니다.");
    } catch (error) {
      console.error(error);
      alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
