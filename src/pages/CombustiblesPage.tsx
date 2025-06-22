import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTrashAlt, FaRecycle, FaOilCan, FaTint, FaCheckDouble, FaCheck } from 'react-icons/fa';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/img/combustibles.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  padding: 140px 20px 100px;
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
  max-width: 1000px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin: 0 0 1.5rem 0;
  font-weight: 800;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(90deg, #fff, #7CDA24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0.9;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #0a4b2a;
  font-size: 2.2rem;
  margin: 0 0 3rem 0;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #11914B, #7CDA24);
    border-radius: 2px;
  }
`;

const ProcessSection = styled.section`
  padding: 5rem 0;
  background: #f8f9fa;
`;

// Container styles are now handled by react-bootstrap Container component

const ProcessCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ProcessCard = styled.div<{ $isVisible: boolean; $delay: number }>`
  background: white;
  border-radius: 15px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(0,0,0,0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  animation: ${({ $isVisible, $delay }) => 
    $isVisible ? css`${fadeIn} 0.6s ease-out ${$delay}s forwards` : 'none'
  };
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    
    .card-icon {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 15px 30px rgba(17, 145, 75, 0.4) !important;
    }
  }
  
  .card-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(45deg, #11914B, #7CDA24);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    color: white;
    font-size: 2rem;
    box-shadow: 0 8px 20px rgba(17, 145, 75, 0.25);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  h3 {
    color: #0a4b2a;
    font-size: 1.4rem;
    margin: 0 0 1rem 0;
  }
  
  p {
    color: #4a6b57;
    line-height: 1.7;
    margin: 0;
  }
`;

const FuelsSection = styled.section`
  padding: 5rem 0;
  background: white;
`;

// Container styles are now handled by react-bootstrap Container component

const FuelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FuelCard = styled.div<{ $isVisible: boolean; $delay: number }>`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid #e0f0e6;
  opacity: 0;
  animation: ${({ $isVisible, $delay }) => 
    $isVisible ? css`${fadeIn} 0.6s ease-out ${$delay}s forwards` : 'none'
  };
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  }
`;

// Process card icon styles moved to inline styles

const FuelImage = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(10, 75, 42, 0.1) 0%, rgba(10, 75, 42, 0.4) 100%);
    transition: opacity 0.4s ease;
  }
  
  ${FuelCard}:hover &::after {
    opacity: 0.8;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
    
    ${FuelCard}:hover & {
      transform: scale(1.05);
    }
  }
`;

// Fuel content styles moved to inline components

