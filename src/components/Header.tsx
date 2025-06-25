import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animación de la marquesina mejorada
const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const MarqueeContainer = styled.div`
  background: linear-gradient(90deg, #0a4b2a 0%, #0e6a3a 50%, #0a4b2a 100%);
  color: white;
  padding: 0.7rem 0;
  overflow: hidden;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  white-space: nowrap;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
  height: 44px;
  display: flex !important;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #0a4b2a, #4caf50, #0a4b2a);
  }
  
  @media (min-width: 768px) {
    font-size: 1.05rem;
    height: 48px;
    padding: 0.8rem 0;
  }
`;

const MarqueeContent = styled.div`
  display: inline-flex !important;
  align-items: center;
  white-space: nowrap;
  animation: ${marquee} 60s linear infinite;
  will-change: transform;
  position: relative;
  padding: 0 1rem;
  
  @media (min-width: 768px) {
    animation-duration: 80s;
    padding: 0 2rem;
  }
  
  @keyframes ${marquee} {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const MarqueeItem = styled.span`
  display: inline-flex !important;
  align-items: center;
  padding: 0 1.5rem;
  position: relative;
  white-space: nowrap;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  flex-shrink: 0;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
  
  &:not(:last-child)::after {
    content: '•';
    position: absolute;
    right: -5px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8em;
    line-height: 1;
  }
`;

const MarqueeImage = styled.img`
  height: 24px;
  width: auto;
  margin: 0 0.75rem;
  vertical-align: middle;
  filter: drop-shadow(0 0 5px rgba(17, 145, 75, 0.6));
  transition: transform 0.3s ease, filter 0.3s ease;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(17,145,75,0.4) 0%, rgba(17,145,75,0.1) 60%, rgba(0,0,0,0) 80%);
    filter: blur(4px);
    z-index: -1;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    filter: drop-shadow(0 0 8px rgba(17, 145, 75, 0.8));
    transform: scale(1.1);
    
    &::after {
      opacity: 0.9;
    }
  }
  
  &:hover {
    transform: scale(1.1);
  }
  
  @media (min-width: 768px) {
    height: 22px;
    margin: 0 1rem;
  }
`;

const MarqueeText = styled.span`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-size: 0.9em;
  
  &.highlight {
    color: #b3ff00;
    font-weight: 600;
  }
  
  @media (min-width: 768px) {
    font-size: 1em;
  }
`;

// Animación para las barras de señal celular
const signalBars = keyframes`
  0%, 100% { opacity: 0.6; transform: scaleY(1); }
  25% { opacity: 1; transform: scaleY(1.2); }
  50% { opacity: 0.8; transform: scaleY(0.8); }
  75% { opacity: 1; transform: scaleY(1.1); }
`;

const MobileModeIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 12px;
  border-radius: 20px;
  margin: 0 10px;
  
  span {
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  
  .signal-bars {
    display: flex;
    align-items: flex-end;
    height: 16px;
    gap: 2px;
    
    .bar {
      width: 4px;
      background: #4ade80;
      border-radius: 2px;
      animation: ${signalBars} 2s ease-in-out infinite;
      
      &:nth-child(1) { height: 25%; animation-delay: 0.1s; }
      &:nth-child(2) { height: 50%; animation-delay: 0.2s; }
      &:nth-child(3) { height: 75%; animation-delay: 0.3s; }
      &:nth-child(4) { height: 100%; animation-delay: 0.4s; }
    }
  }
`;

const HeaderContainer = styled.header`
  background-color: rgba(10, 75, 42, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 0.75rem 1.5rem;
  position: fixed;
  top: 44px; /* Ajuste para la marquesina más gruesa */
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @supports (padding: max(0px)) {
    padding: 0.75rem max(1.5rem, env(safe-area-inset-right)) 0.75rem max(1.5rem, env(safe-area-inset-left));
  }
  
  @media (min-width: 768px) {
    padding: 1rem 2rem;
    top: 48px; /* Ajuste para la marquesina más gruesa en desktop */
    
    @supports (padding: max(0px)) {
      padding: 1rem max(2rem, env(safe-area-inset-right)) 1rem max(2rem, env(safe-area-inset-left));
    }
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 80px;
  background-color: #0a4b2a;
  gap: 10px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  
  img {
    height: 40px;
    width: auto;
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    
    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }
    
    @media (min-width: 768px) {
      height: 50px;
    }
  }
`;

interface MenuButtonProps {
  $isOpen: boolean;
}

