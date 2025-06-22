import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

// Animation for subtle hover effects
const subtlePulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Componentes estilizados
const SlideTrack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  touch-action: pan-y;
`;
const StatisticSlide = styled.div<{ isActive: boolean }>`
  min-width: 100%;
  height: 100%;
  position: relative;
  flex-shrink: 0;
  opacity: ${props => props.isActive ? 1 : 0};
  transform: ${props => props.isActive ? 'scale(1)' : 'scale(0.98)'};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
`;

const StatisticContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
  animation: ${fadeIn} 0.6s ease-out forwards;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  margin: 0 0 15px 0;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
  max-width: 800px;
  line-height: 1.3;
  font-weight: bold;
  padding: 0 10px;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
  transform-origin: center;
`;

const Description = styled.p`
  font-size: clamp(0.9rem, 3vw, 1.2rem);
  max-width: 800px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
  margin: 10px 0 0 0;
  line-height: 1.4;
  padding: 0 15px;
  animation: ${fadeIn} 1s ease-out 0.4s both;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  outline: none;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-50%) scale(1.1);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const PrevButton = styled(NavButton)`
  left: 15px;
`;

const NextButton = styled(NavButton)`
  right: 15px;
`;

const Pagination = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 3;
  padding: 8px 15px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
`;

const Dot = styled.button<{ isActive: boolean }>`
  width: ${props => props.isActive ? '24px' : '10px'};
  height: 10px;
  border-radius: 5px;
  border: none;
  background: ${props => props.isActive ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  padding: 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  
  &:hover {
    background: ${props => props.isActive ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  }
`;

const Counter = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background-color: rgba(0,0,0,0.6);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  animation: ${scaleIn} 0.5s ease-out 0.6s both;
  
  span:first-child {
    font-weight: bold;
    margin-right: 2px;
  }
  
  span:last-child {
    margin-left: 2px;
  }
`;

const SlideCounter = styled.span`
  font-weight: bold;
  margin: 0 4px;
`;

// Definición de tipos
interface Statistic {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Importar imágenes manualmente desde la carpeta pública
const fdobotellasslider = '/img/11/fdobotellasslider.jpg';
const tortugaplastico = '/img/03/tortugaplastico1.jpg';
const fdoplastijuguetes = '/img/04/fdoplastijuguetes.jpg';
const microplastics = '/img/03/microplastics1.jpg';

const statisticsData: Statistic[] = [
  {
    id: 1,
    title: "MENOS DEL 10% DEL PLÁSTICO",
    description: "SE RECICLA A NIVEL GLOBAL SEGÚN LA OCDE",
    image: fdobotellasslider
  },
  {
    id: 2,
    title: "MÁS DE 11 MILLONES DE TONELADAS",
    description: "DE PLÁSTICO TERMINAN EN LOS OCÉANOS CADA AÑO",
    image: tortugaplastico
  },
  {
    id: 3,
    title: "MÁS DE 400 AÑOS",
    description: "PUEDE TARDAR UNA BOTELLA DE PLÁSTICO EN DEGRADARSE",
    image: fdoplastijuguetes
  },
  {
    id: 4,
    title: "MÁS DE 1 MILLÓN DE AVES MARINAS",
    description: "MUEREN CADA AÑO POR INGESTA DE PLÁSTICOS",
    image: microplastics
  }
];

// Main slider container with animation styles
const SliderContainer = styled.div`
  width: 100%;
  height: 60vh;
  min-height: 300px;
  max-height: 500px;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  margin: 40px 0;
  touch-action: pan-y;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease;
  will-change: transform, opacity;
  
  &.animate-slide-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3);
    animation: ${subtlePulse} 3s ease-in-out infinite;
  }
`;

const StatisticsSection: React.FC = () => {
  console.log('StatisticsSection se está renderizando');
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderInterval = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Función para ir a la siguiente diapositiva
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % statisticsData.length);
  }, []);
  
  // Función para ir a una diapositiva específica
  const goToSlide = useCallback((index: number) => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
    setCurrentSlide(index);
    // Reiniciar el autoplay después de cambiar manualmente
    sliderInterval.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
  }, [nextSlide]);
  
  // Configurar el autoplay
  useEffect(() => {
    sliderInterval.current = window.setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 5000);
    
    // Limpiar el intervalo al desmontar el componente
    return () => {
      if (sliderInterval.current) {
        clearInterval(sliderInterval.current);
      }
    };
  }, [nextSlide, isHovered]);
  
  // Efecto para la animación de entrada
  useEffect(() => {
    if (sliderRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-slide-in');
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(sliderRef.current);
      
      return () => observer.disconnect();
    }
  }, []);
  
  // Manejar el hover para pausar el autoplay
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    sliderInterval.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
  }, [nextSlide]);
  
  // Detener autoplay al tocar el slider en móviles
  const handleTouchStart = useCallback(() => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
  }, []);
  
  // Reanudar autoplay al soltar el toque
  const handleTouchEnd = useCallback(() => {
    sliderInterval.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
  }, [nextSlide]);
  
  // Efecto para el sonido de cambio de diapositiva (opcional)
  const playSlideSound = useCallback(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio('/sounds/slide-change.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  }, []);
  
  // Reproducir sonido al cambiar de diapositiva
  useEffect(() => {
    playSlideSound();
  }, [currentSlide, playSlideSound]);
  
  return (
    <SliderContainer 
      ref={sliderRef}
      className="slider-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Contenedor del slider */}
      <SlideTrack 
        style={{
          transform: `translateX(-${currentSlide * 100}%)`
        }}
      >
        {statisticsData.map((stat, index) => (
          <StatisticSlide 
            key={stat.id}
            isActive={index === currentSlide}
          >
            <StatisticContent
              style={{
                backgroundImage: `url(${stat.image})`,
              }}
            >
              <Overlay>
                <Title>{stat.title}</Title>
                <Description>{stat.description}</Description>
              </Overlay>
            </StatisticContent>
          </StatisticSlide>
        ))}
      </SlideTrack>
      
      {/* Controles de navegación */}
      <PrevButton 
        onClick={() => goToSlide((currentSlide - 1 + statisticsData.length) % statisticsData.length)}
        onTouchStart={(e) => e.stopPropagation()}
        aria-label="Diapositiva anterior"
      >
        ❮
      </PrevButton>
      
      <NextButton 
        onClick={() => goToSlide((currentSlide + 1) % statisticsData.length)}
        onTouchStart={(e) => e.stopPropagation()}
        aria-label="Siguiente diapositiva"
      >
        ❯
      </NextButton>
      
      {/* Indicadores de paginación */}
      <Pagination>
        {statisticsData.map((_, index) => (
          <Dot
            key={index}
            isActive={index === currentSlide}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            onTouchStart={(e) => e.stopPropagation()}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </Pagination>
      
      {/* Contador de diapositivas */}
      <Counter>
        <SlideCounter>{currentSlide + 1}</SlideCounter>
        <span>/</span>
        <SlideCounter>{statisticsData.length}</SlideCounter>
      </Counter>
    </SliderContainer>
  );
};

export default StatisticsSection;
