import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FaTachometerAlt, FaClock, FaGasPump, FaFire, FaUsers, FaIndustry, FaRecycle, FaLeaf, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const MaquinasPage: React.FC = () => {
  useEffect(() => {
    // Animaciones al hacer scroll
    const animateOnScroll = () => {
      const machineCards = document.querySelectorAll('.machine-card, .equipment-card');
      
      machineCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
          setTimeout(() => {
            card.classList.add('animate-fade-in');
          }, index * 150);
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className="maquinas-page">
      <Helmet>
        <title>Nuestros Equipos - PETGAS México</title>
        <meta name="description" content="Conoce nuestros equipos de pirólisis para transformar residuos plásticos en combustibles limpios y sostenibles." />
      </Helmet>

      {/* Header placeholder */}
      <div id="header-placeholder"></div>
      
      {/* Hero Section */}
      <section className="equipment-hero">
        <div className="container">
          <h1>Nuestras Plantas de Pirólisis</h1>
          <p>Soluciones industriales para la transformación de residuos plásticos en combustibles limpios</p>
        </div>
      </section>
      
      {/* Sección de Equipos */}
      <Container style={{ padding: '80px 20px' }}>
        <div className="equipment-grid">
          {/* Equipo P-90 */}
          <div className="equipment-card">
            <div className="equipment-image-container">
              <img src="/img/p01.jpeg" alt="Planta de Pirólisis PETGAS P-90" className="equipment-image" />
              <span className="equipment-badge">90 kg/ciclo • Inicio Rápido</span>
            </div>
            <div className="equipment-info">
              <h3>PETGAS P-90</h3>
              <p>Sistema de pirólisis compacto ideal para pequeñas empresas y proyectos piloto. Procesa 90 kg por ciclo con alta eficiencia energética.</p>
              <div className="specs">
                <div className="spec-item">
                  <span><FaTachometerAlt /> Capacidad</span>
                  <span>90 kg/ciclo</span>
                </div>
                <div className="spec-item">
                  <span><FaClock /> Duración</span>
                  <span>5-6 horas/ciclo</span>
                </div>
                <div className="spec-item">
                  <span><FaGasPump /> Producción</span>
                  <span>45L Gasolina + 25L Diésel</span>
                </div>
                <div className="spec-item">
                  <span><FaFire /> Potencia</span>
                  <span>5 kW</span>
                </div>
                <div className="spec-item">
                  <span><FaUsers /> Operadores</span>
                  <span>3 personas</span>
                </div>
                <div className="spec-item">
                  <span><FaFire /> Consumo Gas LP</span>
                  <span>15 L/h (1-2h/encendido)</span>
                </div>
              </div>
              <a href="/contacto" className="equipment-cta">Solicitar cotización</a>
            </div>
          </div>
          
          {/* Equipo 4K-1R */}
          <div className="equipment-card">
            <div className="equipment-image-container">
              <img src="/img/4k-1R.jpeg" alt="Planta de Pirólisis PETGAS 4K-1R" className="equipment-image" />
              <span className="equipment-badge">8,000 kg/día • 1 Reactor</span>
            </div>
            <div className="equipment-info">
              <h3>PETGAS 4K-1R</h3>
              <p>Sistema industrial con reactor simple para procesamiento continuo de residuos plásticos. Ideal para medianas empresas con alta producción de desechos.</p>
              <div className="specs">
                <div className="spec-item">
                  <span><FaTachometerAlt /> Capacidad</span>
                  <span>8,000 kg/día</span>
                </div>
                <div className="spec-item">
                  <span><FaClock /> Duración</span>
                  <span>8-10 horas/ciclo</span>
                </div>
                <div className="spec-item">
                  <span><FaGasPump /> Producción</span>
                  <span>3,600L Gasolina + 2,000L Diésel</span>
                </div>
                <div className="spec-item">
                  <span><FaFire /> Quemadores</span>
                  <span>1 quemador PETGAS</span>
                </div>
                <div className="spec-item">
                  <span><FaIndustry /> Reactor</span>
                  <span>1 reactor en acero inoxidable</span>
                </div>
                <div className="spec-item">
                  <span><FaUsers /> Operadores</span>
                  <span>3 personas</span>
                </div>
              </div>
              <a href="/contacto" className="equipment-cta">Solicitar cotización</a>
            </div>
          </div>
          
          {/* Equipo 4K-2R */}
          <div className="equipment-card">
            <div className="equipment-image-container">
              <img src="/img/Planta4k-2r.jpeg" alt="Planta de Pirólisis PETGAS 4K-2R" className="equipment-image" />
              <span className="equipment-badge">16,000+ kg/día • 2 Reactores</span>
            </div>
            <div className="equipment-info">
              <h3>PETGAS 4K-2R</h3>
              <p>Sistema industrial de doble reactor para máxima capacidad de procesamiento. Diseñado para operaciones continuas 24/7 con máxima eficiencia.</p>
              <div className="specs">
                <div className="spec-item">
                  <span><FaTachometerAlt /> Capacidad</span>
                  <span>16,000+ kg/día</span>
                </div>
                <div className="spec-item">
                  <span><FaClock /> Duración</span>
                  <span>8-10 horas/ciclo</span>
                </div>
                <div className="spec-item">
                  <span><FaGasPump /> Producción</span>
                  <span>7,200L Gasolina + 4,000L Diésel</span>
                </div>
                <div className="spec-item">
                  <span><FaFire /> Quemadores</span>
                  <span>2 quemadores PETGAS</span>
                </div>
                <div className="spec-item">
                  <span><FaIndustry /> Reactores</span>
                  <span>2 reactores en acero inoxidable</span>
                </div>
                <div className="spec-item">
                  <span><FaUsers /> Operadores</span>
                  <span>4 personas</span>
                </div>
              </div>
              <a href="/contacto" className="equipment-cta">Solicitar cotización</a>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Sección Integrada: Proceso y Beneficios */}
      <section style={{ padding: '80px 0', backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', marginBottom: '60px' }}>
            {/* Columna de Proceso */}
            <div>
              <h3 style={{ color: '#0a4b2a', fontSize: '2rem', marginBottom: '30px', paddingBottom: '15px', borderBottom: '3px solid #1abc9c', display: 'inline-block' }}>
                Nuestro Proceso
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {/* Paso 1 */}
                <div style={{ display: 'flex', gap: '20px', background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: '50px', height: '50px', background: '#0a4b2a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>1</div>
                  <div>
                    <h4 style={{ color: '#0a4b2a', margin: '0 0 10px 0', fontSize: '1.3rem' }}>Recolección</h4>
                    <p style={{ color: '#666', margin: 0 }}>Recolectamos residuos plásticos no reciclables de diversas fuentes para darles una segunda vida.</p>
                  </div>
                </div>
                
                {/* Paso 2 */}
                <div style={{ display: 'flex', gap: '20px', background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', alignItems: 'flex-start', marginLeft: '30px' }}>
                  <div style={{ flexShrink: 0, width: '50px', height: '50px', background: '#0a4b2a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>2</div>
                  <div>
                    <h4 style={{ color: '#0a4b2a', margin: '0 0 10px 0', fontSize: '1.3rem' }}>Procesamiento</h4>
                    <p style={{ color: '#666', margin: 0 }}>Los residuos se procesan en nuestras plantas de pirólisis a altas temperaturas controladas.</p>
                  </div>
                </div>
                
                {/* Paso 3 */}
                <div style={{ display: 'flex', gap: '20px', background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: '50px', height: '50px', background: '#0a4b2a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>3</div>
                  <div>
                    <h4 style={{ color: '#0a4b2a', margin: '0 0 10px 0', fontSize: '1.3rem' }}>Conversión</h4>
                    <p style={{ color: '#666', margin: 0 }}>El plástico se convierte en gases que luego se condensan en combustibles limpios y reutilizables.</p>
                  </div>
                </div>
                
                {/* Paso 4 */}
                <div style={{ display: 'flex', gap: '20px', background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', alignItems: 'flex-start', marginLeft: '30px' }}>
                  <div style={{ flexShrink: 0, width: '50px', height: '50px', background: '#0a4b2a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>4</div>
                  <div>
                    <h4 style={{ color: '#0a4b2a', margin: '0 0 10px 0', fontSize: '1.3rem' }}>Distribución</h4>
                    <p style={{ color: '#666', margin: 0 }}>Los combustibles resultantes se distribuyen para su uso en diversas aplicaciones industriales y comerciales.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Columna de Beneficios */}
            <div>
              <h3 style={{ color: '#0a4b2a', fontSize: '2rem', marginBottom: '30px', paddingBottom: '15px', borderBottom: '3px solid #1abc9c', display: 'inline-block' }}>
                Beneficios Clave
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {/* Beneficio 1 */}
                <div style={{ background: 'linear-gradient(135deg, #0a4b2a, #1abc9c)', color: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 10px 30px rgba(10, 75, 42, 0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                    <div style={{ fontSize: '2rem', color: '#ffc107' }}>
                      <FaRecycle />
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>Reducción de Residuos</h4>
                  </div>
                  <p style={{ margin: 0, opacity: '0.95', lineHeight: '1.6' }}>Eliminamos plásticos no reciclables que de otra manera terminarían en vertederos o en el océano, contribuyendo a un planeta más limpio.</p>
                </div>
                
                {/* Beneficio 2 */}
                <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                    <div style={{ fontSize: '2rem', color: '#0a4b2a' }}>
                      <FaLeaf />
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.5rem', color: '#0a4b2a' }}>Energía Limpia</h4>
                  </div>
                  <p style={{ margin: 0, color: '#666', lineHeight: '1.6' }}>Producción de combustibles con hasta un 80% menos de emisiones de CO₂ en comparación con los combustibles fósiles tradicionales.</p>
                </div>
                
                {/* Beneficio 3 */}
                <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                    <div style={{ fontSize: '2rem', color: '#0a4b2a' }}>
                      <FaChartLine />
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.5rem', color: '#0a4b2a' }}>Rentabilidad</h4>
                  </div>
                  <p style={{ margin: 0, color: '#666', lineHeight: '1.6' }}>Solución económicamente viable que convierte un problema de gestión de residuos en una oportunidad de negocio sostenible.</p>
                </div>
                
                {/* Beneficio 4 */}
                <div style={{ background: 'linear-gradient(135deg, #1abc9c, #0a4b2a)', color: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 10px 30px rgba(10, 75, 42, 0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                    <div style={{ fontSize: '2rem', color: '#ffc107' }}>
                      <FaShieldAlt />
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>Cumplimiento Normativo</h4>
                  </div>
                  <p style={{ margin: 0, opacity: '0.95', lineHeight: '1.6' }}>Ayudamos a las empresas a cumplir con las regulaciones ambientales y a alcanzar sus objetivos de sostenibilidad corporativa.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Llamado a la acción */}
          <div style={{ textAlign: 'center', marginTop: '50px', padding: '40px', background: 'white', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#0a4b2a', fontSize: '1.8rem', marginBottom: '15px' }}>¿Listo para transformar tus residuos en recursos?</h3>
            <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 25px' }}>Contáctanos para conocer cómo podemos ayudarte a implementar una solución sostenible para la gestión de residuos plásticos en tu empresa.</p>
            <a href="/contacto" style={{ display: 'inline-block', background: '#0a4b2a', color: 'white', textDecoration: 'none', padding: '12px 30px', borderRadius: '30px', fontWeight: '600', fontSize: '1.1rem', transition: 'all 0.3s ease' }}>
              Contáctanos Ahora
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer placeholder */}
      <div id="footer-placeholder"></div>
    </div>
  );
};

export default MaquinasPage;
