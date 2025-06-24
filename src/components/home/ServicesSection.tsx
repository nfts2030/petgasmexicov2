import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServicesContainer = styled.section`
  padding: 6rem 2rem;
  background-color: #f9f9f9;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #0a4b2a;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #11914b;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: #666;
  max-width: 700px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ServicesGrid = styled(motion.div).attrs({
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  },
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true }
})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled(motion.div).attrs({
  variants: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  },
  whileHover: { y: -10 }
})`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  customIcon?: any; // Para manejar tanto string (URL) como componente React
  image: string;
}

interface ServiceImageProps {
  $image?: string;
}

interface ServiceIconProps {
  $hasCustomIcon?: boolean;
}

const ServiceIcon = styled.div<ServiceIconProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: transparent;
  border: none;
  box-shadow: none;
  overflow: visible;
  pointer-events: none;
  
  & > * {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    object-position: center;
  }
  
  i {
    font-size: 3rem;
    color: #11914b;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(17, 145, 75, 0.2);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; }
  }
`;

const ServiceImage = styled.div.attrs<ServiceImageProps>(({ $image }) => ({
  style: {
    backgroundImage: $image ? `url(${$image})` : 'none'
  }
}))`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(17, 145, 75, 0.85) 0%, rgba(10, 75, 42, 0.9) 100%);
    transition: all 0.4s ease;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 1;
    transition: transform 0.5s ease;
    display: ${props => props.$image ? 'block' : 'none'};
  }
  
  .service-title {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    z-index: 2;
    padding: 0 1rem;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.4s ease;
  }
  
  &:hover {
    .service-title {
      transform: translateY(0);
      opacity: 1;
    }
    
    ${ServiceIcon} {
      transform: translate(-50%, -100%) scale(0.8);
      
      i {
        transform: scale(1.1);
      }
    }
    
    img {
      transform: scale(1.1);
    }
  }
`;

const ServiceContent = styled.div`
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  h3 {
    font-size: 1.5rem;
    color: #0a4b2a;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.75rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background-color: #11914b;
    }
  }
  
  p {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.6;
    flex-grow: 1;
  }
`;

const ServiceLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #11914b;
  font-weight: 600;
  text-decoration: none;
  margin-top: auto;
  transition: all 0.3s ease;
  
  i {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #0a4b2a;
    
    i {
      transform: translateX(5px);
    }
  }
`;

import GasBottleIcon from '../ui/GasBottleIcon';

const services: Service[] = [
  {
    id: 1,
    title: 'Transformación de Plásticos',
    description: 'Aprovechamos las cadenas de carbono que contiene el plástico para gasificarlas y condensarlas en combustibles limpios.',
    icon: '',
    customIcon: GasBottleIcon,
    image: '/services/transformacion.jpg'
  }
];

const ServicesSection: React.FC = () => {
  return (
    <ServicesContainer id="servicios">
      <SectionTitle>Nuestros Servicios</SectionTitle>
      <SectionSubtitle>
        Soluciones integrales para la gestión y transformación de residuos plásticos
      </SectionSubtitle>
      
      <ServicesGrid>
        {services.map((service) => (
          <ServiceCard key={service.id}>
            <ServiceImage $image={service.image} key={service.id}>
              {service.image && (
                <img 
                  src={service.image} 
                  alt={service.title} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const container = target.parentElement;
                    if (container) {
                      container.style.backgroundImage = 'none';
                      container.style.backgroundColor = '#e0f0e6';
                    }
                  }}
                />
              )}
              <ServiceIcon $hasCustomIcon={!!service.customIcon}>
                {service.icon ? (
                  <i className={service.icon} />
                ) : service.customIcon ? (
                  typeof service.customIcon === 'string' ? (
                    <img src={service.customIcon} alt={service.title} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <service.customIcon />
                  </div>
                  )
                ) : null}
              </ServiceIcon>
              <div className="service-title">
                {service.title}
              </div>
            </ServiceImage>
            <ServiceContent>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ServiceLink href="/contacto" as={Link} to="/contacto">
                Saber más <i className="fas fa-arrow-right"></i>
              </ServiceLink>
            </ServiceContent>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};

export default ServicesSection;
