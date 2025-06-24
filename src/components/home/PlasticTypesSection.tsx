import React from 'react';
import styled from 'styled-components';
import PlasticCard from '../PlasticCard';

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
  // Agregar efecto para depuración
  React.useEffect(() => {
    console.log('PlasticTypesSection montado');
    return () => console.log('PlasticTypesSection desmontado');
  }, []);

  const plasticTypes = [
  {
    id: 1,
    name: 'Tereftalato de Polietileno',
    type: 'PET',
    description: 'Botellas de agua, refrescos, envases de alimentos, bandejas, alfombras, ropa, fibra textil, muebles, envases de productos de limpieza, envases de cosméticos.',
    image: '/img/plasticos/pet.png',
    symbol: '/img/pet_symbol.png',
    number: '1'
  },
  {
    id: 2,
    name: 'Polietileno de Alta Densidad',
    type: 'HDPE',
    description: 'Botes de Gel, Botellas de lácteos, botellas de shampoo, baldes, botellas de detergente, juguetes, envases de comida, decoración, envases de jugos, tuberías para agua.',
    image: '/img/plasticos/hdpe.png',
    symbol: '/img/hdpe_symbol.png',
    number: '2'
  },
  {
    id: 4,
    name: 'Polietileno de Baja Densidad',
    type: 'LDPE',
    description: 'Bolsas de plástico, envolturas, botellas exprimibles, tapas flexibles.',
    image: '/img/plasticos/ldpe.png',
    symbol: '/img/ldpe_symbol.png',
    number: '4'
  },
  {
    id: 5,
    name: 'Polipropileno',
    type: 'PP',
    description: 'Envases de yogur, tapas de botellas, pajitas, envases de medicamentos, envases de ketchup, envases de mantequilla, envases de helado, envases de salsas, envases de aderezos, envases de mermelada.',
    image: '/img/plasticos/pp.png',
    symbol: '/img/pp_symbol.png',
    number: '5'
  },
  {
    id: 6,
    name: 'Poliestireno',
    type: 'PS',
    description: 'Vasos desechables, bandejas de carne, envases de comida rápida, cajas de CD, envases de huevos, envases de postres, envases de lácteos, envases de helado, envases de mantequilla, envases de queso crema.',
    image: '/img/plasticos/ps.png',
    symbol: '/img/ps_symbol.png',
    number: '6'
  },
  {
    id: 7,
    name: 'Otros Plásticos',
    type: 'OTROS',
    description: 'Incluye policarbonatos, nailon, fibra de vidrio, acrílicos y otros plásticos mixtos.',
    image: '/img/plasticos/otros.png',
    symbol: '/img/otros_symbol.png',
    number: '7+'
  }
];

  // Verificar datos antes de renderizar
  console.log('Renderizando PlasticTypesSection con plásticos:', plasticTypes);

  return (
    <SectionContainer>
      <Title>Tipos de plásticos Pirolizables</Title>
      <Subtitle>Conoce los diferentes tipos de plástico que transformamos en energía</Subtitle>
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
