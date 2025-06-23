import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const WhatsAppContainer = styled.div`
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 9999;
  
  @media (max-width: 768px) {
    bottom: 20px;
    left: 15px;
  }
`;

const WhatsAppLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #25D366;
  color: white;
  border-radius: 50%;
  font-size: 30px;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    animation: none;
  }
  
  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    font-size: 26px;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  background: white;
  color: #333;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 250px;
  z-index: 10000;
  text-align: left;
  
  &::after {
    content: '';
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-width: 8px 8px 8px 0;
    border-style: solid;
    border-color: transparent white transparent transparent;
  }
  
  ${WhatsAppLink}:hover & {
    opacity: 1;
    visibility: visible;
    left: calc(100% + 5px);
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 10px 12px;
    max-width: 180px;
    white-space: normal;
    left: calc(100% + 5px);
    transform: translateY(-50%);
    text-align: left;
  }
`;

const WhatsAppButton: React.FC = () => {
  return (
    <WhatsAppContainer>
      <WhatsAppLink 
        href="https://wa.me/522295484549" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Chatea con nosotros por WhatsApp"
      >
        <FaWhatsapp />
        <Tooltip>¡Hola! ¿En qué podemos ayudarte?</Tooltip>
      </WhatsAppLink>
    </WhatsAppContainer>
  );
};

export default WhatsAppButton;