const MenuButton = styled.button<MenuButtonProps>`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  width: 44px;
  height: 44px;
  padding: 12px 10px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1002;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-tap-highlight-color: transparent;
  
  &:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.15);
  }
  
  span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: white;
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
    
    &:nth-child(1) {
      transform: ${props => props.$isOpen ? 'translateY(7px) rotate(45deg)' : 'none'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.$isOpen ? '0' : '1'};
      transform: ${props => props.$isOpen ? 'translateX(-20px)' : 'none'};
    }
    
    &:nth-child(3) {
      transform: ${props => props.$isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none'};
    }
  }
  
  @media (min-width: 992px) {
    display: none;
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.$isOpen ? '0' : '-320px'};
  width: min(320px, 85vw);
  height: 100vh;
  height: 100dvh;
  background: rgba(10, 75, 42, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 100px 20px 40px;
  z-index: 1001;
  border-radius: 20px 0 0 20px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.3);
  transform: translateX(${props => props.$isOpen ? '0' : '100%'});
  
  /* Ajuste para iPhone con notch */
  @supports (padding: max(0px)) {
    padding-top: calc(env(safe-area-inset-top) + 80px);
    padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
  }
  
  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  
  @media (min-width: 992px) {
    position: static;
    width: auto;
    height: auto;
    background: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    padding: 0 !important;
    overflow: visible !important;
    transform: none !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
  }
  
  @media (min-width: 1200px) {
    gap: 2rem;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

interface NavLinkProps {
  $isActive?: boolean;
  $highlight?: boolean;
}

const NavLink = styled(Link)<NavLinkProps>`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.5px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    transform: scale(0.98);
    background: rgba(255, 255, 255, 0.15);
  }
  
  ${props => props.$isActive && `
    color: #fff;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.1);
  `}
  
  ${props => props.$highlight && `
    background: linear-gradient(135deg, #00c853, #00e676);
    color: #fff !important;
    font-weight: 700;
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 200, 83, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 200, 83, 0.4);
      background: linear-gradient(135deg, #00c853, #69f0ae);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 10px rgba(0, 200, 83, 0.3);
    }
    
    &::after {
      display: none;
    }
  `}
  
  @media (min-width: 768px) {
    font-size: 0.95rem;
    padding: 0.5rem 0.75rem;
  }
  
  @media (min-width: 992px) {
    padding: 0.6rem 1rem;
    
    ${props => props.$highlight && `
      padding: 0.6rem 1.25rem;
    `}
  }
  
  @media (min-width: 1200px) {
    font-size: 1rem;
    padding: 0.7rem 1.25rem;
    
    ${props => props.$highlight && `
      padding: 0.7rem 1.5rem;
    `}
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 1000;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity;
  
  @supports (backdrop-filter: blur(5px)) or (-webkit-backdrop-filter: blur(5px)) {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  @media (min-width: 992px) {
    display: none;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Bloquear el scroll cuando el menú está abierto
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };
  
  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);
  
  // Cerrar el menú al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        closeMenu();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);
  
  // Asegurarse de que el scroll se restaure al desmontar
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <>
      <MarqueeContainer>
        <MarqueeContent>
          {[...Array(4)].map((_, i) => (
            <MarqueeItem key={i}>
              <MarqueeText>BIENVENIDO A PETGAS MÉXICO</MarqueeText>
              <MarqueeImage src="/img/bote_gasolina.png" alt="Bote de gasolina" style={{ height: '28px' }} />
              <MarqueeText className="highlight">Transformando residuos plásticos en energía sostenible</MarqueeText>
              <MarqueeImage src="/img/hero/logoGlow.png" alt="PETGAS Logo" style={{ height: '32px' }} />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </MarqueeContainer>
      
      <HeaderContainer>
        <Nav>
          <Logo to="/">
            <img src="/img/logo-header.png" alt="PETGAS Logo" />
          </Logo>
          
          <MobileModeIndicator>
            <div className="signal-bars">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <span>Mobile Mode</span>
          </MobileModeIndicator>
          
          <MenuButton 
            onClick={toggleMenu} 
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            $isOpen={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </MenuButton>
          
          <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
          
          <NavLinks $isOpen={isMenuOpen}>
            <NavList>
              <NavItem>
                <NavLink 
                  to="/" 
                  $isActive={location.pathname === '/'}
                >
                  INICIO
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  to="/equipo" 
                  $isActive={location.pathname === '/equipo'}
                >
                  EQUIPO
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  to="/maquinas" 
                  $isActive={location.pathname === '/maquinas'}
                >
                  NUESTRAS MÁQUINAS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  to="/combustibles" 
                  $isActive={location.pathname === '/combustibles'}
                >
                  COMBUSTIBLES
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  to="/creditos" 
                  $isActive={location.pathname === '/creditos'}
                >
                  CRÉDITOS PLÁSTICOS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  to="/contacto" 
                  $isActive={location.pathname === '/contacto'}
                >
                  CONTACTO
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  to="/intranet" 
                  $isActive={location.pathname === '/intranet'}
                  $highlight
                >
                  INTRANET
                </NavLink>
              </NavItem>
            </NavList>
          </NavLinks>
        </Nav>
      </HeaderContainer>
    </>
  );
};

export default Header;
