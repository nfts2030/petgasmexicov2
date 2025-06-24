import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Animación de gradiente para el texto
// Definir la animación de gradiente
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Crear un componente de texto con gradiente animado
const AnimatedGradientText = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
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
  margin-top: 20px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 0.6rem;
  }
`;

// Types
interface Statistic {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

// Animations
const subtlePulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Estilos simplificados para el slider
const SlideTrack = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  transition: transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1); /* Transición más suave */
  will-change: transform; /* Mejora el rendimiento */
  
  & > div {
    flex: 0 0 100%;
    min-width: 100%;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// Usamos $ para indicar que son props transitorias (no se pasan al DOM)
const StatisticSlide = styled.div<{ $isActive: boolean; $isLastTwo: boolean }>`
  flex: 0 0 100%;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transform: ${({ $isActive }) => ($isActive ? 'scale(1)' : 'scale(0.95)')};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  will-change: opacity, transform;
  background-color: ${({ $isLastTwo }) => ($isLastTwo ? '#f5f5f5' : 'rgba(0,0,0,0.3)')};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  ${({ $isLastTwo }) => $isLastTwo ? `
    padding: 20px;
    flex-direction: column;
    text-align: center;
    
    img {
      max-width: 80%;
      max-height: 70%;
      object-fit: contain;
      margin-bottom: 20px;
    }
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: #333;
    }
    
    p {
      font-size: 1rem;
      color: #666;
      max-width: 90%;
    }
  ` : `
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      line-height: 1.3;
      font-weight: 800;
      color: #f0f0f0;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
      display: inline-block;
      padding: 0 10px 5px;
      margin-top: 20px;
    }
    
    p {
      font-size: 1.1rem;
      line-height: 1.5;
      margin-bottom: 1rem;
      color: #f0f0f0;
      font-weight: 500;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
      padding: 0 10px 10px;
    }
  `}
  
  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.8rem;
    }
    
    p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    h2 {
      font-size: 1.3rem;
      margin-bottom: 0.6rem;
    }
    
    p {
      font-size: 0.9rem;
      margin-bottom: 0.8rem;
    }
  }
`;

// Styled components
// Estilos para el contenedor principal del slider
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px; /* Aumentar altura para acomodar textos */
  overflow: hidden;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* Ajustes para móviles */
  @media (max-width: 768px) {
    height: 250px;
  }
  
  /* Ajustes para móviles pequeños */
  @media (max-width: 480px) {
    height: 200px;
  }
`;

