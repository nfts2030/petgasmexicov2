import styled from 'styled-components';
import HeroSection from '../components/home/HeroSection';
import ProcessSection from '../components/home/ProcessSection';
import PlasticTypesSection from '../components/home/PlasticTypesSection';
import StatisticsSection from '../components/home/StatisticsSection';
import ServicesSectionNew from '../components/home/ServicesSectionNew';

// Contenedor para el HeroSection
const HeroContainer = styled.div`
  margin-top: 80px; /* Ajustado para el header fijo */
  
  @media (max-width: 992px) {
    margin-top: 60px;
  }
  
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

// Contenedor principal de la página
const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <HeroContainer>
        <HeroSection />
      </HeroContainer>
      <ServicesSectionNew />
      <StatisticsSection />
      <PlasticTypesSection />
      <ProcessSection />
    </PageContainer>
  );
};

export default HomePage;
