import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProcessContainer = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  
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

const ProcessTimeline = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, #11914b, #0a4b2a);
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const ProcessItem = styled(motion.div)<{ isEven: boolean }>`
  position: relative;
  width: calc(50% - 40px);
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
  
  ${({ isEven }) => 
    isEven 
      ? `margin-left: auto;` 
      : `margin-right: auto;`
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 30px;
    width: 20px;
    height: 3px;
    background: #11914b;
    ${({ isEven }) => 
      isEven 
        ? 'left: -20px;' 
        : 'right: -20px;'
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 22px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #11914b;
    ${({ isEven }) => 
      isEven 
        ? 'left: -39px;' 
        : 'right: -39px;'
    }
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 80px);
    margin-left: 80px !important;
    
    &::before {
      left: -20px !important;
      right: auto;
    }
    
    &::after {
      left: -39px !important;
      right: auto;
    }
  }
`;

const ProcessIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #11914b, #0a4b2a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 5px 15px rgba(17, 145, 75, 0.3);
`;

const ProcessTitle = styled.h3`
  font-size: 1.4rem;
  color: #0a4b2a;
  margin-bottom: 0.75rem;
`;

const ProcessDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

const processSteps = [
  {
    id: 1,
    title: 'Recolección Selectiva',
    description: 'Recolectamos residuos plásticos de empresas, industrias y centros de acopio, asegurando una cadena de suministro sostenible.',
    icon: 'fas fa-truck',
    isEven: false
  },
  {
    id: 2,
    title: 'Clasificación y Preparación',
    description: 'Los plásticos se clasifican por tipo y se preparan para el proceso de transformación, eliminando impurezas y materiales no deseados.',
    icon: 'fas fa-tasks',
    isEven: true
  },
  {
    id: 3,
    title: 'Pirólisis Catalítica',
    description: 'Mediante un proceso térmico controlado en ausencia de oxígeno, los plásticos se descomponen en moléculas más pequeñas, generando gases que luego se condensan en combustibles líquidos.',
    icon: 'fas fa-fire',
    isEven: false
  },
  {
    id: 4,
    title: 'Refinación y Purificación',
    description: 'Los combustibles obtenidos se someten a procesos de refinación para cumplir con los estándares de calidad requeridos para su uso en motores y maquinaria.',
    icon: 'fas fa-filter',
    isEven: true
  },
  {
    id: 5,
    title: 'Distribución',
    description: 'Los combustibles limpios y sostenibles se distribuyen a nuestros clientes, cerrando así el ciclo de la economía circular.',
    icon: 'fas fa-truck-loading',
    isEven: false
  }
];

const ProcessSection: React.FC = () => {
  // Animaciones
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  } as const;

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      },
    },
  } as const;

  return (
    <ProcessContainer id="proceso">
      <SectionTitle>Nuestro Proceso</SectionTitle>
      <SectionSubtitle>
        Transformación innovadora de residuos plásticos en energía limpia y sostenible
      </SectionSubtitle>
      
      <ProcessTimeline>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {processSteps.map((step) => (
            <ProcessItem
              key={step.id}
              variants={item}
              isEven={step.isEven}
              whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
              initial="hidden"
              animate="show"
            >
              <ProcessIcon>
                <i className={step.icon}></i>
              </ProcessIcon>
              <ProcessTitle>{step.title}</ProcessTitle>
              <ProcessDescription>{step.description}</ProcessDescription>
            </ProcessItem>
          ))}
        </motion.div>
      </ProcessTimeline>
    </ProcessContainer>
  );
};

export default ProcessSection;