const StatisticsSection: React.FC = () => {
  // Image paths - Rutas de imágenes actualizadas
  const sliderImages = [
    '/img/11/fdobotellasslider.jpg',
    '/img/03/tortugaplastico1.jpg',
    '/img/04/fdoplastijuguetes.jpg',
    '/img/03/microplastics1.jpg',
    '/img/2050.png',
    '/img/Planta4k-2r.jpeg'
  ];
  
  // Verificar rutas de imágenes
  console.log('Rutas de imágenes del slider:', sliderImages);

  // Verificar existencia de imágenes (solo en desarrollo)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      sliderImages.forEach(img => {
        const imgElement = new Image();
        imgElement.src = img;
        imgElement.onload = () => console.log(`Imagen cargada: ${img}`);
        imgElement.onerror = () => console.error(`Error al cargar imagen: ${img}`);
      });
    }
  }, []);

  const statisticsData: Statistic[] = useMemo(() => [
    {
      id: 1,
      title: "MENOS DEL 10% DEL PLÁSTICO",
      description: "SE RECICLA A NIVEL GLOBAL SEGÚN LA OCDE",
      image: sliderImages[0],
      alt: "Botellas de plástico apiladas"
    },
    {
      id: 2,
      title: "MÁS DE 11 MILLONES DE TONELADAS",
      description: "DE PLÁSTICO TERMINAN EN LOS OCÉANOS CADA AÑO",
      image: sliderImages[1],
      alt: "Tortuga marina afectada por plásticos"
    },
    {
      id: 3,
      title: "MÁS DE 400 AÑOS",
      description: "PUEDE TARDAR UNA BOTELLA DE PLÁSTICO EN DEGRADARSE",
      image: sliderImages[2],
      alt: "Juguetes de plástico"
    },
    {
      id: 4,
      title: "EL 80% DE LA BASURA MARINA",
      description: "PROVIENE DE FUENTES TERRESTRES, PRINCIPALMENTE PLÁSTICOS",
      image: sliderImages[3],
      alt: "Microplásticos en el océano"
    },
    {
      id: 5,
      title: "PARA 2050 HABRÁ MÁS PLÁSTICO",
      description: "QUE PECES EN EL MAR (EN PESO) SEGÚN LA ONU",
      image: sliderImages[4],
      alt: "Predicción de plásticos en el océano para 2050"
    },
    {
      id: 6,
      title: "ENERGÍA LIMPIA DE RESIDUOS",
      description: "TRANSFORMAMOS PLÁSTICOS EN COMBUSTIBLES SOSTENIBLES",
      image: sliderImages[5],
      alt: "Planta de transformación de plásticos"
    }
  ], [sliderImages]);
  
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % statisticsData.length);
    
    // Programar la siguiente transición
    if (isPlaying && !isHovered) {
      timeoutRef.current = window.setTimeout(() => {
        nextSlide();
      }, 5000); // 5 segundos por slide
    }
  }, [statisticsData.length, isPlaying, isHovered]);
  
  // Function to go to a specific slide
  const goToSlide = useCallback((index: number) => {
    // Limpiar timeout existente
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Asegurar que el índice esté dentro de los límites
    if (index < 0) {
      index = statisticsData.length - 1;
    } else if (index >= statisticsData.length) {
      index = 0;
    }
    
    // Actualizar la diapositiva actual
    setCurrentSlide(index);
    
    // Iniciar el autoplay si está habilitado y no hay hover
    if (isPlaying && !isHovered) {
      timeoutRef.current = window.setTimeout(() => {
        nextSlide();
      }, 5000);
    }
  }, [statisticsData.length, isPlaying, isHovered, nextSlide]);
  
  // Iniciar autoplay al montar y cuando cambia el estado de hover
  useEffect(() => {
    if (isPlaying && !isHovered) {
      // Limpiar timeout existente
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Iniciar el ciclo de transiciones
      timeoutRef.current = window.setTimeout(() => {
        nextSlide();
      }, 5000);
    }
    
    // Limpieza al desmontar o cuando cambian las dependencias
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isPlaying, isHovered, nextSlide]);
  
  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);
  
  // Debug current slide and hover state
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Estado actual - Diapositiva:', currentSlide + 1, 'de', statisticsData.length, '- Hover:', isHovered);
      console.log('Intervalo activo:', timeoutRef.current !== null);
    }
  }, [currentSlide, isHovered, statisticsData.length]);
  
  // Manejar el estado de hover
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (isPlaying && !timeoutRef.current) {
      timeoutRef.current = window.setTimeout(() => {
        nextSlide();
      }, 5000);
    }
  }, [isPlaying, nextSlide]);
  
  // Pausar/reanudar el slider
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      // Pausar
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else {
      // Reanudar
      if (!timeoutRef.current) {
        timeoutRef.current = window.setTimeout(() => {
          nextSlide();
        }, 5000);
      }
    }
    setIsPlaying(prev => !prev);
  }, [isPlaying, nextSlide]);
  
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
  
  // Función para reproducir sonido (actualmente deshabilitada por restricciones del navegador)
  // Se mantiene como referencia para una implementación futura con interacción del usuario
  
  // Definir la animación de gradiente
  const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `;

  // Estilo para el título con gradiente animado
  const AnimatedTitle = styled.h2`
    font-size: 2.2rem;
    margin-bottom: 1rem;
    font-weight: bold;
    line-height: 1.2;
    background: linear-gradient(90deg, #0a4b2a, #ffeb3b, #0a4b2a);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${gradientAnimation} 5s ease infinite;
    display: inline-block;
    padding: 0 10px 5px;
    text-shadow: none;
    margin-top: 0;
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  `;

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div ref={sliderRef}>
        <SliderContainer 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <SlideTrack style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
            width: `${statisticsData.length * 100}%`
          }}>
            {statisticsData.map((stat, index) => {
              const isLastTwoSlides = index >= statisticsData.length - 2;
              
              return (
                <div 
                  key={stat.id} 
                  style={{
                    flex: '0 0 100%',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${stat.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.7)'
                  }} />
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    padding: '40px 20px',
                    textAlign: 'center',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                  }}>
                    <div style={{
                      maxWidth: '1000px',
                      width: '100%',
                      padding: '20px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      <AnimatedTitle>{stat.title}</AnimatedTitle>
                      <p style={{
                        fontSize: '1.3rem',
                        lineHeight: '1.6',
                        margin: '0 auto',
                        maxWidth: '800px'
                      }}>{stat.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </SlideTrack>
        </SliderContainer>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 10,
        padding: '8px 12px',
        borderRadius: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)'
      }}>
        {statisticsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentSlide ? '24px' : '12px',
              height: '12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: index === currentSlide ? '#0a4b2a' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            aria-label={`Ir a la diapositiva ${index + 1}`}
            aria-current={index === currentSlide ? 'step' : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;
