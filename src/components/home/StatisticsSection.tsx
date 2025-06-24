import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

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
`;



// Styled components
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
  // Image paths
  const fdobotellasslider = '/img/11/fdobotellasslider.jpg';
  const tortugaplastico = '/img/03/tortugaplastico1.jpg';
  const fdoplastijuguetes = '/img/04/fdoplastijuguetes.jpg';
  const microplastics = '/img/03/microplastics1.jpg';

  const statisticsData: Statistic[] = useMemo(() => [
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
    },
    {
      id: 5,
      title: "EL 80% DE LA BASURA MARINA",
      description: "PROVIENE DE FUENTES TERRESTRES, PRINCIPALMENTE PLÁSTICOS",
      image: microplastics
    },
    {
      id: 6,
      title: "PARA 2050 HABRÁ MÁS PLÁSTICO",
      description: "QUE PECES EN EL MAR (EN PESO) SEGÚN LA ONU",
      image: tortugaplastico
    }
  ], [fdobotellasslider, tortugaplastico, fdoplastijuguetes, microplastics]);
  
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
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '20px',
              }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{stat.title}</h2>
              <p style={{ fontSize: '1.2rem', maxWidth: '800px' }}>{stat.description}</p>
            </div>
          </StatisticSlide>
        ))}
      </SlideTrack>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 10
      }}>
        {statisticsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: index === currentSlide ? '#11914b' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              padding: 0,
              transition: 'background-color 0.3s ease',
            }}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </SliderContainer>
  );
};

export default StatisticsSection;
