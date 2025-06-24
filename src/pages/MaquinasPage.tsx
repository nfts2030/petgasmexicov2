import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FaTachometerAlt, FaClock, FaGasPump, FaFire, FaUsers, FaIndustry, FaRecycle, FaLeaf, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import '../../src/styles/equipmentSection.css';
import '../../src/styles/processBenefits.css';

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
      <section className="equipment-hero" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        <div className="container">
          <h1 style={{ marginBottom: '20px' }}>Nuestras Plantas de Pirólisis NO Catalítica</h1>
          <p style={{ marginBottom: '0' }}>Soluciones industriales para la transformación de residuos plásticos en combustibles limpios</p>
        </div>
      </section>
      
      {/* Sección de Equipos */}
      <section className="equipment-section">
        <Container>
        <div className="equipment-grid">
          {/* Equipo P-90 */}
          <div className="equipment-card">
            <div className="equipment-image-container">
              <img src="/img/p01.jpeg" alt="Planta de Pirólisis NO Catalítica PETGAS P-90" className="equipment-image" />
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
              <img src="/img/4k-1R.jpeg" alt="Planta de Pirólisis NO Catalítica PETGAS 4K-1R" className="equipment-image" />
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
              <img src="/img/Planta4k-2r.jpeg" alt="Planta de Pirólisis NO Catalítica PETGAS 4K-2R" className="equipment-image" />
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
      </section>
      
      {/* Sección Integrada: Proceso y Beneficios - Versión Móvil */}
      <section className="process-benefits-mobile">
        <Container>
          {/* Sección de Proceso */}
          <div className="process-section">
            <h2 className="section-title">Nuestro Proceso</h2>
            
            <div className="process-steps">
              {/* Paso 1 */}
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Recolección</h4>
                  <p>Recolectamos residuos plásticos no reciclables de diversas fuentes para darles una segunda vida.</p>
                </div>
              </div>
              
              {/* Paso 2 */}
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Procesamiento</h4>
                  <p>Los residuos se procesan en nuestras plantas de pirólisis a altas temperaturas controladas.</p>
                </div>
              </div>
              
              {/* Paso 3 */}
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Conversión</h4>
                  <p>El plástico se convierte en gases que luego se condensan en combustibles limpios.</p>
                </div>
              </div>
              
              {/* Paso 4 */}
              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Distribución</h4>
                  <p>Los combustibles resultantes se distribuyen para su uso en diversas aplicaciones industriales y comerciales.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sección de Beneficios */}
          <div className="benefits-section">
            <h2 className="section-title">Beneficios Clave</h2>
            
            <div className="benefits-grid">
              {/* Beneficio 1 */}
              <div className="benefit-card green-gradient">
                <div>
                  <div className="benefit-icon">
                    <FaRecycle />
                  </div>
                  <h4>Reducción de Residuos</h4>
                  <p>Eliminamos plásticos no reciclables que de otra manera terminarían en vertederos o en el océano, contribuyendo a un planeta más limpio.</p>
                </div>
              </div>
              
              {/* Beneficio 2 */}
              <div className="benefit-card dark-green-gradient">
                <div>
                  <div className="benefit-icon">
                    <FaLeaf />
                  </div>
                  <h4>Energía Limpia</h4>
                  <p>Producción de combustibles con hasta un 80% menos de emisiones de CO₂ en comparación con los combustibles fósiles tradicionales.</p>
                </div>
              </div>
              
              {/* Beneficio 3 */}
              <div className="benefit-card green-gradient">
                <div>
                  <div className="benefit-icon">
                    <FaChartLine />
                  </div>
                  <h4>Finanzas Regenerativas</h4>
                  <p>Transformamos un problema de gestión de residuos plásticos en oportunidades económicas sostenibles.</p>
                </div>
              </div>
              
              {/* Beneficio 4 */}
              <div className="benefit-card dark-green-gradient">
                <div>
                  <div className="benefit-icon">
                    <FaShieldAlt />
                  </div>
                  <h4>Cumplimiento Normativo</h4>
                  <p>Ayudamos a las empresas a cumplir con las regulaciones ambientales y a alcanzar sus objetivos de sostenibilidad corporativa.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Llamado a la acción */}
          <div className="cta-container">
            <h3>¿Quisieras saber más de cómo implementar PETGAS en tu cadena de valor comercial?</h3>
            <p>Juntos podemos implementar un plan para descarbonizar tu empresa o a ti mismo</p>
            <a href="/contacto" className="cta-button">
              Contáctanos Ahora
            </a>
          </div>
        </Container>
      </section>
      
      {/* Footer placeholder */}
      <div id="footer-placeholder"></div>
    </div>
  );
};

export default MaquinasPage;