const CombustiblesPage: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const processSectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Trigger animation when component mounts
    setIsVisible(true);
    
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Initialize chart when component mounts
    if (chartRef.current) {
      initChart();
    }

    // Clean up chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [location]);

  const initChart = () => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Gasolina', 'Diesel', 'Aceites', 'Gases'],
        datasets: [{
          label: 'Rendimiento (%)',
          data: [45, 35, 15, 5],
          backgroundColor: [
            'rgba(124, 218, 36, 0.8)',
            'rgba(17, 145, 75, 0.8)',
            'rgba(10, 75, 42, 0.8)',
            'rgba(0, 0, 0, 0.8)'
          ],
          borderColor: [
            'rgba(124, 218, 36, 1)',
            'rgba(17, 145, 75, 1)',
            'rgba(10, 75, 42, 1)',
            'rgba(0, 0, 0, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Distribución de Productos',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 50,
            title: {
              display: true,
              text: 'Porcentaje (%)'
            }
          }
        }
      }
    });
  };

  // Process steps data
  const processSteps = [
    {
      id: 1,
      icon: <FaTrashAlt />,
      title: 'Recolección y Clasificación',
      description: 'Recolección de residuos plásticos post-consumo y su clasificación por tipo de polímero.'
    },
    {
      id: 2,
      icon: <FaRecycle />,
      title: 'Limpieza y Acondicionamiento',
      description: 'Lavado y secado de los plásticos para eliminar impurezas y contaminantes.'
    },
    {
      id: 3,
      icon: <FaOilCan />,
      title: 'Pirólisis',
      description: 'Descomposición térmica en ausencia de oxígeno para convertir los plásticos en combustibles.'
    },
    {
      id: 4,
      icon: <FaTint />,
      title: 'Destilación Fraccionada',
      description: 'Separación de los diferentes componentes del crudo obtenido en la pirólisis.'
    },
    {
      id: 5,
      icon: <FaCheckDouble />,
      title: 'Control de Calidad',
      description: 'Análisis y pruebas para garantizar que los combustibles cumplan con los estándares de calidad.'
    }
  ];

  // Fuels data
  const fuels = [
    {
      id: 1,
      name: 'Diesel Sintético',
      image: '/combustibles/diesel.jpg',
      description: 'Combustible diésel de alto rendimiento con bajo contenido de azufre, ideal para motores diésel modernos.',
      properties: ['Bajo en azufre (<10ppm)', 'Alto índice de cetano (>51)', 'Bajas emisiones de partículas']
    },
    {
      id: 2,
      name: 'Gasolina Verde',
      image: '/combustibles/gasolina.jpg',
      description: 'Gasolina de alto octanaje con aditivos mejoradores que optimizan el rendimiento del motor.',
      properties: ['Octanaje 92-95', 'Bajo contenido de benceno', 'Mejor combustión']
    },
    {
      id: 3,
      name: 'Aceites Pesados',
      image: '/combustibles/aceite.jpg',
      description: 'Aceites combustibles para uso industrial con alto poder calorífico y bajas emisiones.',
      properties: ['Alto poder calorífico', 'Estable a altas temperaturas', 'Bajas emisiones de SOx']
    }
  ];

  const benefits = [
    {
      id: 1,
      title: 'Sostenibilidad',
      description: 'Reducción de residuos plásticos en vertederos y océanos.'
    },
    {
      id: 2,
      title: 'Eficiencia',
      description: 'Alto rendimiento energético en comparación con combustibles fósiles tradicionales.'
    },
    {
      id: 3,
      title: 'Calidad',
      description: 'Cumplimiento de estándares internacionales de calidad.'
    },
    {
      id: 4,
      title: 'Innovación',
      description: 'Tecnología de punta en el proceso de transformación.'
    }
  ];

  return (
    <div className="combustibles-page">
      <HeroSection>
        <HeroContent>
          <HeroTitle>COMBUSTIBLES SINTÉTICOS</HeroTitle>
          <HeroSubtitle>
            Transformamos residuos plásticos en combustibles de alto rendimiento a través de un proceso de pirólisis avanzada, 
            contribuyendo a la economía circular y reduciendo la huella de carbono.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ProcessSection ref={processSectionRef}>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={10} className="text-center">
              <SectionTitle>Nuestro Proceso de Conversión</SectionTitle>
              <p className="lead">
                Tecnología patentada que transforma residuos plásticos en combustibles de alta calidad a través de un proceso sostenible y eficiente.
              </p>
            </Col>
          </Row>
          
          <ProcessCards>
            {processSteps.map((step, index) => (
              <ProcessCard 
                key={step.id}
                $isVisible={isVisible}
                $delay={index * 0.15}
                className="process-card"
              >
                <div className="card-icon">
                  {step.icon}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </ProcessCard>
            ))}
          </ProcessCards>

          <Row className="mt-5 pt-5">
            <Col md={6} className="mb-4 mb-md-0">
              <h3 className="h4 mb-4">Distribución de Productos</h3>
              <div style={{ height: '300px' }}>
                <canvas ref={chartRef}></canvas>
              </div>
            </Col>
            <Col md={6}>
              <h3 className="h4 mb-4">Ventajas Competitivas</h3>
              <div className="benefits-grid">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="benefit-card">
                    <div className="benefit-icon">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="benefit-content">
                      <h4>{benefit.title}</h4>
                      <p>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </ProcessSection>

      <FuelsSection>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <SectionTitle>Nuestros Productos</SectionTitle>
              <p className="lead">
                Combustibles de alta calidad obtenidos a través de nuestro proceso de transformación de residuos plásticos.
              </p>
            </Col>
          </Row>
          
          <FuelsGrid>
            {fuels.map((fuel, index) => (
              <FuelCard 
                key={fuel.id}
                $isVisible={isVisible}
                $delay={index * 0.15}
                className="fuel-card"
              >
                <FuelImage>
                  <img 
                    src={fuel.image} 
                    alt={fuel.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-fuel.jpg';
                    }}
                  />
                </FuelImage>
                <div className="fuel-content">
                  <h3>{fuel.name}</h3>
                  <p>{fuel.description}</p>
                  <ul className="fuel-properties">
                    {fuel.properties.map((prop, i) => (
                      <li key={i}>
                        <FaCheck style={{color: '#11914B', marginRight: '8px'}} /> {prop}
                      </li>
                    ))}
                  </ul>
                </div>
              </FuelCard>
            ))}
          </FuelsGrid>
        </Container>
      </FuelsSection>
    </div>
  );
};

export default CombustiblesPage;
