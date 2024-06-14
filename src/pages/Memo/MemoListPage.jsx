import React from "react";
import MemoListForm from "../../components/MemoListForm";
import { useNavigate } from 'react-router-dom';

const MemoListPage = () => {
  const navigate = useNavigate();

  const handleCreateMemo = () => {
    navigate('/memos/add');
  };

  return (
    <div>
      <MemoListForm />
      <button onClick={handleCreateMemo}>메모 생성</button>
    </div>
  );
};

export default MemoListPage;
