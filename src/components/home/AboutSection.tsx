import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff;
  
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

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const AboutImage = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(17, 145, 75, 0.1) 0%, rgba(10, 75, 42, 0.1) 100%);
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  @media (max-width: 992px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const AboutText = styled.div`
  h3 {
    font-size: 1.8rem;
    color: #0a4b2a;
    margin-bottom: 1.5rem;
    line-height: 1.3;
    
    span {
      color: #11914b;
    }
  }
  
  p {
    color: #555;
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-size: 1.05rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  .icon {
    background-color: #e8f5e9;
    color: #11914b;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    margin-right: 1rem;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }
  
  .content {
    h4 {
      font-size: 1.1rem;
      color: #0a4b2a;
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 0.95rem;
      color: #666;
      margin: 0;
      line-height: 1.5;
    }
  }
  
  &:hover .icon {
    background-color: #11914b;
    color: white;
    transform: translateY(-5px);
  }
`;

const AboutSection: React.FC = () => {
  // Animaciones
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AboutContainer>
      <SectionTitle>Acerca de Nosotros</SectionTitle>
      <SectionSubtitle>
        Líderes en la transformación de residuos plásticos en energía limpia y sostenible
      </SectionSubtitle>
      
      <AboutContent>
        <AboutImage
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/about-image.jpg" 
            alt="Proceso de transformación de plásticos" 
          />
        </AboutImage>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={item}>
            <h3>Soluciones <span>innovadoras</span> para un futuro más limpio</h3>
          </motion.div>
          
          <motion.div variants={item}>
            <p>
              En PETGAS nos dedicamos a desarrollar tecnologías avanzadas para el reciclaje químico de plásticos, 
              transformando residuos en combustibles limpios y otros productos de valor agregado.
            </p>
          </motion.div>
          
          <motion.div variants={item}>
            <p>
              Nuestro compromiso es con la sostenibilidad ambiental y la economía circular, 
              ofreciendo soluciones escalables que contribuyan a reducir la contaminación por plásticos.
            </p>
          </motion.div>
          
          <FeaturesGrid>
            <FeatureItem variants={item}>
              <div className="icon">
                <i className="fas fa-recycle"></i>
              </div>
              <div className="content">
                <h4>Tecnología Avanzada</h4>
                <p>Procesos eficientes de pirólisis catalítica.</p>
              </div>
            </FeatureItem>
            
            <FeatureItem variants={item}>
              <div className="icon">
                <i className="fas fa-leaf"></i>
              </div>
              <div className="content">
                <h4>Sostenibilidad</h4>
                <p>Reducción de huella de carbono.</p>
              </div>
            </FeatureItem>
            
            <FeatureItem variants={item}>
              <div className="icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="content">
                <h4>Eficiencia</h4>
                <p>Alta tasa de conversión de residuos.</p>
              </div>
            </FeatureItem>
            
            <FeatureItem variants={item}>
              <div className="icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="content">
                <h4>Compromiso Social</h4>
                <p>Generamos empleos verdes.</p>
              </div>
            </FeatureItem>
          </FeaturesGrid>
        </motion.div>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutSection;
