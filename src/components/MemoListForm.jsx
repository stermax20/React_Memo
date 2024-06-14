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

  if (loading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleUpdateMemo = (id) => {
    navigate(`/memos/edit/${id}`);
  };

  return (
    <MemoListContainer>
      <h1>메모 목록</h1>
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
