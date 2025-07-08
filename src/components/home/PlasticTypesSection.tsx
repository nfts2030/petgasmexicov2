import React from 'react';
import styled from 'styled-components';
import PlasticCard from '../PlasticCard';
import { useLanguage } from '../../contexts/LanguageContext';

const SectionContainer = styled.section`
  padding: 80px 20px;
  background-color: #f9f9f9;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #11914b;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 800;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #11914b, #a4d5b2);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #555;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.6;
  padding: 0 20px;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1400px) {
    & > *:nth-last-child(2) {
      grid-column: 1 / -1;
      justify-self: center;
      max-width: 300px;
    }
  }

  @media (max-width: 1000px) {
    & > *:nth-last-child(-n+2) {
      grid-column: 1 / -1;
      justify-self: center;
      max-width: 300px;
    }
  }
`;


const PlasticTypesSection: React.FC = () => {
  const { t } = useLanguage();
  // Efecto de montaje/desmontaje
  React.useEffect(() => {
    // Lógica de inicialización aquí si es necesario
    return () => {
      // Lógica de limpieza aquí si es necesario
    };
  }, []);

  const plasticTypes = [
  {
    id: 1,
    name: t('plastics.pet_name'),
    type: 'PET',
    description: t('plastics.pet_description'),
    image: '/img/plasticos/pet.png',
    symbol: '/img/pet_symbol.png',
    number: '1'
  },
  {
    id: 2,
    name: t('plastics.hdpe_name'),
    type: 'HDPE',
    description: t('plastics.hdpe_description'),
    image: '/img/plasticos/hdpe.png',
    symbol: '/img/hdpe_symbol.png',
    number: '2'
  },
  {
    id: 4,
    name: t('plastics.ldpe_name'),
    type: 'LDPE',
    description: t('plastics.ldpe_description'),
    image: '/img/plasticos/ldpe.png',
    symbol: '/img/ldpe_symbol.png',
    number: '4'
  },
  {
    id: 5,
    name: t('plastics.pp_name'),
    type: 'PP',
    description: t('plastics.pp_description'),
    image: '/img/Polipropileno.png',
    symbol: '/img/pp_symbol.png',
    number: '5'
  },
  {
    id: 6,
    name: t('plastics.ps_name'),
    type: 'PS',
    description: t('plastics.ps_description'),
    image: '/img/plasticos/ps.png',
    symbol: '/img/ps_symbol.png',
    number: '6'
  },
  {
    id: 7,
    name: t('plastics.other_name'),
    type: 'OTROS',
    description: t('plastics.other_description'),
    image: '/img/plasticos/otros.png',
    symbol: '/img/otros_symbol.png',
    number: '7+'
  }
];

  // Datos de los plásticos a renderizar

  return (
    <SectionContainer>
      <Title>{t('plastics.title')}</Title>
      <Subtitle>{t('plastics.subtitle')}</Subtitle>
      <CardsContainer>
        {plasticTypes.map((plastic) => (
          <PlasticCard
            key={plastic.id}
            imageUrl={plastic.image}
            symbolUrl={plastic.symbol}
            name={plastic.name}
            description={plastic.description}
            number={plastic.number}
          />
        ))}
      </CardsContainer>
    </SectionContainer>
  );
};

export default PlasticTypesSection;
