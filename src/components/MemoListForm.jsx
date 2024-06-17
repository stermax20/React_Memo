import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import apiService from '../api/axios';

const MemoListForm = () => {
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const data = await apiService.getMemos();
        setMemos(data.memos);
        setLoading(false);
      } catch (error) {
        setError('Failed to retrieve memos');
        setLoading(false);
      }
    };
    fetchMemos();
  }, []);

  const handleLogout = async () => {
    try {
      await apiService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('로그아웃에 실패하였습니다.');
    }
  };

  const handleCreateMemo = () => {
    navigate('/memos/add');
  };

  const handleUpdateMemo = (id) => {
    navigate(`/memos/edit/${id}`);
  };

  if (loading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <MemoListContainer>
      <Header>
        <h1>메모 목록</h1>
        <ButtonContainer>
          <CreateMemoButton onClick={handleCreateMemo}>메모 생성</CreateMemoButton>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </ButtonContainer>
      </Header>
      <MemoList>
        {memos.map((memo) => (
          <MemoItem key={memo.id} onClick={() => handleUpdateMemo(memo.id)}>
            <h3>{memo.title}</h3>
            <p>{memo.text}</p>
            {memo.image && <MemoImage src={`http://localhost:3030${memo.image}`} alt={memo.title} />}
          </MemoItem>
        ))}
      </MemoList>
    </MemoListContainer>
  );
};

export default MemoListForm;

const MemoListContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 380px;
`;

const MemoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MemoItem = styled.li`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const MemoImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 8px;
`;

const LogoutButton = styled.button`
  background-color: #d9534f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #c9302c;
  }
`;

const CreateMemoButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #1e7e34;
  }
`;