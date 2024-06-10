import React, { useState } from "react";
import FormInput from "./FormInput";
import authService from "../api/axios";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.signup(email, password, name);
      console.log(response.data);
      alert("회원가입에 성공하였습니다.");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignupForm;
