import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// Animaciones
const float3d = keyframes`
  0%, 100% { 
    transform: translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg);
    filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
  }
  50% { 
    transform: translateY(-15px) translateZ(10px) rotateX(5deg) rotateY(5deg);
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.4));
  }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(17, 145, 75, 0.6); }
  70% { box-shadow: 0 0 0 15px rgba(17, 145, 75, 0); }
  100% { box-shadow: 0 0 0 0 rgba(17, 145, 75, 0); }
`;

const shine = keyframes`
  0% { transform: translateX(-100%) rotate(30deg); }
  100% { transform: translateX(100%) rotate(30deg); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.3); }
`;

const shadowPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(0.9); opacity: 0.6; }
`;

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  padding: 2rem;
  overflow: hidden;
  text-align: center;
  
  @media (max-width: 768px) {
    min-height: 80vh;
    padding: 6rem 1.5rem 4rem;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 6rem auto 0;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo3DContainer = styled.div`
  margin: 0 auto 20px;
  width: 160px;
  height: 160px;
  position: relative;
  perspective: 1000px;
`;

const Logo3DInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: ${float3d} 6s ease-in-out infinite;
`;

const LogoFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: translateZ(20px);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 5px rgba(17, 145, 75, 0.6));
  }
`;

const LogoEffects = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateZ(0px);
`;

const LogoGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle, 
    rgba(17, 145, 75, 0.6) 0%, 
    rgba(17, 145, 75, 0.2) 60%, 
    rgba(0, 0, 0, 0) 80%
  );
  filter: blur(8px);
  animation: ${pulse} 4s infinite alternate;
  z-index: 1;
  opacity: 0.8;
`;

const LogoBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 15px 3px rgba(17, 145, 75, 0.3);
`;

const LogoShine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
  opacity: 0.7;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.08) 50%, 
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    animation: ${shine} 8s linear infinite;
    filter: blur(1px);
  }
`;

interface LogoLightProps {
  top: string;
  left: string;
  size: string;
  delay: string;
}

const LogoLight = styled.div<LogoLightProps>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  filter: blur(1.5px);
  animation: ${twinkle} 4s ${props => props.delay} infinite alternate;
  z-index: 3;
  box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.4);
`;

const LogoReflection = styled.div`
  position: absolute;
  top: 10%;
  left: 20%;
  width: 60%;
  height: 30%;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center, 
    rgba(255, 255, 255, 0.15) 0%, 
    rgba(255, 255, 255, 0) 70%
  );
  transform: rotate(20deg);
  filter: blur(3px);
  opacity: 0.6;
`;

const LogoShadow = styled.div`
  position: absolute;
  bottom: -15px;
  left: 15%;
  width: 70%;
  height: 15px;
  background: radial-gradient(
    ellipse at center, 
    rgba(0, 0, 0, 0.3) 0%, 
    rgba(0, 0, 0, 0) 80%
  );
  filter: blur(4px);
  animation: ${shadowPulse} 6s ease-in-out infinite;
  z-index: -1;
  opacity: 0.8;
  border-radius: 50%;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 2rem 0 1.5rem;
  line-height: 1.3;
  color: #0a4b2a;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #4a6b57;
  line-height: 1.6;
  max-width: 800px;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CtaButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #11914b;
  color: white;
  border: 2px solid #11914b;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  min-width: 180px;
  
  &:hover {
    background-color: #0d6e3a;
    border-color: #0d6e3a;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(17, 145, 75, 0.3);
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  min-width: 180px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <Logo3DContainer>
          <Logo3DInner>
            <LogoFront>
              <img 
                src="/img/logoGlow.png" 
                alt="PETGAS Logo" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/img/logo-header.png';
                }}
              />
            </LogoFront>
            <LogoEffects>
              <LogoGlow />
              <LogoBorder />
              <LogoShine />
              <LogoLight top="15%" left="20%" size="8px" delay="0s" />
              <LogoLight top="25%" left="70%" size="6px" delay="0.5s" />
              <LogoLight top="70%" left="15%" size="5px" delay="1s" />
              <LogoLight top="75%" left="75%" size="7px" delay="1.5s" />
              <LogoReflection />
            </LogoEffects>
          </Logo3DInner>
          <LogoShadow />
        </Logo3DContainer>

        <HeroTitle>Transformando residuos plásticos en energía limpia y sostenible</HeroTitle>
        <HeroSubtitle>Soluciones innovadoras para el manejo de residuos plásticos y la generación de combustibles limpios.</HeroSubtitle>

        <ButtonContainer>
          <CtaButton to="/contacto">Contáctanos</CtaButton>
          <SecondaryButton to="/proceso">Conoce más</SecondaryButton>
        </ButtonContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
