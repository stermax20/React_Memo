import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import apiService from '../api/axios';

const MemoEditForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const data = await apiService.getMemoById(id);
        setTitle(data.memo.title);
        setText(data.memo.text);
        setCurrentImage(data.memo.image);
        setError(null);
      } catch (error) {
        setError('Failed to retrieve memo');
      }
    };

    fetchMemo();
  }, [id]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      if (image) {
        formData.append('image', image);
      }

      await apiService.updateMemo(id, formData);
      navigate('/memos');
    } catch (error) {
      setError('Failed to update memo');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("메모를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await apiService.deleteMemo(id);
        navigate('/memos');
      } catch (error) {
        setError('Failed to delete memo');
      }
    }
  };

  return (
    <MemoEditContainer>
      <h1>메모 수정</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>제목:</label>
          <input type="text" value={title} onChange={handleTitleChange} required />
        </FormGroup>
        <FormGroup>
          <label>내용:</label>
          <textarea value={text} onChange={handleTextChange} required />
        </FormGroup>
        <FormGroup>
          <label>이미지:</label>
          <input type="file" onChange={handleImageChange} />
          {currentImage && <CurrentImage src={`http://localhost:3030${currentImage}`} alt="Current Memo" />}
        </FormGroup>
        <ButtonGroup>
          <SubmitButton type="submit">메모 수정</SubmitButton>
          <DeleteButton type="button" onClick={handleDelete}>메모 삭제</DeleteButton>
        </ButtonGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </MemoEditContainer>
  );
};

export default MemoEditForm;

const MemoEditContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const CurrentImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;
