import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import PageLayout from '../components/layout/PageLayout';
import LogoSpinner from '../components/ui/LogoSpinner';
import DepartmentBadge from '../components/ui/DepartmentBadge';
import DepartmentTitle from '../components/ui/DepartmentTitle';
import { getDepartmentColor } from '../utils/departmentColors';

// Animaciones para el gradiente
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AnimatedGradient = styled.span`
  background: linear-gradient(90deg, #0a4b2a, #7cda24, #0a4b2a);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 5s ease infinite;
`;

// Styled components
const HeroSection = styled.section`
  background: transparent;
  color: #333;
  padding: 15px 0;
  text-align: center;
  position: relative;
  margin: 0;
  width: 100%;
  min-height: auto;
  max-height: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* Mejora para iOS */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
  /* Ajustes para iOS */
  @supports (-webkit-touch-callout: none) {
    -webkit-overflow-scrolling: touch;
  }
  
  /* Ajustes para dispositivos muy pequeños */
  @media (max-width: 360px) {
    padding: 10px 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(124, 218, 36, 0.1) 0%, transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(10, 75, 42, 0.2) 0%, transparent 25%);
    z-index: 1;
  }
  

`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 10px 15px;
  }
  
  /* Asegurar que el contenido no se desborde en iOS */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  margin: 0 0 0.3rem 0;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.1;
  position: relative;
  z-index: 2;
  padding: 0 15px;
  color: #0a4b2a; /* Verde Petgas */
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 0.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  max-width: 800px;
  width: 100%;
  margin: 0.5rem auto;
  line-height: 1.4;
  font-weight: 400;
  padding: 10px 15px;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin: 0.5rem auto;
    padding: 8px 12px;
    line-height: 1.4;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 6px 10px;
  }
`;

const TeamContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
  margin: 3rem 0;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

// Animaciones para las tarjetas

const TeamMember = styled.div<{ $isVisible: boolean; $delay: number; $departmentColor?: string }>`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transform: ${({ $isVisible }) => $isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 0.6s ease-out ${({ $delay }) => $delay}s;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    max-width: 350px;
    margin: 0 auto 30px;
  }
`;

const MemberImage = styled.div<{ $imageUrl?: string }>`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  
  /* Efecto de borde brillante */
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid transparent;
    border-image: linear-gradient(45deg, #7cda24, #0a4b2a, #7cda24);
    border-image-slice: 1;
    z-index: 1;
    animation: borderGlow 3s ease infinite;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 1;
  }
  

  
  .logo-spinner-container {
    position: absolute;
    z-index: 1; /* Detrás de la foto */
    transform: scale(1.2); /* Spinner más grande */
    transition: transform 0.3s ease;
    background: transparent;
    border-radius: 50%;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s ease-in-out infinite;
    
    &::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border: 3px solid transparent;
      border-radius: 50%;
      border-top-color: #7cda24;
      border-right-color: #0a4b2a;
      animation: spin 3s linear infinite;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 3px solid transparent;
      border-radius: 50%;
      border-bottom-color: #7cda24;
      border-left-color: #0a4b2a;
      animation: spinReverse 2.5s linear infinite;
    }
  }
  
  @keyframes borderGlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes spinReverse {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1.15); }
    50% { transform: scale(1.25); }
    100% { transform: scale(1.15); }
  }
  
  ${TeamMember}:hover & .logo-spinner-container {
    transform: scale(0.85);
  }
`;

const MemberInfo = styled.div`
  padding: 25px;
  text-align: center;
  position: relative;
  background: #fff;
  z-index: 2;
  
  h3 {
    margin: 0 0 8px 0;
    color: #0a4b2a;
    font-size: 1.4rem;
    font-weight: 700;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 2px;
      background: #7cda24;
      transition: width 0.3s ease;
    }
  }
  
  p {
    margin: 0 0 5px 0;
    color: #555;
    font-size: 0.95rem;
    line-height: 1.6;
    
    &.role {
      color: #7cda24;
      font-weight: 600;
      margin-bottom: 12px;
      font-size: 0.95rem;
      letter-spacing: 0.5px;
    }
    
    /* Estilos de división movidos al componente DepartmentBadge */
    
    &.bio {
      margin-top: 15px;
      color: #666;
      font-size: 0.9rem;
      line-height: 1.7;
    }
  }
`;

// DepartmentBadge ha sido movido a un componente separado

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  opacity: 1; /* Hacer visible por defecto */
  transform: none; /* Eliminar la animación inicial */
  
  a {
    color: #0a4b2a;
    background: #f0f9f0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 2px 8px rgba(10, 75, 42, 0.15);
    border: 1px solid #e0f0e0;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0a4b2a, #7cda24);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 0;
    }
    
    i {
      position: relative;
      z-index: 1;
      transition: transform 0.3s ease, color 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      
      &::before {
        opacity: 1;
      }
      
      i {
        color: white;
        transform: scale(1.1);
      }
    }
    
    &:active {
      transform: translateY(-1px) scale(0.98);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
    
    /* Estilo específico para el ícono de correo */
    &[aria-label*="correo"] {
      i {
        color: #d44638; /* Rojo de Gmail */
      }
      
      &:hover i {
        color: white;
      }
    }
  }
`;

