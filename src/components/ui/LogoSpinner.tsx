import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animación de rotación
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Animación de pulsación
const pulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SpinnerRing = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  animation: ${rotate} 2s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    padding: 8px;
    background: linear-gradient(45deg, #0a4b2a, #7cda24, #0a4b2a);
    background-size: 200% 200%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: ${pulse} 3s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const SpinnerInner = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0a4b2a, #7cda24);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  text-transform: uppercase;
  box-shadow: 0 0 20px rgba(10, 75, 42, 0.3);
  position: relative;
  z-index: 2;
  animation: ${pulse} 3s ease-in-out infinite;
  animation-delay: 0.3s;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 1.5rem;
  }
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, #ffffff, #e0ffe0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

interface LogoSpinnerProps {
  size?: number;
  text?: string;
}

const LogoSpinner: React.FC<LogoSpinnerProps> = ({ size = 150, text = 'PG' }) => {
  return (
    <SpinnerContainer style={{ width: size, height: size }}>
      <SpinnerRing />
      <SpinnerInner>
        <LogoText>{text}</LogoText>
      </SpinnerInner>
    </SpinnerContainer>
  );
};

export default LogoSpinner;
