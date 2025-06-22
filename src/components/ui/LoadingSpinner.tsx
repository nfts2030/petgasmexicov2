import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid rgba(17, 145, 75, 0.2);
  border-radius: 50%;
  border-top-color: #11914b;
  animation: ${spin} 1s ease-in-out infinite;
  margin: 2rem auto;
  display: block;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
`;

const LoadingSpinner: React.FC = () => {
  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  );
};

export default LoadingSpinner;
