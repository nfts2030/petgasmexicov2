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
  background: linear-gradient(135deg, rgba(10, 75, 42, 0.9) 0%, rgba(5, 45, 25, 0.95) 100%), 
              url('/img/04/fdoverdeiconos.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  padding: 120px 20px 80px; /* Ajuste de padding superior para iPhone */
  text-align: center;
  position: relative;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  /* Asegurar que el contenido no se corte en dispositivos móviles */
  @supports (-webkit-touch-callout: none) {
    /* iOS specific styles */
    min-height: -webkit-fill-available;
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
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, transparent, #f8f9fa);
    z-index: 1;
    clip-path: polygon(0 70%, 100% 40%, 100% 100%, 0% 100%);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    min-height: 70vh;
    box-sizing: border-box;
  }
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1px;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5rem;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 992px) {
    font-size: 3rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
    padding: 0 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.25rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  width: 100%;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.5;
    padding: 0 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.4;
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

const MemberImage = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: url('/img/04/fdoverdeiconos.jpg') center/cover no-repeat;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(10, 75, 42, 0.7) 0%, rgba(10, 75, 42, 0.4) 100%);
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  
  .logo-spinner-container {
    position: relative;
    z-index: 2;
    transform: scale(0.8);
    transition: transform 0.3s ease;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    padding: 10px;
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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
    image: '/equipo/PERSONAL.jpg',
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
    image: '/equipo/PERSONAL.jpg',
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
    image: '/equipo/PERSONAL.jpg',
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
    image: '/equipo/PERSONAL.jpg',
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
    image: '/equipo/PERSONAL.jpg',
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
    image: '/equipo/tecnologia.jpg',
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
    image: '/equipo/quimica.jpg',
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
    image: '/equipo/partnerships.jpg',
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
    image: '/equipo/web3.jpg',
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
          <div style={{
            background: 'linear-gradient(145deg, rgba(10, 75, 42, 0.9), rgba(15, 105, 62, 0.8))',
            padding: '2.5rem 2rem',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transform: 'perspective(1000px) rotateX(0.5deg)',
            transformStyle: 'preserve-3d',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <HeroTitle style={{
              fontSize: '2.8rem',
              marginBottom: '1rem',
              textShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              letterSpacing: '-0.5px',
              position: 'relative',
              display: 'inline-block',
              padding: '0 1rem',
              transform: 'translateZ(20px)'
            }}>
              <AnimatedGradient>
                Nuestro Equipo
              </AnimatedGradient>
            </HeroTitle>
            <HeroSubtitle style={{
              fontSize: '1.2rem',
              maxWidth: '800px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.95)',
              fontWeight: 400,
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              padding: '0 1rem',
              position: 'relative',
              zIndex: 1
            }}>
              Conoce al equipo de expertos que está transformando la industria de los residuos plásticos en México
            </HeroSubtitle>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
              zIndex: 0
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124, 218, 36, 0.2) 0%, rgba(124, 218, 36, 0) 70%)',
              zIndex: 0
            }}></div>
          </div>
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
              <MemberImage className="member-image">
                <div className="logo-spinner-container">
                  <LogoSpinner text={member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()} />
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
              <MemberImage className="member-image">
                <div className="logo-spinner-container">
                  <LogoSpinner text={member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()} />
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
