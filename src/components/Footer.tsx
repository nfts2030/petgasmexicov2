import React from 'react'; // Eliminado useEffect no utilizado
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animación simple para los elementos del menú
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Animaciones para el efecto 3D del logo
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

const shine = keyframes`
  0% { transform: translateX(-100%) rotate(30deg); }
  100% { transform: translateX(100%) rotate(30deg); }
`;

const twinkle = keyframes`
  0%, 100% { 
    opacity: 0.4; 
    transform: scale(0.9); 
    box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.5);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.1);
    box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.9);
  }
`;

const shadowPulse = keyframes`
  0%, 100% { 
    transform: scale(0.9);
    opacity: 0.7;
  }
  50% { 
    transform: scale(1.1);
    opacity: 0.4;
  }
`;

const pulse = keyframes`
  0% { 
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }
  100% { 
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 1;
  }
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
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: #0a4b2a;
  }
`;

const FooterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/img/04/fdoverdeiconos.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  opacity: 0.1;
  filter: grayscale(100%) brightness(0.8);
`;

const FooterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0a1a1a;
  z-index: 2;
`;

const FooterContent = styled.div`
  position: relative;
  z-index: 3;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const FooterGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;
  z-index: 3;

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

// Componentes para el efecto 3D del logo
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
  background: radial-gradient(circle, rgba(17,145,75,0.6) 0%, rgba(17,145,75,0.2) 60%, rgba(0,0,0,0) 80%);
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
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%);
    transform: rotate(30deg);
    animation: ${shine} 8s linear infinite;
    filter: blur(1px);
  }
`;

const LogoLight = styled.div<{ top: string; left: string; size: string; delay: string }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  filter: blur(1.5px);
  animation: ${twinkle} 4s infinite alternate;
  animation-delay: ${props => props.delay};
  z-index: 3;
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
  animation: ${shadowPulse} 6s ease-in-out infinite;
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

// Contenedor del logo
const FooterLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  
  p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
    font-size: 0.9rem;
    max-width: 100%;
    margin: 20px 0 0;
    text-align: center;
  }
  
  @media (max-width: 992px) {
    grid-column: 1 / -1;
    
    p {
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;



const FooterSection = styled.div`
  margin-bottom: 20px;
  
  h3 {
    color: #7cda24;
    font-size: 1rem;
    margin-bottom: 12px;
    padding-bottom: 8px;
    font-weight: 600;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 30px;
      height: 2px;
      background: #7cda24;
    }
    
    @media (min-width: 768px) {
      text-align: left;
      
      &::after {
        left: 0;
        transform: none;
      }
    }
  }
  
  @media (min-width: 768px) {
    flex: 0 0 48%;
    text-align: left;
  }
  
  @media (min-width: 1024px) {
    flex: 1;
    padding: 0 15px;
  }
`;

const FooterMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 8px;
    opacity: 0;
    transform: translateY(10px);
    animation: ${fadeIn} 0.5s ease-out forwards;
    
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        animation-delay: #{0.2 + ($i * 0.05)}s;
      }
    }
  }
  
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    display: inline-block;
    position: relative;
    padding: 5px 0;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #7cda24;
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: #fff;
      transform: translateX(5px);
      
      &::after {
        width: 100%;
      }
    }
    
    &.highlight {
      color: #7cda24;
      font-weight: 600;
      
      &:hover {
        color: #fff;
      }
    }
  }
  
  @media (max-width: 992px) {
    text-align: center;
    
    a {
      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
      
      &:hover {
        transform: translateX(0) translateY(-2px);
        
        &::after {
          width: 40%;
        }
      }
    }
  }
`;

const ContactInfo = styled.div`
  p {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    opacity: 0;
    transform: translateY(10px);
    animation: ${fadeIn} 0.5s ease-out forwards;
    
    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        animation-delay: #{0.3 + ($i * 0.1)}s;
      }
    }
    
    i {
      margin-right: 10px;
      color: #7cda24;
      width: 16px;
      text-align: center;
      font-size: 1rem;
      margin-top: 2px;
      flex-shrink: 0;
    }
    
    a {
      color: inherit;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
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
  }
  
  @media (max-width: 992px) {
    p {
      justify-content: center;
      text-align: center;
      flex-direction: column;
      
      i {
        margin: 0 auto 8px;
      }
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

const Copyright = styled.div`
  p {
    margin: 0 0 12px 0;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const LegalLinks = styled.div`
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
        <FooterGrid>
          <FooterLogo>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo3DContainer>
                <Logo3DInner>
                  <LogoFront>
                    <img 
                      src="/img/logoGlow.png" 
                      alt="PETGAS Logo"
                    />
                  </LogoFront>
                  <LogoEffects>
                    <LogoGlow />
                    <LogoBorder />
                    <LogoShine />
                    <LogoLight top="20%" left="20%" size="6px" delay="4s" />
                    <LogoLight top="70%" left="70%" size="4px" delay="3s" />
                    <LogoReflection />
                  </LogoEffects>
                </Logo3DInner>
                <LogoShadow />
              </Logo3DContainer>
            </Link>
            <p>Transformando residuos en energía limpia y sostenible para un futuro mejor.</p>
            
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
          
          <FooterSection>
            <h3>Enlaces</h3>
            <FooterMenu>
              <li><Link to="/">INICIO</Link></li>
              <li><Link to="/equipo">EQUIPO</Link></li>
              <li><Link to="/maquinas">MÁQUINAS</Link></li>
              <li><Link to="/combustibles">COMBUSTIBLES</Link></li>
              <li><Link to="/creditos">CRÉDITOS PLÁSTICOS</Link></li>
              <li><Link to="/contacto">CONTACTO</Link></li>
              <li><Link to="/intranet" className="highlight">INTRANET</Link></li>
            </FooterMenu>
          </FooterSection>
          
          <FooterSection>
            <h3>Contacto</h3>
            <ContactInfo>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                <span>Ciudad de México, México</span>
              </p>
              <p>
                <i className="fas fa-phone-alt"></i>
                <a href="tel:+522295484549">+52 229 548 4549</a>
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                <a href="mailto:contacto@petgas.com.mx">contacto@petgas.com.mx</a>
              </p>
              <p>
                <i className="fas fa-clock"></i>
                <span>Lun-Vie: 9:00 AM - 6:00 PM<br />Sáb: 9:00 AM - 2:00 PM</span>
              </p>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Copyright>
              <p>&copy; {currentYear} PETGAS. Todos los derechos reservados.</p>
              <LegalLinks>
                <a href="#">Términos y Condiciones</a>
                <span>|</span>
                <a href="#">Aviso de Privacidad</a>
              </LegalLinks>
            </Copyright>
          </div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
