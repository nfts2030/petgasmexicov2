import React from 'react';
import { Container, Button } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import ServicesSection from '../components/home/ServicesSection';
import ProcessSection from '../components/home/ProcessSection';
import PlasticTypesSection from '../components/home/PlasticTypesSection';
import StatisticsSection from '../components/home/StatisticsSection';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Estilos de la página de inicio

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(-45deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), 
              url('/img/09/fdoininvo2.jpg') center/cover no-repeat fixed;
  background-blend-mode: overlay;
  animation: ${gradientMove} 15s ease infinite;
  background-size: 400% 400%, cover;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  margin-top: 80px; /* Ajustado para el header fijo */
  
  @media (max-width: 992px) {
    margin-top: 60px;
    height: 80vh;
  }
  
  @media (max-width: 768px) {
    margin-top: 50px;
    height: 70vh;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  margin: 0 0 25px 0;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.5px;
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
  animation: ${gradientAnimation} 8s ease infinite;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: inline-block;
  padding: 0 10px;
  
  @media (max-width: 992px) {
    font-size: 3.5rem;
    background-size: 200% 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 20px;
    background-size: 150% 100%;
  }
  
  @media (max-width: 992px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 25px;
  }
`;

const Logo3D = styled.div`
  width: 160px;
  height: 160px;
  margin: 0 auto 20px;
  perspective: 1000px;
  animation: ${float} 6s ease-in-out infinite;
`;

const HomePage: React.FC = () => {

  return (
    <div className="home-page">
      <HeroSection>
        <HeroContent>
          <Logo3D>
            <img 
              src="/img/logoGlow.png" 
              alt="PETGAS Logo" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))'
              }} 
            />
          </Logo3D>
          
          <p style={{fontSize: '2rem', marginBottom: '15px', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>BIENVENIDO A PETGAS MÉXICO</p>
          <HeroTitle>ENERGETIZANDO EL FUTURO CON ACCIONES POSITIVAS PARA EL PLANETA</HeroTitle>
          <HeroSubtitle>La tecnología de Petgas transforma plásticos no reciclables en: Gasolina, Diesel, Parafina, Queroseno y Gas.</HeroSubtitle>
          
          
        </HeroContent>
      </HeroSection>

      {/* Sección de Estadísticas */}
      <StatisticsSection />

      {/* Secciones de la página */}
      <ServicesSection />
      <PlasticTypesSection />
      <ProcessSection />
      
      {/* Llamado a la acción */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #0a4b2a 0%, #1a7a4a 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <Container>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            fontWeight: '700'
          }}>
            ¿Listo para ser parte del cambio?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            maxWidth: '700px',
            margin: '0 auto 30px',
            lineHeight: '1.8'
          }}>
            Únete a nuestra misión de transformar residuos plásticos en energía limpia y sostenible para un futuro mejor.
          </p>
          <Button 
            variant="light" 
            size="lg" 
            style={{
              background: 'white',
              color: '#0a4b2a',
              border: 'none',
              padding: '12px 35px',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
            }}
          >
            Contáctanos
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
