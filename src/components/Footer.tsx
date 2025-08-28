import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animaciones
const fadeIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animación para el logo
const floatAnimation = keyframes`
  0%, 100% { 
    transform: translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg);
    filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
  }
  50% { 
    transform: translateY(-15px) translateZ(10px) rotateX(5deg) rotateY(5deg);
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.4));
  }
`;

const VersionBadge = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  margin-left: 10px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const FooterContainer = styled.footer`
  position: relative;
  overflow: hidden;
  background: #0a1a1a;
  color: #fff;
  padding: 30px 0 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  
  /* Asegurar que los iconos de Font Awesome se vean */
  .fa-brands, .fas, .far, .fab {
    display: inline-block;
`;

const FooterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  opacity: 0.5;
`;

const FooterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, rgba(10, 75, 42, 0.8) 0%, transparent 100%);
  pointer-events: none;
`;

const FooterContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Logo3DContainer = styled.div`
  margin: 0 auto 10px;
  width: 100px;
  height: 100px;
  position: relative;
  perspective: 1000px;
`;

const Logo3DInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: ${floatAnimation} 6s ease-in-out infinite;
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
  background: radial-gradient(circle, rgba(17,145,75,0.6) 0%, rgba(17,145,75,0.2) 60%, rgba(0,0,0,0) 80%);
  filter: blur(8px);
  animation: pulse 4s infinite alternate;
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
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%);
    transform: rotate(30deg);
    animation: shine 8s linear infinite;
    filter: blur(1px);
  }
`;

const LogoLight = styled.div<{ $top: string; $left: string; $size: string; $delay: string }>`
  position: absolute;
  width: ${props => props.$size};
  height: ${props => props.$size};
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  top: ${props => props.$top};
  left: ${props => props.$left};
  filter: blur(1px);
  opacity: 0.7;
  animation: pulse 4s ease-in-out infinite;
  animation-delay: ${props => props.$delay};
  transform: translate(-50%, -50%);
  z-index: 1;
  box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.4);
`;

const LogoShadow = styled.div`
  position: absolute;
  bottom: -15px;
  left: 15%;
  width: 70%;
  height: 15px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 80%);
  filter: blur(4px);
  animation: shadowPulse 6s ease-in-out infinite;
  z-index: -1;
  opacity: 0.8;
  border-radius: 50%;
`;

const LogoReflection = styled.div`
  position: absolute;
  top: 10%;
  left: 20%;
  width: 60%;
  height: 30%;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
  transform: rotate(20deg);
  filter: blur(3px);
  opacity: 0.6;
`;

const FooterLogo = styled.div`
  width: 100%;
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 15px 0 10px;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    p {
      font-size: 0.85rem;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 15px 0;
  
  a {
    color: white;
    font-size: 1.1rem;
    transition: all 0.2s ease;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    
    &:hover {
      transform: translateY(-2px);
      background: #7cda24;
      color: #0a1a1a;
    }
  }
  opacity: 0;
  transform: translateY(10px);
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0.8s;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #fff;
    transition: all 0.2s ease;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(124, 218, 36, 0.2), rgba(10, 75, 42, 0.8));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    i {
      position: relative;
      z-index: 1;
    }
    
    &:hover {
      background-color: transparent;
      transform: translateY(-5px) scale(1.1);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      
      &::before {
        opacity: 1;
      }
    }
    
    &:nth-child(1):hover { color: #1DA1F2; } /* Twitter */
    &:nth-child(2):hover { color: #E1306C; } /* Instagram */
    &:nth-child(3):hover { color: #FF0000; } /* YouTube */
  }
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 15px 0 0;
  margin-top: 15px;
  text-align: center;
`;

// Pie de página inferior

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.85rem;
    transition: all 0.3s ease;
    position: relative;
    padding: 0 5px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 0;
      height: 1px;
      background-color: #7cda24;
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: #7cda24;
      
      &::after {
        width: 100%;
      }
    }
  }
  
  span {
    color: rgba(255, 255, 255, 0.2);
    user-select: none;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    
    span {
      display: block; // Asegurar que los iconos sean visibles
    }
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterBackground />
      <FooterOverlay />
      <FooterContent>
        <FooterLogo>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo3DContainer>
              <Logo3DInner>
                <LogoFront>
                  <img 
                    src="/img/logoGlow.png" 
                    alt="PETGAS Logo"
                    style={{ maxWidth: '180px', height: 'auto' }}
                  />
                </LogoFront>
                <LogoEffects>
                  <LogoGlow />
                  <LogoBorder />
                  <LogoShine />
                  <LogoLight $top="20%" $left="20%" $size="6px" $delay="4s" />
                  <LogoLight $top="70%" $left="70%" $size="4px" $delay="3s" />
                  <LogoReflection />
                </LogoEffects>
              </Logo3DInner>
              <LogoShadow />
            </Logo3DContainer>
          </Link>
          <p>Transformando residuos plásticos no reciclables en energía para tener un futuro sostenible.</p>
          <SocialIcons>
            <a href="https://twitter.com/petgasmx" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com/petgasmx/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@PETGASMX" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </SocialIcons>
        </FooterLogo>
        <FooterBottom>
          <p> {currentYear} PetGas. Todos los derechos reservados. <VersionBadge>v2.0.0</VersionBadge></p>
          <FooterLinks>
            <a href="mailto:contacto@petgas.com.mx">contacto@petgas.com.mx</a>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
