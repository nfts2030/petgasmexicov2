import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import { FaChevronRight, FaChevronLeft, FaArrowRight } from 'react-icons/fa';
import ServicesSection from '../components/home/ServicesSection';
import ProcessSection from '../components/home/ProcessSection';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Componentes reutilizables

// Estilos de la página de inicio
// Animación para el degradado del hero
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

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  margin: 0 0 25px 0;
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 800;
  letter-spacing: -0.5px;
  color: white;
  
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

const StyledTitle = styled.h2`
  font-size: 2.2rem;
  color: ${props => props.color || '#0a4b2a'};
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #7CDA24, #11914B);
    margin: 15px auto 0;
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const StyledSubtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 50px;
  color: ${props => props.color || '#4a6b57'};
  text-align: center;
`;

const PlasticCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 1;
  transform: translateY(0);
  border: 1px solid #e0f0e6;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  }
`;

const PlasticCardImage = styled.div<{ $bgImage: string }>`
  height: 220px;
  background: url(${props => props.$bgImage}) center/cover no-repeat;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(10, 75, 42, 0.1) 0%, rgba(10, 75, 42, 0.4) 100%);
  }
`;

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const statistics = [
    {
      id: 1,
      number: '8',
      suffix: 'millones',
      title: 'Toneladas de plástico',
      description: 'acaban en los océanos cada año, afectando gravemente a la vida marina.',
      image: '/img/03/tortugaplastico1.jpg'
    },
    {
      id: 2,
      number: '1',
      suffix: 'millón',
      title: 'Aves marinas mueren',
      description: 'anualmente por la ingesta de plástico en los océanos.',
      image: '/img/03/microplastics1.jpg'
    },
    {
      id: 3,
      number: '2050',
      title: 'Para el año 2050',
      description: 'habrá más plástico que peces en los océanos si no actuamos ahora.',
      // Using placeholder image since coral2.png doesn't exist
      image: '/img/placeholder-plastic.jpg'
    }
  ];

  const plasticTypes = [
    {
      id: 1,
      type: 'PET',
      name: 'Tereftalato de Polietileno',
      description: 'Botellas de agua y refrescos, envases de alimentos, fibras textiles.',
      image: '/img/plasticos/pet.png',
      recycling: 'Altamente reciclable, se convierte en nuevos envases, fibras para ropa, alfombras y más.'
    },
    {
      id: 2,
      type: 'HDPE',
      name: 'Polietileno de Alta Densidad',
      description: 'Envases de leche, detergentes, juguetes, bolsas de supermercado.',
      image: '/img/plasticos/hdpe.png',
      recycling: 'Fácil de reciclar, se usa para hacer contenedores, tuberías, madera plástica y más.'
    },
    {
      id: 3,
      type: 'LDPE',
      name: 'Polietileno de Baja Densidad',
      description: 'Bolsas de plástico, envolturas, botellas exprimibles, tapas flexibles.',
      image: '/img/plasticos/ldpe.png',
      recycling: 'Reciclable pero menos común, se usa para hacer bolsas de basura, paneles y baldosas.'
    },
    {
      id: 4,
      type: 'PP',
      name: 'Polipropileno',
      description: 'Tapas de botellas, envases para alimentos, pajitas, envases de yogurt.',
      image: '/img/plasticos/pp.png',
      recycling: 'Cada vez más reciclado, se usa para hacer cajas de baterías, escobas y bandejas.'
    },
    {
      id: 5,
      type: 'PS',
      name: 'Poliestireno',
      description: 'Vasos y envases desechables, empaques de espuma, aislantes.',
      image: '/img/plasticos/ps.png',
      recycling: 'Difícil de reciclar, pero se puede convertir en aislantes, macetas y reglas.'
    },
    {
      id: 6,
      type: 'OTROS',
      name: 'Otros Plásticos',
      description: 'Incluye policarbonatos, nailon, fibra de vidrio, acrílicos y otros plásticos mixtos.',
      image: '/img/plasticos/otros.png',
      recycling: 'Generalmente no se reciclan a través de programas estándar, requieren procesos especializados.'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === statistics.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? statistics.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
          
          <Button 
            variant="success" 
            size="lg" 
            style={{
              background: 'linear-gradient(135deg, #7CDA24, #11914B)',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(17, 145, 75, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            Conoce más <FaArrowRight className="ms-2" style={{ transition: 'transform 0.3s ease' }} />
          </Button>
        </HeroContent>
      </HeroSection>

      {/* Sección de Estadísticas */}
      <section style={{ padding: '80px 0', backgroundColor: '#f9f9f9' }}>
        <Container>
          <h2 className="text-center mb-5" style={{ color: '#0a4b2a', fontWeight: 'bold' }}>Impacto Ambiental</h2>
          
          <div style={{ position: 'relative', height: '400px', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <div style={{ 
              display: 'flex',
              width: `${statistics.length * 100}%`,
              height: '100%',
              transform: `translateX(-${currentSlide * (100 / statistics.length)}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}>
              {statistics.map((stat) => (
                <div key={stat.id} style={{
                  width: `${100 / statistics.length}%`,
                  height: '100%',
                  background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${stat.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  padding: '40px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '4rem', fontWeight: 'bold', margin: '0' }}>
                    {stat.number}
                    {stat.suffix && <span style={{ fontSize: '2rem' }}>{stat.suffix}</span>}
                  </h3>
                  <h4 style={{ fontSize: '1.8rem', margin: '20px 0' }}>{stat.title}</h4>
                  <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>{stat.description}</p>
                </div>
              ))}
            </div>
            
            <Button 
              variant="light" 
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <FaChevronLeft />
            </Button>
            
            <Button 
              variant="light" 
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <FaChevronRight />
            </Button>
          </div>
        </Container>
      </section>

      {/* Resto del contenido de la página */}
      <ServicesSection />
      <ProcessSection />
      
      {/* Sección de Tipos de Plástico */}
      <section style={{ padding: '80px 0', backgroundColor: '#f5f9f7' }}>
        <Container>
          <StyledTitle>Tipos de Plástico que Reciclamos</StyledTitle>
          <StyledSubtitle>Conoce los diferentes tipos de plástico que podemos transformar en energía limpia y renovable</StyledSubtitle>
          
          <Row className="g-4">
            {plasticTypes.map((plastic) => (
              <Col key={plastic.id} md={6} lg={4} className="mb-4">
                <PlasticCard>
                  <PlasticCardImage $bgImage={plastic.image} />
                  <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ 
                      backgroundColor: '#0a4b2a', 
                      color: 'white', 
                      display: 'inline-block',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      marginBottom: '15px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      alignSelf: 'flex-start'
                    }}>
                      {plastic.type}
                    </div>
                    <h3 style={{ 
                      fontSize: '1.5rem', 
                      marginBottom: '10px',
                      color: '#0a4b2a',
                      fontWeight: '600'
                    }}>
                      {plastic.name}
                    </h3>
                    <p style={{ 
                      color: '#4a6b57',
                      marginBottom: '15px',
                      flex: 1
                    }}>
                      {plastic.description}
                    </p>
                    <div style={{
                      backgroundColor: '#e8f5ee',
                      padding: '12px',
                      borderRadius: '8px',
                      marginTop: 'auto'
                    }}>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#0a4b2a',
                        margin: 0,
                        fontWeight: '500'
                      }}>
                        <strong>Reciclaje:</strong> {plastic.recycling}
                      </p>
                    </div>
                  </div>
                </PlasticCard>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
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
