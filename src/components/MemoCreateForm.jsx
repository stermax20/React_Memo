import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import apiService from '../api/axios';

const MemoCreateForm = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

      await apiService.createMemo(formData);
      navigate('/memos');
    } catch (error) {
      setError('Failed to create memo');
    }
  };

  return (
    <Container>
      <h1>메모 생성</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>제목:</label>
          <Input type="text" value={title} onChange={handleTitleChange} required />
        </FormGroup>
        <FormGroup>
          <label>내용:</label>
          <TextArea value={text} onChange={handleTextChange} required />
        </FormGroup>
        <FormGroup>
          <label>이미지 업로드:</label>
          <FileInput type="file" onChange={handleImageChange} />
        </FormGroup>
        <SubmitButton type="submit">메모 생성</SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default MemoCreateForm;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FileInput = styled.input`
  font-size: 16px;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
