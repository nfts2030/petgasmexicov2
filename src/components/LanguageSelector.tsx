import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

// Import flag images
import esFlag from '../assets/flags/mx.svg'; // Assuming Mexico flag for Spanish
import enFlag from '../assets/flags/uk.svg'; // Assuming UK flag for English

const LanguageSelectorContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto; /* Push to the right */
  
  @media (min-width: 992px) {
    margin-left: 20px; /* Adjust margin for desktop */
  }
`;

interface LanguageButtonProps {
  $isActive: boolean;
}

const LanguageButton = styled.button<LanguageButtonProps>`
  background: ${props => props.$isActive ? 'rgba(124, 218, 36, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.$isActive ? '#7cda24' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(124, 218, 36, 0.1);
    border-color: #7cda24;
  }

  img {
    width: 24px;
    height: 16px;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  span {
    color: ${props => props.$isActive ? '#7cda24' : '#fff'};
    font-weight: ${props => props.$isActive ? '700' : '500'};
    font-size: 0.9em;
  }
`;

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <LanguageSelectorContainer>
      <LanguageButton 
        onClick={() => changeLanguage('es')}
        $isActive={language === 'es'}
        aria-label="Cambiar a español"
      >
        <img src={esFlag} alt="Bandera de México" />
        <span>ES</span>
      </LanguageButton>
      <LanguageButton 
        onClick={() => changeLanguage('en')}
        $isActive={language === 'en'}
        aria-label="Change to English"
      >
        <img src={enFlag} alt="Flag of United Kingdom" />
        <span>EN</span>
      </LanguageButton>
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector;
