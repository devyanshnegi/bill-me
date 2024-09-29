import React, { useState } from "react";
import styled from 'styled-components';

const UploadContainer = styled.div`
  margin: 20px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const BillUpload = ({ onRecognition }) => {
  const [jsonString, setJsonString] = useState('');

  const handleUpload = () => {
    try {
      const parsedData = JSON.parse(jsonString);
      onRecognition(parsedData);
    } catch (error) {
      alert('Invalid JSON string. Please check your input.');
    }
  };

  return (
    <UploadContainer>
      <h2>Upload Bill JSON</h2>
      <TextArea
        value={jsonString}
        onChange={(e) => setJsonString(e.target.value)}
        placeholder="Paste your JSON string here..."
      />
      <Button onClick={handleUpload}>Submit</Button>
    </UploadContainer>
  );
};

export default BillUpload;
