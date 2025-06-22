import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animación de la marquesina
const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const MarqueeContainer = styled.div`
  background-color: #0a4b2a;
  color: white;
  padding: 0.5rem 0;
  overflow: hidden;
  width: 100%;
  position: relative;
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.2;
  height: 30px;
  display: flex !important;
  align-items: center;
  z-index: 1000;
  
  /* Asegurar que la marquesina esté por encima de otros elementos */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  
  @media (min-width: 768px) {
    font-size: 0.9rem;
    height: 36px;
  }
`;

const MarqueeContent = styled.div`
  display: inline-flex !important;
  align-items: center;
  white-space: nowrap;
  animation: ${marquee} 40s linear infinite;
  padding-left: 100%;
  will-change: transform;
  position: relative;
  min-width: 100%;
  
  span {
    display: inline-flex !important;
    align-items: center;
    padding: 0 1.5rem;
    position: relative;
    white-space: nowrap;
    
    &:not(:last-child)::after {
      content: '•';
      position: absolute;
      right: 0;
      color: rgba(255, 255, 255, 0.7);
    }
  }
  
  @media (min-width: 768px) {
    animation-duration: 50s;
  }
  
  /* Asegurar que el contenido no se corte */
  @keyframes ${marquee} {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
`;

const MarqueeLogo = styled.img`
  height: 16px;
  width: auto;
  margin: 0 0.5rem;
  vertical-align: middle;
  
  @media (min-width: 768px) {
    height: 20px;
    margin: 0 0.75rem;
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #0a4b2a;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
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
    height: 70px;
    width: auto;
    object-fit: contain;
  }
`;

interface MenuButtonProps {
  $isOpen: boolean;
}

const MenuButton = styled.button<MenuButtonProps>`
  background: none;
  border: none;
  width: 30px;
  height: 25px;
  position: relative;
  cursor: pointer;
  z-index: 1001;
  padding: 0;
  
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: #fff;
    border-radius: 3px;
    opacity: 1;
    left: 0;
    transition: all 0.25s ease-in-out;
    
    &:nth-child(1) {
      top: ${({ $isOpen }) => ($isOpen ? '11px' : '0')};
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }
    
    &:nth-child(2) {
      top: 11px;
      opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
    }
    
    &:nth-child(3) {
      top: ${({ $isOpen }) => ($isOpen ? '11px' : '22px')};
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
  
  @media (min-width: 992px) {
    display: none;
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  width: 80%;
  max-width: 400px;
  height: 100vh;
  background-color: #0a4b2a;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: right 0.4s ease-in-out;
  padding: 6rem 2rem 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  
  @media (min-width: 992px) {
    position: static;
    width: auto;
    height: auto;
    background: transparent;
    box-shadow: none;
    padding: 0;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    overflow: visible;
  }
  
  @media (min-width: 1200px) {
    gap: 1.5rem;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  
  @media (min-width: 1200px) {
    gap: 1rem;
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
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
  white-space: nowrap;
  font-size: 1rem;
  
  ${({ $highlight }) => $highlight && `
    background-color: #fff;
    color: #0a4b2a !important;
    border-radius: 4px;
    padding: 0.5rem 1rem !important;
    margin-left: 0.5rem;
    
    &:hover {
      background-color: #e6e6e6;
    }
  `}
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $isActive }) => ($isActive ? 'calc(100% - 1.5rem)' : '0')};
    height: 2px;
    background-color: #fff;
    transition: width 0.3s ease;
    display: ${({ $highlight }) => $highlight ? 'none' : 'block'};
  }
  
  &:hover::after {
    width: calc(100% - 1.5rem);
  }
  
  @media (min-width: 992px) {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
    
    ${({ $highlight }) => $highlight && `
      padding: 0.5rem 1rem;
      margin-left: 0.5rem;
    `}
  }
  
  @media (min-width: 1200px) {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
    
    ${({ $highlight }) => $highlight && `
      padding: 0.6rem 1.25rem;
      margin-left: 0.75rem;
    `}
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.4s ease, visibility 0.4s ease;
  z-index: 999;
  backdrop-filter: blur(3px);
  
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
          <span>BIENVENIDO A PETGAS MÉXICO</span>
          <span>RECICLAMOS TODO TIPO DE PLÁSTICO</span>
          <span>CONTRIBUYAMOS A UN MUNDO MÁS LIMPIO</span>
          <span>RECICLAR ES RESPONSABILIDAD DE TODOS</span>
          <MarqueeLogo src="/img/logoGlow.png" alt="PETGAS Logo" />
          <span>La tecnología de Petgas transforma plásticos no reciclables en: Gasolina, Diesel, Parafina, Queroseno y Gas.</span>
          <MarqueeLogo src="/img/logoGlow.png" alt="PETGAS Logo" />
          <MarqueeLogo src="/img/logoGlow.png" alt="PETGAS Logo" />
          <MarqueeLogo src="/img/logoGlow.png" alt="PETGAS Logo" />
          <span>La tecnología de Petgas transforma plásticos no reciclables en: Gasolina, Diesel, Parafina, Queroseno y Gas.</span>
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
