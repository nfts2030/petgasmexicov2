import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animations
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


const shadowPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(0.9); opacity: 0.6; }
`;

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh; /* Fallback */
  min-height: -webkit-fill-available; /* Para navegadores móviles */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  padding: 2rem;
  overflow: hidden;
  text-align: center;
  
  /* Ajustes específicos para iOS */
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
    height: -webkit-fill-available;
  }
  
  @media (max-width: 768px) {
    min-height: 90vh;
    min-height: -webkit-fill-available;
    padding: 4rem 1.5rem 3rem;
    
    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
      height: -webkit-fill-available;
    }
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 0;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    justify-content: center;
    padding: 2rem 0;
  }
`;

const Logo3DContainer = styled.div`
  margin: 0 auto 30px;
  width: 160px;
  height: 160px;
  position: relative;
  perspective: 1200px;
  z-index: 2;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Logo3DInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: ${float3d} 6s ease-in-out infinite;
  will-change: transform;
`;

const LogoFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: translateZ(30px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 15px rgba(17, 200, 100, 0.9));
    animation: pulseGlow 4s ease-in-out infinite;
    transform-style: preserve-3d;
    
    @keyframes pulseGlow {
      0%, 100% {
        filter: drop-shadow(0 0 15px rgba(17, 200, 100, 0.9));
        transform: scale(1) translateZ(0);
      }
      50% {
        filter: drop-shadow(0 0 30px rgba(17, 200, 100, 1));
        transform: scale(1.08) translateZ(10px);
      }
    }
  }
`;

const LogoEffects = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const LogoGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180%;
  height: 180%;
  background: radial-gradient(
    circle at center,
    rgba(17, 200, 100, 0.3) 0%,
    rgba(17, 160, 80, 0.15) 50%,
    rgba(0, 0, 0, 0) 70%
  );
  border-radius: 50%;
  animation: ${pulse} 4s ease-in-out infinite;
  z-index: 1;
  filter: blur(10px);
  opacity: 0.8;
  transition: all 0.5s ease;
  
  ${Logo3DContainer}:hover & {
`;

const LogoBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(17, 200, 100, 0.4);
  border-radius: 50%;
  box-shadow: 
    0 0 15px rgba(17, 200, 100, 0.6),
    0 0 30px rgba(17, 200, 100, 0.3);
  z-index: 2;
  transition: all 0.5s ease;
`;

const LogoShine = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(30deg);
  animation: ${shine} 8s linear infinite;
  z-index: 2;
  pointer-events: none;
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
  filter: blur(3px);
  z-index: 2;
  opacity: 0.3;
  animation: twinkle ${props => props.delay || '3s'} ease-in-out infinite;
  
  @keyframes twinkle {
    0%, 100% { 
      opacity: 0.3;
      filter: blur(3px);
    }
    50% { 
      opacity: 0.6;
      filter: blur(1px);
    }
  }
  opacity: 0.8;
  z-index: 3;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(15px);
  ${Logo3DContainer}:hover & {
    opacity: 0.95;
    filter: blur(3px);
    transform: translateZ(20px) scale(1.1);
  }
`;

const LogoReflection = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  width: 40%;
  height: 40%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.4) 40%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: 50%;
  z-index: 4;
  opacity: 0.7;
  transform: translateZ(10px);
  transition: all 0.5s ease;
  filter: blur(1px);
  
  ${Logo3DContainer}:hover & {
    opacity: 0.9;
    transform: translateZ(15px) scale(1.1);
  }
`;

const LogoShadow = styled.div`
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%) translateZ(-10px);
  width: 70%;
  height: 25px;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.2) 60%,
    rgba(0, 0, 0, 0) 90%
  );
  filter: blur(6px);
  animation: ${shadowPulse} 6s ease-in-out infinite;
  z-index: 0;
  opacity: 0.7;
  border-radius: 50%;
  transition: all 0.5s ease;
  
  ${Logo3DContainer}:hover & {
    opacity: 0.8;
    transform: translateX(-50%) translateZ(-10px) scale(1.1);
    filter: blur(8px);
  }
`;

// Gradient text component
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className }) => {
  return (
    <GradientTextWrapper className={className}>
      {children}
    </GradientTextWrapper>
  );
};

const gradientKeyframes = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const GradientTextWrapper = styled.span`
  /* Fallback for older browsers */
  color: #00ff9d;
  
  /* Gradient text for modern browsers */
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
  
  /* For WebKit browsers */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    background: linear-gradient(
      90deg,
      #00ff9d,
      #b3ff00,
      #fff700,
      #ffde00,
      #b3ff00,
      #00ff9d
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 300% 100%;
  }
  
  &:hover {
    text-shadow: 0 0 20px rgba(0, 255, 157, 0.5);
    transform: scale(1.01);
  }
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin: 1rem 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
  max-width: 800px;
  padding: 0 1rem;
  
  /* Reset any inherited background */
  background: none;
  animation: ${gradientKeyframes} 8s ease infinite;
  text-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
  
  /* Ajustes específicos para iOS */
  @supports (-webkit-touch-callout: none) {
    margin: 0.5rem 0;
  }
  
  /* Fallback for older browsers */
  @supports not (background-clip: text) {
    background: none;
    color: #00ff9d; /* Fallback color */
  }

  @media (min-width: 375px) {
    font-size: 2.2rem;
  }

  @media (min-width: 414px) {
    font-size: 2.4rem;
  }

  @media (min-width: 768px) {
    font-size: 3rem;
    margin: 1.5rem 0;
  }

  @media (min-width: 1024px) {
    font-size: 3.5rem;
    margin: 2rem 0;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0 1.5rem;
  color: #4a6b57;
  line-height: 1.5;
  max-width: 800px;
  opacity: 0.9;
  padding: 0 1rem;
  
  @media (min-width: 375px) {
    font-size: 1.1rem;
  }
  
  @media (min-width: 414px) {
    font-size: 1.15rem;
    margin: 0.75rem 0 2rem;
  }
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
    margin: 1rem 0 2.5rem;
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



const HeroSection: React.FC = React.memo(() => {
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

        <HeroTitle>
          <GradientText>
            ENERGETIZANDO EL FUTURO CON ACCIONES POSITIVAS PARA EL PLANETA
          </GradientText>
        </HeroTitle>
        <HeroSubtitle>Soluciones innovadoras para el manejo de residuos plásticos y la generación de combustibles limpios.</HeroSubtitle>

        <ButtonContainer>
          <CtaButton to="/contacto">Contáctanos</CtaButton>
        </ButtonContainer>
      </HeroContent>
    </HeroContainer>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
