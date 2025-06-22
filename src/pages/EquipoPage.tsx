import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import PageLayout from '../components/layout/PageLayout';
import LogoSpinner from '../components/ui/LogoSpinner';

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/img/04/fdoverdeiconos.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 120px 20px 80px;
  text-align: center;
  position: relative;
  margin-bottom: 40px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHBhdGggZmlsbD0iI2ZmYzEwNyIgZmlsbC1vcGFjaXR5PSIwLjA1IiBkPSJNNDQwIDMwMEM0NDAgMTc5LjQgMzQ4LjYgOTAgMjM1IDkwUzMwIDE3OS40IDMwIDMwMHM5MS40IDIxMCAyMDUgMjEwIDIwNS05MS40IDIwNS0yMTB6Ii8+PC9zdmc+') center/cover no-repeat;
    opacity: 0.1;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease-out forwards;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 0.3s forwards;
  
  @media (max-width: 768px) {
    font-size: 1rem;
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

const TeamMember = styled.div<{ $isVisible: boolean; $delay: number }>`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateY(0) scale(1);
  position: relative;
  z-index: 1;
  opacity: 0;
  animation: ${({ $isVisible, $delay }) => 
    $isVisible ? css`${fadeIn} 0.6s ease-out ${$delay}s forwards` : 'none'
  };
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    
    .member-image {
      transform: scale(1.05);
      filter: brightness(1);
    }
    
    .social-links {
      opacity: 1;
      transform: translateY(0);
    }
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
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
    
    &.division {
      font-size: 0.8rem;
      color: #fff;
      font-weight: 500;
      padding: 5px 15px;
      background: #0a4b2a;
      display: inline-block;
      border-radius: 20px;
      margin-top: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 3px 10px rgba(10, 75, 42, 0.3);
      transition: all 0.3s ease;
      
      &:hover {
        background: #7cda24;
        transform: translateY(-2px);
      }
    }
    
    &.bio {
      margin-top: 15px;
      color: #666;
      font-size: 0.9rem;
      line-height: 1.7;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
  
  a {
    color: #fff;
    background: #0a4b2a;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: #7cda24;
      color: #0a4b2a;
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
      transform: translateY(-1px) scale(0.98);
    }
  }
`;

// Datos del equipo
const teamMembers = [
  {
    id: 1,
    name: 'Daniel Rodríguez Gutiérrez',
    role: 'Director General',
    image: '/equipo/PERSONAL.jpg',
    bio: 'Líder de la visión estratégica y dirección general de PETGAS, con amplia experiencia en la gestión de proyectos de transformación de residuos.',
    email: 'drg@petgas.com.mx',
    division: 'Dirección General',
    social: {
      email: 'drg@petgas.com.mx'
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
      email: 'jer@petgas.com.mx'
    }
  },
  {
    id: 3,
    name: 'Jesús Manuel Escoto Faces',
    role: 'CSO de Vinculación Global y Marketing',
    image: '/equipo/PERSONAL.jpg',
    bio: 'Responsable de establecer y mantener relaciones estratégicas globales y desarrollar estrategias de marketing para posicionar a PETGAS en el mercado internacional.',
    email: 'jef@petgas.com.mx',
    division: 'Vinculación Global',
    social: {
      email: 'jef@petgas.com.mx'
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
      email: 'legal@petgas.com.mx'
    }
  },
  {
    id: 5,
    name: 'Diego Escoto Yunes',
    role: 'Subdirector de Vinculación Global',
    image: '/equipo/PERSONAL.jpg',
    bio: 'Apoya en la gestión de alianzas estratégicas y relaciones internacionales para el crecimiento global de PETGAS.',
    email: 'info@petgas.com.mx',
    division: 'Vinculación Global',
    social: {
      email: 'info@petgas.com.mx'
    }
  },
  {
    id: 6,
    name: 'Fabio Baca Padilla',
    role: 'Director Desarrollo Tecnológico',
    image: '/equipo/tecnologia.jpg',
    bio: 'Líder en la implementación de tecnologías innovadoras para la optimización de procesos de transformación de residuos.',
    email: 'tecnologia@petgas.com.mx',
    division: 'Tecnología',
    social: {
      email: 'tecnologia@petgas.com.mx'
    }
  },
  {
    id: 7,
    name: 'Kathia Liahut Lopez',
    role: 'Responsable Área Química',
    image: '/equipo/quimica.jpg',
    bio: 'Experta en procesos químicos y control de calidad, asegurando los más altos estándares en la producción de combustibles sostenibles.',
    email: 'quimica@petgas.com.mx',
    division: 'Laboratorio',
    social: {
      email: 'quimica@petgas.com.mx'
    }
  },
  {
    id: 8,
    name: 'Christopher Trapp',
    role: 'Miembro del consejo',
    image: '/equipo/consejo.jpg',
    bio: 'Miembro activo del consejo directivo, aportando experiencia y visión estratégica para el crecimiento sostenible de PETGAS.',
    email: 'consejo@petgas.com.mx',
    division: 'Consejo Directivo',
    social: {
      email: 'consejo@petgas.com.mx'
    }
  },
  {
    id: 9,
    name: 'Petgas Oceans',
    role: 'División',
    image: '/equipo/oceans.jpg',
    bio: 'Líder: Roberto Cerda',
    email: 'oceans@petgas.com.mx',
    division: 'División Especializada',
    social: {
      email: 'oceans@petgas.com.mx'
    }
  },
  {
    id: 10,
    name: 'Executiva International Partnerships',
    role: 'División',
    image: '/equipo/partnerships.jpg',
    bio: 'Líder: Sandra M. Ponce de Leon',
    email: 'partnerships@petgas.com.mx',
    division: 'Alianzas Internacionales',
    social: {
      email: 'partnerships@petgas.com.mx'
    }
  },
  {
    id: 11,
    name: 'Web3',
    role: 'División',
    image: '/equipo/web3.jpg',
    bio: 'Líder: Estefania Ferrera Salgado',
    email: 'web3@petgas.com.mx',
    division: 'Tecnología Blockchain',
    social: {
      email: 'web3@petgas.com.mx'
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
    <PageLayout title="Nuestro Equipo">
      <HeroSection>
        <HeroContent>
          <HeroTitle>Nuestro Equipo</HeroTitle>
          <HeroSubtitle>
            Conoce al equipo de expertos que está transformando la industria de los residuos plásticos en México
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>
      
      <TeamContainer>
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamMember 
              key={member.id}
              $isVisible={isVisible}
              $delay={index * 0.1}
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
                <p className="division">{member.division}</p>
                <SocialLinks className="social-links">
                  <a href={`mailto:${member.email}`} aria-label={`Enviar correo a ${member.name}`} title="Enviar correo">
                    <i className="fas fa-envelope"></i>
                  </a>
                  <a href={`tel:+522295484549`} aria-label="Llamar" title="Llamar">
                    <i className="fas fa-phone"></i>
                  </a>
                  <a href="#" aria-label="LinkedIn" title="Perfil de LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
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
