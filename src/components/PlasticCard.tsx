import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaRecycle } from 'react-icons/fa';

interface PlasticCardProps {
  imageUrl: string;
  symbolUrl: string;
  name: string;
  description: string;
  number: string;
  className?: string;
}

// Type for the styled component props
// Removed unused interface

// Enhanced glow animation with vibrant colors and pulsing effect
const glow = keyframes`
  0% { 
    filter: 
      drop-shadow(0 0 8px rgba(0, 255, 200, 0.9))
      drop-shadow(0 0 15px rgba(0, 200, 255, 0.7))
      drop-shadow(0 0 25px rgba(0, 100, 255, 0.5))
      brightness(1.2)
      contrast(1.2)
      saturate(1.2);
    transform: scale(1) rotate(0deg);
  }
  25% {
    filter: 
      drop-shadow(0 0 10px rgba(0, 255, 150, 0.9))
      drop-shadow(0 0 25px rgba(100, 255, 200, 0.7))
      drop-shadow(0 0 40px rgba(0, 200, 255, 0.6))
      brightness(1.3)
      contrast(1.3)
      saturate(1.3);
    transform: scale(1.03) rotate(0.5deg);
  }
  50% { 
    filter: 
      drop-shadow(0 0 12px rgba(100, 255, 200, 1))
      drop-shadow(0 0 30px rgba(100, 200, 255, 0.8))
      drop-shadow(0 0 50px rgba(100, 100, 255, 0.6))
      brightness(1.4)
      contrast(1.2)
      saturate(1.4);
    transform: scale(1.05) rotate(-0.5deg);
  }
  75% {
    filter: 
      drop-shadow(0 0 10px rgba(0, 200, 255, 1))
      drop-shadow(0 0 25px rgba(0, 150, 255, 0.8))
      drop-shadow(0 0 40px rgba(0, 100, 255, 0.6))
      brightness(1.3)
      contrast(1.3)
      saturate(1.3);
    transform: scale(1.03) rotate(0.5deg);
  }
  100% { 
    filter: 
      drop-shadow(0 0 8px rgba(0, 255, 200, 0.9))
      drop-shadow(0 0 15px rgba(0, 200, 255, 0.7))
      drop-shadow(0 0 25px rgba(0, 100, 255, 0.5))
      brightness(1.2)
      contrast(1.2)
      saturate(1.2);
    transform: scale(1) rotate(0deg);
  }
`;

const CardContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    
    .symbol-overlay {
      animation: ${glow} 2s ease-in-out infinite;
    }
  }
`;

const ImageContainer = styled.div`
  height: 220px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 12px 12px 0 0;
`;

const PlasticImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.03);
  }
`;

const RecycleIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #4CAF50;
  text-shadow: 0 0 10px rgba(76, 175, 80, 0.7);
  
  svg {
    width: 40px;
    height: 40px;
    filter: drop-shadow(0 0 8px rgba(76, 175, 80, 0.8));
    animation: ${glow} 2s ease-in-out infinite;
    
    &:first-child {
      color: #2196F3;
      filter: drop-shadow(0 0 8px rgba(33, 150, 243, 0.8));
    }
    
    &:last-child {
      color: #FF5722;
      filter: drop-shadow(0 0 8px rgba(255, 87, 34, 0.8));
    }
  }
`;

const SymbolOverlay = styled.div<{ $loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  z-index: 2;
  pointer-events: none;
  
  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9));
    transition: all 0.3s ease;
    animation: ${glow} 3s ease-in-out infinite;
    will-change: filter, transform;
    backface-visibility: hidden;
    transform: translateZ(0);
  }
`;

const Content = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
  z-index: 2;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 10px 0;
  text-align: center;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #11914b;
    border-radius: 2px;
  }
`;

const Description = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: center;
`;

const NumberBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #11914b;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  z-index: 4;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(0,0,0,0.3);
  }
`;

const PlasticCard: React.FC<PlasticCardProps> = ({
  imageUrl,
  symbolUrl,
  name,
  description,
  number,
  className
}) => {
  const navigate = useNavigate();
  const isOtrosPlasticos = name === 'Otros Plásticos';

  return (
    <CardContainer 
      data-card={name}
      onClick={() => navigate(`/plasticos/${name.toLowerCase().replace(/\s+/g, '-')}`)}
      className={`plastic-card ${className || ''}`}
    >
      <ImageContainer>
        <PlasticImage 
          src={imageUrl} 
          alt={name}
        />
        <SymbolOverlay $loaded={true}>
          {isOtrosPlasticos ? (
            <RecycleIconContainer>
              <FaRecycle />
              <FaTrashAlt />
            </RecycleIconContainer>
          ) : (
            <img 
              src={symbolUrl} 
              alt={`${name} symbol`}
            />
          )}
        </SymbolOverlay>
        <NumberBadge>{number}</NumberBadge>
      </ImageContainer>
      
      <Content>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </Content>
    </CardContainer>
  );
};

export default PlasticCard;
