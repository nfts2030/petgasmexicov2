import React, { useState, useEffect, useRef, useCallback } from 'react';

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

const StatisticsSection: React.FC = () => {
  console.log('StatisticsSection se está renderizando');
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderInterval = useRef<number | null>(null);
  
  // Función para ir a la siguiente diapositiva
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % statisticsData.length);
  }, []);
  
  // Función para ir a una diapositiva específica
  const goToSlide = (index: number) => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
    setCurrentSlide(index);
    // Reiniciar el autoplay después de cambiar manualmente
    sliderInterval.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
  };
  
  // Configurar el autoplay
  useEffect(() => {
    sliderInterval.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
    
    // Limpiar el intervalo al desmontar el componente
    return () => {
      if (sliderInterval.current) {
        clearInterval(sliderInterval.current);
      }
    };
  }, [nextSlide]);
  
  // Detener autoplay al tocar el slider en móviles
  const handleTouchStart = () => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
  };
  
  // Reanudar autoplay al soltar el toque
  const handleTouchEnd = () => {
    sliderInterval.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
  };
  
  return (
    <div 
      style={{
        width: '100%',
        height: '60vh',
        minHeight: '300px',
        maxHeight: '500px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        margin: '20px 0',
        touchAction: 'pan-y'
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Contenedor del slider */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `translateX(-${currentSlide * 100}%)`,
          willChange: 'transform'
        }}
      >
        {statisticsData.map((stat) => (
          <div 
            key={stat.id}
            style={{
              minWidth: '100%',
              height: '100%',
              position: 'relative',
              flexShrink: 0
            }}
          >
            {/* Imagen de fondo */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${stat.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 1
              }}
            >
              {/* Capa de superposición semitransparente con gradiente */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                textAlign: 'center',
                color: 'white',
                boxSizing: 'border-box'
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                  margin: '0 0 15px 0',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
                  maxWidth: '800px',
                  lineHeight: '1.3',
                  fontWeight: 'bold',
                  padding: '0 10px'
                }}>
                  {stat.title}
                </h2>
                <p style={{
                  fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
                  maxWidth: '800px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                  margin: '10px 0 0 0',
                  lineHeight: '1.4',
                  padding: '0 15px'
                }}>
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Controles de navegación */}
      <button 
        onClick={() => goToSlide((currentSlide - 1 + statisticsData.length) % statisticsData.length)}
        style={{
          position: 'absolute',
          left: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(5px)',
          border: 'none',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          color: 'white',
          cursor: 'pointer',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          outline: 'none'
        }}
        onTouchStart={(e) => e.stopPropagation()}
        aria-label="Diapositiva anterior"
      >
        ❮
      </button>
      
      <button 
        onClick={() => goToSlide((currentSlide + 1) % statisticsData.length)}
        style={{
          position: 'absolute',
          right: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(5px)',
          border: 'none',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          color: 'white',
          cursor: 'pointer',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          outline: 'none'
        }}
        onTouchStart={(e) => e.stopPropagation()}
        aria-label="Siguiente diapositiva"
      >
        ❯
      </button>
      
      {/* Indicadores de paginación */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 3,
        padding: '5px 10px',
        borderRadius: '20px',
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(5px)'
      }}>
        {statisticsData.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            style={{
              width: index === currentSlide ? '24px' : '10px',
              height: '10px',
              borderRadius: '5px',
              border: 'none',
              background: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            aria-label={`Ir a la diapositiva ${index + 1}`}
            onTouchStart={(e) => e.stopPropagation()}
          />
        ))}
      </div>
      
      {/* Contador de diapositivas */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        right: '15px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '0.8rem',
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)'
      }}>
        <span style={{ fontWeight: 'bold' }}>{currentSlide + 1}</span>
        <span style={{ margin: '0 4px' }}>/</span>
        <span>{statisticsData.length}</span>
      </div>
    </div>
  );
};

export default StatisticsSection;