// Interfaz para los miembros del equipo
interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  email: string;
  division: string;
  social: {
    email: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Datos del equipo
const teamMembers: TeamMember[] = [
  // Equipo Directivo
  {
    id: 1,
    name: 'Daniel Rodríguez Gutiérrez',
    role: 'Director General',
    image: '/equipo/daniel_rodriguez.png',
    bio: 'Líder de la visión estratégica y dirección general de PETGAS, con amplia experiencia en la gestión de proyectos de transformación de residuos.',
    email: 'drg@petgas.com.mx',
    division: 'Dirección General',
    social: {
      email: 'drg@petgas.com.mx',
      linkedin: '#'
    }
  },
  {
    id: 2,
    name: 'José de Jesús Escoto Romero',
    role: 'Director Comercial',
    image: '/equipo/Romero.jpg',
    bio: 'A cargo de las estrategias comerciales y desarrollo de negocios en PETGAS, con enfoque en la expansión de mercados y alianzas estratégicas.',
    email: 'jer@petgas.com.mx',
    division: 'Área Comercial',
    social: {
      email: 'jer@petgas.com.mx',
      linkedin: '#'
    }
  },
  {
    id: 3,
    name: 'Jesús Manuel Escoto Faces',
    role: 'Director de Mercadotecnia y Vinculación Global',
    image: '/equipo/jesus_escoto_faces.png',
    bio: 'Responsable de establecer y mantener relaciones estratégicas globales y desarrollar estrategias de marketing para posicionar a PETGAS en el mercado internacional.',
    email: 'jef@petgas.com.mx',
    division: 'Vinculación Global',
    social: {
      email: 'jef@petgas.com.mx',
      linkedin: '#'
    }
  },
  {
    id: 4,
    name: 'Andoni Álvarez Heiling',
    role: 'Director Jurídico',
    image: '/equipo/andoni_alvarez.png',
    bio: 'Encargado de asesorar legalmente a la empresa, garantizando el cumplimiento normativo y protegiendo los intereses de PETGAS en todos los aspectos legales.',
    email: 'legal@petgas.com.mx',
    division: 'Área Legal',
    social: {
      email: 'legal@petgas.com.mx',
      linkedin: '#'
    }
  },
  {
    id: 5,
    name: 'Diego Escoto Yunes',
    role: 'Director de Desarrollo Global',
    image: '/equipo/diego_escoto.png',
    bio: 'Apoya en la gestión de alianzas estratégicas y relaciones internacionales para el crecimiento global de PETGAS.',
    email: 'dey@petgas.com.mx',
    division: 'Vinculación Global',
    social: {
      email: 'dey@petgas.com.mx',
      linkedin: '#'
    }
  },
  {
    id: 6,
    name: 'Fabio Baca Padilla',
    role: 'Director Desarrollo Tecnológico',
    image: '/equipo/fabio_baca.png',
    bio: 'Líder en la implementación de tecnologías innovadoras para la optimización de procesos de transformación de residuos.',
    email: 'fbp@petgas.com.mx',
    division: 'Tecnología',
    social: {
      email: 'fbp@petgas.com.mx',
      linkedin: '#'
    }
  },
  {
    id: 7,
    name: 'Kathia Liahut Lopez',
    role: 'Responsable Área Química',
    image: '/equipo/katia_liahut.png',
    bio: 'Experta en procesos químicos y control de calidad, asegurando los más altos estándares en la producción de combustibles sostenibles.',
    email: 'quimica@petgas.com.mx',
    division: 'Investigación',
    social: {
      email: 'quimica@petgas.com.mx',
      linkedin: '#'
    }
  },
  {
    id: 8,
    name: 'Christopher Trapp',
    role: 'Miembro del consejo',
    image: '/equipo/consejo.jpg',
    bio: 'Miembro activo del consejo directivo, aportando experiencia y visión estratégica para el crecimiento sostenible de PETGAS.',
    email: 'christopher.trapp@petgas.com.mx',
    division: 'Consejo Directivo',
    social: {
      email: 'christopher.trapp@petgas.com.mx',
      linkedin: '#'
    }
  },
  
  // Divisiones
  {
    id: 9,
    name: 'Roberto Cerda',
    role: 'Líder de Petgas Oceans',
    image: '/equipo/oceans.jpg',
    bio: 'Encargado de la división especializada en soluciones oceánicas sostenibles y gestión de residuos marinos.',
    email: 'oceans@petgas.com.mx',
    division: 'Petgas Oceans',
    social: {
      email: 'oceans@petgas.com.mx',
      linkedin: '#'
    }
  },
  {
    id: 10,
    name: 'Sandra M. Ponce de Leon',
    role: 'Líder de Alianzas Internacionales',
    image: '/equipo/sandra_ponce.png',
    bio: 'Responsable de establecer y mantener alianzas estratégicas a nivel internacional para el crecimiento global de PETGAS.',
    email: 'spd@petgas.com.mx',
    division: 'Executiva International Partnerships',
    social: {
      email: 'spd@petgas.com.mx',
      linkedin: '#'
    }
  },
  {
    id: 11,
    name: 'Estefania Ferrera Salgado',
    role: 'Líder de Desarrollo Web3',
    image: '/equipo/Estefania.jpg',
    bio: 'Especialista en tecnologías blockchain y Web3, liderando la estrategia de transformación digital de PETGAS.',
    email: 'efs@petgas.com.mx',
    division: 'Web3',
    social: {
      email: 'efs@petgas.com.mx',
      linkedin: '#'
    }
  }
];

const EquipoPage: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    // Trigger animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <PageLayout>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            <AnimatedGradient>
              Nuestro Equipo
            </AnimatedGradient>
          </HeroTitle>
          <HeroSubtitle>
            Conoce al equipo de expertos que está transformando la industria de los residuos plásticos en México
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>
      
      <TeamContainer>
        <DepartmentTitle department="Dirección General">
          Equipo Directivo
        </DepartmentTitle>
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamMember 
              key={member.id}
              $isVisible={isVisible}
              $delay={index * 0.1}
              $departmentColor={getDepartmentColor(member.division)}
              className="team-member"
            >
              <MemberImage 
                className="member-image"
                $imageUrl={member.image}
              >
                <div className="logo-spinner-container">
                  <LogoSpinner text={member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()} />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  bottom: '20px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  zIndex: 3,
                  border: 'none',
                  background: 'transparent'
                }}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      transform: 'scale(1.05)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                  />
                </div>
              </MemberImage>
              <MemberInfo>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
                <DepartmentBadge $color={getDepartmentColor(member.division)}>
                  {member.division}
                </DepartmentBadge>
                <SocialLinks className="social-links">
                  <a 
                    href={`mailto:${member.social.email}`} 
                    aria-label={`Enviar correo a ${member.name}`} 
                    title={`Enviar correo a ${member.social.email}`}
                    className="email-link"
                  >
                    <i className="fas fa-envelope"></i>
                  </a>
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`Perfil de LinkedIn de ${member.name.split(' ')[0]}`} 
                      title={`Ver perfil de LinkedIn`}
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`Perfil de Twitter de ${member.name.split(' ')[0]}`} 
                      title={`Ver perfil de Twitter`}
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                </SocialLinks>
              </MemberInfo>
            </TeamMember>
          ))}
        </TeamGrid>
        
        <DepartmentTitle department="Área Comercial">
          Equipo Comercial
        </DepartmentTitle>
        <TeamGrid>
          {teamMembers.slice(8).map((member, index) => (
            <TeamMember 
              key={member.id}
              $isVisible={isVisible}
              $delay={(index + teamMembers.length - 8) * 0.1}
              $departmentColor={getDepartmentColor(member.division)}
              className="team-member"
            >
              <MemberImage 
                className="member-image"
                $imageUrl={member.image}
              >
                <div className="logo-spinner-container">
                  <LogoSpinner text={member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()} />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  bottom: '20px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  zIndex: 3,
                  border: 'none',
                  background: 'transparent'
                }}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      transform: 'scale(1.05)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                  />
                </div>
              </MemberImage>
              <MemberInfo>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
                <DepartmentBadge $color={getDepartmentColor(member.division)}>
                  {member.division}
                </DepartmentBadge>
                <SocialLinks className="social-links">
                  <a 
                    href={`mailto:${member.social.email}`} 
                    aria-label={`Enviar correo a ${member.name}`} 
                    title={`Enviar correo a ${member.social.email}`}
                    className="email-link"
                  >
                    <i className="fas fa-envelope"></i>
                  </a>
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`Perfil de LinkedIn de ${member.name.split(' ')[0]}`} 
                      title={`Ver perfil de LinkedIn`}
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  )}
                </SocialLinks>
              </MemberInfo>
            </TeamMember>
          ))}
        </TeamGrid>
      </TeamContainer>
      
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2 style={{ color: '#0a4b2a', marginBottom: '1rem' }}>¿Quieres unirte a nuestro equipo?</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Estamos en constante búsqueda de talento comprometido con la sostenibilidad y la innovación.
        </p>
        <a 
          href="/contacto" 
          style={{
            display: 'inline-block',
            padding: '0.8rem 2rem',
            backgroundColor: '#0a4b2a',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0d6a3a')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0a4b2a')}
        >
          Contáctanos
        </a>
      </div>
    </PageLayout>
  );
};

export default EquipoPage;
