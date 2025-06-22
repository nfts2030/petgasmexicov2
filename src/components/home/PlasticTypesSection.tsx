import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  padding: 80px 20px;
  background-color: #f9f9f9;
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
`;

const PlasticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  padding: 0 20px;
`;

const PlasticCard = styled(motion.div)`
  background: #fff;
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
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    
    img {
      transform: scale(1.05);
    }
    
    .card-hover-bg {
      opacity: 1;
    }
  }
`;

const ImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(17, 145, 75, 0.1);
    z-index: 1;
  }
`;

const PlasticImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s ease;
`;

const CardContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  
  .card-hover-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(17, 145, 75, 0.1) 0%, rgba(17, 145, 75, 0.05) 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
`;

const PlasticName = styled.h3`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.7);
  color: white;
  margin: 0;
  padding: 15px;
  font-size: 1.2rem;
  z-index: 2;
  line-height: 1.3;
`;

const PlasticType = styled.div`
  background: #f0f9f0;
  padding: 8px 15px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  margin-top: 10px;
  
  .number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: #11914b;
    color: white;
    border-radius: 50%;
    font-weight: bold;
    font-size: 0.8rem;
  }
  
  .name {
    font-size: 0.9rem;
    color: #11914b;
    font-weight: 500;
  }
`;

const PlasticDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0 0 15px 0;
  flex-grow: 1;
  font-size: 0.95rem;
`;

const PlasticTypesSection: React.FC = () => {
  const plasticTypes = [
    {
      id: 1,
      name: 'PET',
      type: 'Tereftalato de Polietileno',
      description: 'Botellas de refrescos, empaques de medicamentos, textiles, cosméticos, envases de productos químicos, envases de alimentos.',
      image: '/plasticos/pet.png',
      number: '1'
    },
    {
      id: 2,
      name: 'HDPE',
      type: 'Polietileno de Alta Densidad',
      description: 'Botes de Gel, Botellas de lácteos, botellas de shampoo, baldes, botellas de detergente, juguetes, envases de comida, decoración, envases de jugos, tuberías para agua.',
      image: '/plasticos/hdpe.png',
      number: '2'
    },
    {
      id: 3,
      name: 'PVC',
      type: 'Policloruro de Vinilo',
      description: 'Tuberías, mangueras, juguetes, cortinas de baño, tarjetas de crédito, marcos de ventanas, pisos, cables eléctricos, envases de productos de limpieza.',
      image: '/plasticos/pvc.png',
      number: '3'
    },
    {
      id: 4,
      name: 'LDPE',
      type: 'Polietileno de Baja Densidad',
      description: 'Bolsas del supermercado, botellas y envases de bebidas y alimentos, partes de computadora, equipos de laboratorio, juguetes, platos, cubiertos.',
      image: '/plasticos/ldpe.png',
      number: '4'
    },
    {
      id: 5,
      name: 'PP',
      type: 'Polipropileno',
      description: 'Cubrebocas, Vajilla reusable para microondas, elementos de cocina, contenedores para yogurt, mamilas, tapas en general, vasos no desechables y hieleras.',
      image: '/plasticos/pp.png',
      number: '5'
    },
    {
      id: 6,
      name: 'PS',
      type: 'Poliestireno',
      description: 'Vasos desechables, bandejas de carne, envases de comida rápida, cajas de CD, juguetes, electrodomésticos, aislamiento térmico, envases de huevos, platos y cubiertos desechables.',
      image: '/plasticos/ps.png',
      number: '6'
    },
    {
      id: 7,
      name: 'OTROS',
      type: 'Otros Plásticos',
      description: 'Incluye policarbonatos, nailon, acrílico, fibra de vidrio, plásticos biodegradables, resinas epoxi, plásticos de ingeniería, materiales compuestos, envases de alimentos resistentes al horno, materiales de empaque especializados.',
      image: '/plasticos/otros.png',
      number: '7'
    }
  ];

  return (
    <SectionContainer>
      <PlasticsGrid>
        {plasticTypes.map((plastic) => (
          <PlasticCard
            key={plastic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: plastic.id * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <ImageContainer>
              <PlasticImage 
                src={plastic.image} 
                alt={plastic.type}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-plastic.png';
                }}
              />
              <PlasticName>{plastic.type}</PlasticName>
            </ImageContainer>
            <CardContent>
              <div className="card-hover-bg" />
              <PlasticDescription>{plastic.description}</PlasticDescription>
              <PlasticType>
                <span className="number">{plastic.number}</span>
                <span className="name">{plastic.name}</span>
              </PlasticType>
            </CardContent>
          </PlasticCard>
        ))}
      </PlasticsGrid>
    </SectionContainer>
  );
};

export default PlasticTypesSection;
