import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import MemoListPage from "./pages/Memo/MemoListPage";
import MemoCreatePage from './pages/Memo/MemoCreatePage';
import MemoEditPage from './pages/Memo/MemoEditPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/memos" element={<MemoListPage />} />
      <Route path="/memos/add" element={<MemoCreatePage />} />
      <Route path="/memos/edit/:id" element={<MemoEditPage />} />
    </Routes>
  </Router>
);

export default App;
