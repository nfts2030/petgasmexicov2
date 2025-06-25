import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animación para el resplandor del logo
const pulse = keyframes`
  0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.1); }
`;

// Animaciones
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const backgroundMove = keyframes`
  0% { transform: scale(1) translate(0, 0); }
  33% { transform: scale(1.05) translate(-2%, 2%); }
  66% { transform: scale(1.03) translate(2%, -1%); }
  100% { transform: scale(1) translate(0, 0); }
`;

const gradientKeyframes = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: #0a2e38;
  overflow: hidden;
  padding: 100px 1.5rem 10vh;
  box-sizing: border-box;
  margin-top: 80px; /* Asegura espacio para el header fijo */
  
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: -10%;
    right: -10%;
    bottom: -10%;
    background: url('/img/09/fdoininvo2.jpg') center/cover no-repeat;
    animation: ${backgroundMove} 30s ease-in-out infinite;
    z-index: 0;
  }

  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
    height: 100%;
    padding-bottom: calc(10vh + env(safe-area-inset-bottom));
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    min-height: auto;
    
    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
      height: 100%;
    }
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const HeroText = styled.div`
  position: relative;
  z-index: 3;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 2rem auto 3rem;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 992px) {
    max-width: 500px;
    margin: 1.5rem auto 2.5rem;
  }
  
  @media (max-width: 768px) {
    margin: 1.25rem auto 2rem;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    margin: 1rem auto 1.5rem;
    border-radius: 10px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
  
  ${HeroImageWrapper}:hover & {
    transform: scale(1.02);
  }
`;

const MouseIcon = styled.div`
  width: 24px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  position: relative;
  margin: 0 auto 8px;
  
  &::before {
    content: '';
    width: 4px;
    height: 8px;
    background: rgba(255, 255, 255, 0.9);
    position: absolute;
    left: 50%;
    top: 8px;
    transform: translateX(-50%);
    border-radius: 2px;
    animation: scroll 2s infinite;
  }
  
  @keyframes scroll {
    0% { transform: translate(-50%, 0); opacity: 1; }
    100% { transform: translate(-50%, 10px); opacity: 0; }
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    transform: translate(-50%, -3px);
    
    ${MouseIcon} {
      border-color: #fff;
      
      &::before {
        background: #fff;
      }
    }
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    font-size: 0.75rem;
  }
`;



const GradientTextWrapper = styled.span`
  color: #00ff9d;
  background: linear-gradient(
    90deg,
    #00ff9d,
    #b3ff00,
    #fff700,
    #ffde00,
    #b3ff00,
    #00ff9d
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  animation: ${gradientKeyframes} 8s ease infinite;
  font-weight: 800;
  letter-spacing: -0.5px;
  text-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
  display: inline-block;
  transition: all 0.3s ease;
  
  &:hover {
    text-shadow: 0 0 20px rgba(0, 255, 157, 0.5);
    transform: scale(1.01);
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  max-width: 900px;
  
  @media (max-width: 1200px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 992px) {
    text-align: center;
    font-size: 2.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    line-height: 1.2;
  }
`;

const WelcomeText = styled.div`
  margin-bottom: 1.2rem;
  font-size: 1.8rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 
               -1px -1px 0 #000,  
               1px -1px 0 #000,
               -1px 1px 0 #000,
               1px 1px 0 #000;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    letter-spacing: 1px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #e0e0e0;
  margin: 0.5rem 0 0;
  max-width: 800px;
  line-height: 1.6;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  padding: 0 1rem;
  text-align: center;
  
  strong {
    color: #ffffff;
    font-weight: 600;
    white-space: nowrap;
  }
  
  @media (max-width: 992px) {
    margin: 0 auto 2rem;
    max-width: 700px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
    
    strong {
      margin-top: 0.6rem;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 0 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    margin: 1rem auto;
  }
`;

const CtaButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.5rem;
  background-color: #11914b;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  min-width: 180px;
  box-shadow: 0 4px 15px rgba(17, 145, 75, 0.3);
  -webkit-tap-highlight-color: transparent;
  
  &:active {
    transform: scale(0.98);
  }
  
  &:hover {
    background-color: #0d7a3f;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(17, 145, 75, 0.4);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 1rem 1.5rem;
  }
  
  /* Mejorar la apariencia en iOS */
  @supports (-webkit-touch-callout: none) {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`;



// Componente GradientText
const GradientText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <GradientTextWrapper>{children}</GradientTextWrapper>
);

const LogoGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(17,145,75,0.6) 0%, rgba(17,145,75,0.2) 60%, rgba(0,0,0,0) 80%);
  filter: blur(8px);
  animation: ${pulse} 4s infinite alternate;
  z-index: 1;
  opacity: 0.8;
`;

const LogoContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 2rem auto 1.5rem;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 0 15px rgba(17, 200, 100, 0.7));
    animation: ${float} 3s ease-in-out infinite;
  }
`;

const HeroSection: React.FC = React.memo(() => {
  return (
    <HeroContainer>
      <HeroContent>
        <LogoContainer>
          <img src="/img/logoGlow.png" alt="PETGAS Logo" />
          <LogoGlow />
        </LogoContainer>
        <WelcomeText>BIENVENIDO A PETGAS MÉXICO</WelcomeText>
        
        <HeroTitle>
          <GradientText>ENERGETIZANDO EL FUTURO CON ACCIONES POSITIVAS PARA EL PLANETA</GradientText>
        </HeroTitle>
        
        <HeroSubtitle>
          La tecnología de Petgas transforma plásticos no reciclables en: {
            ['Gasolina', 'Diesel', 'Parafina', 'Queroseno', 'Gas'].map((item, index, array) => (
              <React.Fragment key={item}>
                <strong>{item}</strong>
                {index < array.length - 2 ? ', ' : index === array.length - 2 ? ' y ' : ''}
              </React.Fragment>
            ))
          }.
        </HeroSubtitle>
        

      </HeroContent>
    </HeroContainer>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
