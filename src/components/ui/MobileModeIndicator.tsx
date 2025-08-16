import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '../../contexts/LanguageContext';

interface MobileModeIndicatorProps {
  show: boolean;
}

// Animation for signal bars
const signalBars = keyframes`
  0%, 100% { 
    opacity: 0.6; 
    transform: scaleY(1); 
  }
  25% { 
    opacity: 1; 
    transform: scaleY(1.2); 
  }
  50% { 
    opacity: 0.8; 
    transform: scaleY(0.8); 
  }
  75% { 
    opacity: 1; 
    transform: scaleY(1.1); 
  }
`;

const IndicatorContainer = styled.div<{ $show: boolean }>`
  display: ${props => props.$show ? 'flex' : 'none'};
  align-items: center;
  gap: 8px;
  background: rgba(240, 253, 244, 0.1); /* Using new text color with transparency */
  padding: 5px 12px;
  border-radius: 20px;
  margin: 0 10px;
  border: 1px solid rgba(240, 253, 244, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(240, 253, 244, 0.15);
    transform: translateY(-1px);
  }
`;

const IndicatorText = styled.span`
  color: #f0fdf4; /* New corporate text color */
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const SignalBars = styled.div`
  display: flex;
  align-items: flex-end;
  height: 16px;
  gap: 2px;
`;

const SignalBar = styled.div<{ $height: string; $delay: string }>`
  width: 4px;
  height: ${props => props.$height};
  background: linear-gradient(to top, #11914b, #1abc9c); /* Corporate accent colors */
  border-radius: 2px;
  animation: ${signalBars} 2s ease-in-out infinite;
  animation-delay: ${props => props.$delay};
  box-shadow: 0 0 4px rgba(17, 145, 75, 0.4);
`;

const MobileModeIndicator: React.FC<MobileModeIndicatorProps> = ({ show }) => {
  const { t } = useLanguage();

  if (!show) return null;

  return (
    <IndicatorContainer $show={show}>
      <SignalBars>
        <SignalBar $height="25%" $delay="0.1s" />
        <SignalBar $height="50%" $delay="0.2s" />
        <SignalBar $height="75%" $delay="0.3s" />
        <SignalBar $height="100%" $delay="0.4s" />
      </SignalBars>
      <IndicatorText>
        {t('mobileMode') || 'Modo Móvil'}
      </IndicatorText>
    </IndicatorContainer>
  );
};

export default MobileModeIndicator;