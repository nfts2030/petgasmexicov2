import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px) scale(1.05); }
  50% { transform: translateY(-10px) scale(1.1); }
  100% { transform: translateY(0px) scale(1.05); }
`;

const ServicesContainer = styled.section`
  padding: 6rem 2rem;
  background-color: #f9f9f9;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  color: #0a4b2a;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
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
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #333;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem 4rem;
  max-width: 900px;
  width: 90%;
  margin: 0 auto 3rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  animation: ${fadeIn} 0.8s ease-out;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 1rem 2rem;
  }
`;

const AnimatedGradientText = styled.span`
  background: linear-gradient(135deg, #0a4b2a, #1a7a4a, #11914b, #1a7a4a, #0a4b2a);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  animation: ${gradientMove} 8s ease infinite;
  display: inline-block;
  font-weight: 700;
  line-height: 1.2;
`;

const ServiceTitle = styled.h3`
  font-size: 2.2rem;
  margin: 1.5rem 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ServiceDescription = styled.p`
  color: #555;
  line-height: 1.8;
  margin: 1rem 0 0;
  font-size: 1.2rem;
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ServiceImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  animation: ${float} 4s ease-in-out infinite;
  margin: 0 auto 30px;
  display: block;
  
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
`;

const ServicesSectionNew: React.FC = () => {
  return (
    <ServicesContainer>
      <SectionTitle>Nuestros Servicios</SectionTitle>
      <Subtitle>Soluciones integrales para la gestión y transformación de residuos plásticos</Subtitle>
      
      <ServiceCard>
        <ServiceImage 
          src="/img/bote_gasolina.png" 
          alt="Transformación de Plásticos" 
        />
        <ServiceTitle>
          <AnimatedGradientText>Pirolisis No Catalitica</AnimatedGradientText>
        </ServiceTitle>
        <ServiceDescription>
          Aprovechamos las cadenas de carbono que contiene el plástico para gasificarlas y condensarlas en combustibles limpios.
        </ServiceDescription>
      </ServiceCard>
    </ServicesContainer>
  );
};

export default ServicesSectionNew;
