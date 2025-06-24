import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface PlasticCardProps {
  imageUrl: string;
  symbolUrl: string;
  name: string;
  description: string;
  number: string;
}

// Animación de resplandor mejorada con múltiples colores
const glow = keyframes`
  0% { 
    filter: 
      drop-shadow(0 0 5px rgba(17, 230, 100, 0.8))
      drop-shadow(0 0 10px rgba(17, 230, 100, 0.6))
      drop-shadow(0 0 15px rgba(17, 150, 200, 0.4))
      brightness(1.1)
      contrast(1.1);
    transform: scale(1) rotate(0deg);
  }
  25% {
    filter: 
      drop-shadow(0 0 8px rgba(17, 230, 100, 0.9))
      drop-shadow(0 0 20px rgba(100, 200, 255, 0.7))
      drop-shadow(0 0 30px rgba(100, 100, 255, 0.5))
      brightness(1.2)
      contrast(1.2);
    transform: scale(1.02) rotate(1deg);
  }
  50% { 
    filter: 
      drop-shadow(0 0 10px rgba(100, 200, 255, 0.9))
      drop-shadow(0 0 25px rgba(100, 100, 255, 0.7))
      drop-shadow(0 0 40px rgba(200, 100, 255, 0.5))
      brightness(1.3)
      contrast(1.1);
    transform: scale(1.05) rotate(-1deg);
  }
  75% {
    filter: 
      drop-shadow(0 0 8px rgba(100, 100, 255, 0.9))
      drop-shadow(0 0 20px rgba(200, 100, 255, 0.7))
      drop-shadow(0 0 30px rgba(255, 100, 200, 0.5))
      brightness(1.2)
      contrast(1.2);
    transform: scale(1.02) rotate(1deg);
  }
  100% { 
    filter: 
      drop-shadow(0 0 5px rgba(17, 230, 100, 0.8))
      drop-shadow(0 0 10px rgba(17, 230, 100, 0.6))
      drop-shadow(0 0 15px rgba(17, 150, 200, 0.4))
      brightness(1.1)
      contrast(1.1);
    transform: scale(1) rotate(0deg);
  }
`;

const CardContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    
    .symbol-overlay {
      animation: ${glow} 2s ease-in-out infinite;
    }
  }
`;

const ImageContainer = styled.div`
  height: 220px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  border-radius: 12px 12px 0 0;
`;

const PlasticImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  transition: all 0.3s ease;
  border-radius: 12px 12px 0 0;
  
  .plastic-card:hover & {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const PlaceholderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
  border-radius: 12px 12px 0 0;
`;

const SymbolImg = styled.img<{ $loaded: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  max-height: 80%;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9)) brightness(1.2) contrast(1.2);
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

const ErrorOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 0, 0, 0.2);
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 4;
  text-align: center;
`;

const Content = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
  z-index: 2;
`;

const Name = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 10px 0;
  text-align: center;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #11914b;
    border-radius: 2px;
  }
`;

const Description = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: center;
`;

const NumberBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #11914b;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  z-index: 4;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(0,0,0,0.3);
  }
`;

const PlasticCard: React.FC<PlasticCardProps> = ({
  imageUrl,
  symbolUrl,
  name,
  description,
  number
}) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [symbolLoaded, setSymbolLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [symbolError, setSymbolError] = useState(false);

  // Verificar si las imágenes existen
  useEffect(() => {
    console.log(`[PlasticCard] Montando componente con número: ${number}`);
    console.log(`[PlasticCard] URL de imagen: ${imageUrl}`);
    console.log(`[PlasticCard] URL de símbolo: ${symbolUrl}`);
    
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      console.log(`[PlasticCard] Imagen cargada correctamente: ${imageUrl}`);
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error(`[PlasticCard] Error al cargar la imagen: ${imageUrl}`);
      setImageError(true);
    };
    
    const symbol = new Image();
    symbol.src = symbolUrl;
    symbol.onload = () => {
      console.log(`[PlasticCard] Símbolo cargado correctamente: ${symbolUrl}`);
      setSymbolLoaded(true);
    };
    symbol.onerror = () => {
      console.error(`[PlasticCard] Error al cargar el símbolo: ${symbolUrl}`);
      setSymbolError(true);
    };
    
    return () => {
      console.log(`[PlasticCard] Desmontando componente con número: ${number}`);
      img.onload = null;
      img.onerror = null;
      symbol.onload = null;
      symbol.onerror = null;
    };
  }, [imageUrl, symbolUrl]);

  console.log(`Renderizando ${name}:`, {
    imageUrl,
    symbolUrl,
    imageLoaded,
    symbolLoaded,
    imageError,
    symbolError
  });

  const handleCardClick = () => {
    navigate(`/plasticos/${number}`);
  };

  return (
    <CardContainer 
      data-card={name}
      onClick={handleCardClick}
      className="plastic-card"
    >
      <ImageContainer>
        {imageError ? (
          <PlaceholderImage>Imagen no disponible</PlaceholderImage>
        ) : (
          <PlasticImage 
            src={imageUrl} 
            alt={name}
            onError={() => setImageError(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        )}
        
        {!symbolError ? (
          <SymbolImg 
            src={symbolUrl} 
            alt={`Símbolo ${name}`} 
            onLoad={() => setSymbolLoaded(true)}
            onError={() => setSymbolError(true)}
            $loaded={symbolLoaded}
          />
        ) : (
          <ErrorOverlay>⚠️ Error al cargar el símbolo</ErrorOverlay>
        )}
        
        <NumberBadge>{number}</NumberBadge>
      </ImageContainer>
      
      <Content>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </Content>
    </CardContainer>
  );
};

export default PlasticCard;
