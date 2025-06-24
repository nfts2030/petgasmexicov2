import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';

// Animación de gradiente para el texto (definida en línea)

// Componente de texto con gradiente animado (definido en línea)

// Types
interface Statistic {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}



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
// El componente Slide fue eliminado ya que no se estaba utilizando

// Styled components
// Estilos para el contenedor principal del slider
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 650px; /* Aumentada aún más para mostrar imágenes más grandes */
  overflow: hidden;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinear al inicio para que el contenido baje */
  padding-top: 100px; /* Bajar el contenido */
  
  /* Ajustes para pantallas grandes */
  @media (max-width: 1440px) {
    height: 600px;
  }
  
  /* Ajustes para laptops */
  @media (max-width: 1200px) {
    height: 550px;
  }
  
  /* Ajustes para tablets */
  @media (max-width: 992px) {
    height: 500px;
    padding-top: 80px;
  }
  
  /* Ajustes para móviles */
  @media (max-width: 768px) {
    height: 450px;
    padding-top: 60px;
  }
  
  /* Ajustes para móviles pequeños */
  @media (max-width: 480px) {
    height: 380px;
    padding-top: 50px;
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
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  // Note: isLastTwoSlides was removed as it was not being used
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
  
  // La animación de gradiente se ha movido directamente al estilo del componente AnimatedTitle

  // Estilo para el título con gradiente animado
  const AnimatedTitle = styled.h2`
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    font-size: 2.2rem;
    margin-bottom: 1rem;
    font-weight: bold;
    line-height: 1.2;
    background: linear-gradient(90deg, #0a4b2a, #ffeb3b, #0a4b2a);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient 5s ease infinite;
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
            {statisticsData.map((stat) => {
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
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${stat.image})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#000',
                    filter: 'brightness(0.9)'
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
                      padding: '25px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      backdropFilter: 'blur(6px)',
                      marginBottom: '30px',
                      transform: 'translateY(50px)' /* Bajar más el texto */
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
