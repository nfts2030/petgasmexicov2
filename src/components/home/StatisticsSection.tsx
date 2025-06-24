import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

// Animación de gradiente para el texto
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Types
interface Statistic {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Animations
const subtlePulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Styled components
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
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Asegurar que la imagen ocupe todo el espacio disponible */
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end; /* Alinea el contenido al final (abajo) */
    align-items: center;
    text-align: center;
    padding: 20px 20px 40px; /* Más espacio en la parte inferior */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }
  
  /* Fondo oscuro solo para el texto, posicionado más abajo */
  & > div::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      to top, 
      rgba(0, 0, 0, 0.9) 0%, 
      rgba(0, 0, 0, 0.7) 40%, 
      rgba(0, 0, 0, 0.4) 70%, 
      transparent 100%
    );
    z-index: 1;
  }
  
  h2, p {
    position: relative;
    z-index: 2;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.9);
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 0 15px;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
    line-height: 1.3;
    font-weight: 800;
    background: linear-gradient(90deg, #0a4b2a, #ffeb3b, #0a4b2a);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${gradientAnimation} 5s ease infinite;
    display: inline-block;
    padding: 0 10px 5px;
    text-shadow: none;
    margin-top: 20px; /* Espacio superior para separar del borde */
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 0.8rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.3rem;
      margin-bottom: 0.6rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    color: #f0f0f0;
    font-weight: 500;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
    padding: 0 10px 10px;
    
    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
      margin-bottom: 0.8rem;
    }
  }
`;



// Styled components
const SliderContainer = styled.div`
  width: 100%;
  height: 60vh;
  min-height: 400px; /* Aumentado para mejor visualización en móviles */
  max-height: 600px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  margin: 30px auto;
  touch-action: pan-y;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease;
  will-change: transform, opacity;
  max-width: 1200px; /* Añadido para limitar el ancho máximo */
  
  /* Estilos específicos para iPhone */
  @supports (-webkit-touch-callout: none) {
    height: 60vh;
    min-height: 420px;
    border-radius: 0;
    margin: 20px 0;
    box-shadow: none;
  }
  
  &.animate-slide-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
    animation: ${subtlePulse} 3s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    height: 55vh;
    min-height: 450px;
    margin: 20px 0;
    border-radius: 0;
    box-shadow: none;
  }
  
  @media (max-width: 480px) {
    height: 50vh;
    min-height: 400px;
  }
`;

const StatisticsSection: React.FC = () => {
  // Image paths - Usando las imágenes correctas sin repeticiones
  const sliderImages = [
    '/img/11/fdobotellasslider.jpg',
    '/img/03/tortugaplastico1.jpg',
    '/img/04/fdoplastijuguetes.jpg',
    '/img/03/microplastics1.jpg',
    '/img/04/fdoverdeiconos.jpg',
    '/img/Planta4k-2r.jpeg'
  ];

  const statisticsData: Statistic[] = useMemo(() => [
    {
      id: 1,
      title: "MENOS DEL 10% DEL PLÁSTICO",
      description: "SE RECICLA A NIVEL GLOBAL SEGÚN LA OCDE",
      image: sliderImages[0] // fdobotellasslider.jpg
    },
    {
      id: 2,
      title: "MÁS DE 11 MILLONES DE TONELADAS",
      description: "DE PLÁSTICO TERMINAN EN LOS OCÉANOS CADA AÑO",
      image: sliderImages[1] // tortugaplastico1.jpg
    },
    {
      id: 3,
      title: "MÁS DE 400 AÑOS",
      description: "PUEDE TARDAR UNA BOTELLA DE PLÁSTICO EN DEGRADARSE",
      image: sliderImages[2] // fdoplastijuguetes.jpg
    },
    {
      id: 4,
      title: "EL 80% DE LA BASURA MARINA",
      description: "PROVIENE DE FUENTES TERRESTRES, PRINCIPALMENTE PLÁSTICOS",
      image: sliderImages[3] // microplastics1.jpg
    },
    {
      id: 5,
      title: "PARA 2050 HABRÁ MÁS PLÁSTICO",
      description: "QUE PECES EN EL MAR (EN PESO) SEGÚN LA ONU",
      image: sliderImages[4] // fdoverdeiconos.jpg
    },
    {
      id: 6,
      title: "ENERGÍA LIMPIA DE RESIDUOS",
      description: "TRANSFORMAMOS PLÁSTICOS EN COMBUSTIBLES SOSTENIBLES",
      image: sliderImages[5] // Planta4k-2r.jpeg
    }
  ], [sliderImages]);
  
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const sliderInterval = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % statisticsData.length);
  }, [statisticsData.length]);
  
  // Function to go to a specific slide
  const goToSlide = useCallback((index: number) => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
    setCurrentSlide(index);
    // Restart autoplay after manual change
    sliderInterval.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
  }, [nextSlide]);
  
  // Setup autoplay
  useEffect(() => {
    sliderInterval.current = window.setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 5000);
    
    // Cleanup interval on unmount
    return () => {
      if (sliderInterval.current) {
        clearInterval(sliderInterval.current);
      }
    };
  }, [nextSlide, isHovered]);
  
  // Intersection Observer for entrance animation
  useEffect(() => {
    const currentRef = sliderRef.current;
    if (currentRef) {
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
      
      observer.observe(currentRef);
      
      return () => observer.disconnect();
    }
    return undefined;
  }, []);
  
  // Handle hover to pause autoplay
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
  
  // Handle touch events for mobile
  const handleTouchStart = useCallback(() => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
  }, []);
  
  // Resume autoplay on touch end
  const handleTouchEnd = useCallback(() => {
    sliderInterval.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
  }, [nextSlide]);
  
  // Play slide change sound effect (optional)
  const playSlideSound = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const audio = new Audio('/sounds/slide-change.mp3');
        audio.volume = 0.3;
        audio.play().catch((error) => {
          console.warn('Error playing slide sound:', error);
        });
      } catch (error) {
        console.warn('Error initializing audio:', error);
      }
    }
  }, []);
  
  // Play sound on slide change
  useEffect(() => {
    playSlideSound();
  }, [currentSlide, playSlideSound]);
  
  return (
    <SliderContainer 
      ref={sliderRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <SlideTrack style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {statisticsData.map((stat, index) => (
          <StatisticSlide key={stat.id} isActive={index === currentSlide}>
            <div 
              style={{
                backgroundImage: `url(${stat.image})`,
              }}
            >
              <h2>{stat.title}</h2>
              <p>{stat.description}</p>
            </div>
          </StatisticSlide>
        ))}
      </SlideTrack>

      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '0 10px',
        maxWidth: '100%'
      }}>
        {statisticsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: index === currentSlide ? '#11914b' : 'rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
              flexShrink: 0,
              transform: index === currentSlide ? 'scale(1.2)' : 'scale(1)',
            }}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </SliderContainer>
  );
};

export default StatisticsSection;
