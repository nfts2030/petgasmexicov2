import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import {
  FaTachometerAlt,
  FaClock,
  FaGasPump,
  FaFire,
  FaUsers,
  FaIndustry,
  FaRecycle,
  FaLeaf,
  FaChartLine,
  FaShieldAlt,
} from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import '../../src/styles/equipmentSection.css';
import '../../src/styles/processBenefits.css';

// Animación de gradiente
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AnimatedGradientText = styled.h1`
  margin-bottom: 20px;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.2;
  padding: 0 15px;
  margin-top: 0;
  background: linear-gradient(90deg, #0a4b2a, #ffeb3b, #0a4b2a);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 5s ease infinite;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const MaquinasPage: React.FC = () => {
  const { t } = useLanguage();

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
        <title>{t('maquinas.helmet_title')}</title>
        <meta name="description" content={t('maquinas.helmet_description')} />
      </Helmet>

      {/* Header placeholder */}
      <div id="header-placeholder"></div>

      {/* Hero Section */}
      <section
        className="equipment-hero"
        style={{
          paddingTop: '100px',
          paddingBottom: '60px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="container"
          style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <AnimatedGradientText>{t('maquinas.hero_title')}</AnimatedGradientText>
          <p
            style={{
              marginBottom: '0',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#ffffff',
              display: 'inline-block',
              padding: '0 10px',
              fontWeight: '700',
              textShadow: 'none',
            }}
          >
            {t('maquinas.hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Sección de Equipos */}
      <section className="equipment-section">
        <Container>
          <div className="equipment-grid">
            {/* Equipo P-90 */}
            <div className="equipment-card">
              <div className="equipment-image-container">
                <img src="/img/p01.jpeg" alt={t('maquinas.p90_alt')} className="equipment-image" />
                <span className="equipment-badge">{t('maquinas.p90_badge')}</span>
              </div>
              <div className="equipment-info">
                <h3>PETGAS P-90</h3>
                <p>{t('maquinas.p90_description')}</p>
                <div className="specs">
                  <div className="spec-item">
                    <span>
                      <FaTachometerAlt /> {t('maquinas.spec_capacity')}
                    </span>
                    <span>{t('maquinas.p90_capacity')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaClock /> {t('maquinas.spec_duration')}
                    </span>
                    <span>{t('maquinas.p90_duration')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaGasPump /> {t('maquinas.spec_production')}
                    </span>
                    <span>{t('maquinas.p90_production')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaFire /> {t('maquinas.spec_power')}
                    </span>
                    <span>{t('maquinas.p90_power')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaUsers /> {t('maquinas.spec_operators')}
                    </span>
                    <span>{t('maquinas.p90_operators')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaFire /> {t('maquinas.spec_lp_gas_consumption')}
                    </span>
                    <span>{t('maquinas.p90_lp_gas_consumption')}</span>
                  </div>
                </div>
                <a href="https://petgas.com.mx/contacto/" className="equipment-cta">
                  {t('maquinas.cta_request_quote')}
                </a>
              </div>
            </div>

            {/* Equipo 4K-1R */}
            <div className="equipment-card">
              <div className="equipment-image-container">
                <img
                  src="/img/4k-1R.jpeg"
                  alt={t('maquinas.4k1r_alt')}
                  className="equipment-image"
                />
                <span className="equipment-badge">{t('maquinas.4k1r_badge')}</span>
              </div>
              <div className="equipment-info">
                <h3>PETGAS 4K-1R</h3>
                <p>{t('maquinas.4k1r_description')}</p>
                <div className="specs">
                  <div className="spec-item">
                    <span>
                      <FaTachometerAlt /> {t('maquinas.spec_capacity')}
                    </span>
                    <span>{t('maquinas.4k1r_capacity')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaClock /> {t('maquinas.spec_duration')}
                    </span>
                    <span>{t('maquinas.4k1r_duration')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaGasPump /> {t('maquinas.spec_production')}
                    </span>
                    <span>{t('maquinas.4k1r_production')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaFire /> {t('maquinas.spec_burners')}
                    </span>
                    <span>{t('maquinas.4k1r_burners')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaIndustry /> {t('maquinas.spec_reactor')}
                    </span>
                    <span>{t('maquinas.4k1r_reactor')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaUsers /> {t('maquinas.spec_operators')}
                    </span>
                    <span>{t('maquinas.4k1r_operators')}</span>
                  </div>
                </div>
                <a href="https://petgas.com.mx/contacto/" className="equipment-cta">
                  {t('maquinas.cta_request_quote')}
                </a>
              </div>
            </div>

            {/* Equipo 4K-2R */}
            <div className="equipment-card">
              <div className="equipment-image-container">
                <img
                  src="/img/Planta4k-2r.jpeg"
                  alt={t('maquinas.4k2r_alt')}
                  className="equipment-image"
                />
                <span className="equipment-badge">{t('maquinas.4k2r_badge')}</span>
              </div>
              <div className="equipment-info">
                <h3>PETGAS 4K-2R</h3>
                <p>{t('maquinas.4k2r_description')}</p>
                <div className="specs">
                  <div className="spec-item">
                    <span>
                      <FaTachometerAlt /> {t('maquinas.spec_capacity')}
                    </span>
                    <span>{t('maquinas.4k2r_capacity')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaClock /> {t('maquinas.spec_duration')}
                    </span>
                    <span>{t('maquinas.4k2r_duration')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaGasPump /> {t('maquinas.spec_production')}
                    </span>
                    <span>{t('maquinas.4k2r_production')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaFire /> {t('maquinas.spec_burners')}
                    </span>
                    <span>{t('maquinas.4k2r_burners')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaIndustry /> {t('maquinas.spec_reactors')}
                    </span>
                    <span>{t('maquinas.4k2r_reactors')}</span>
                  </div>
                  <div className="spec-item">
                    <span>
                      <FaUsers /> {t('maquinas.spec_operators')}
                    </span>
                    <span>{t('maquinas.4k2r_operators')}</span>
                  </div>
                </div>
                <a href="https://petgas.com.mx/contacto/" className="equipment-cta">
                  {t('maquinas.cta_request_quote')}
                </a>
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
            <h2 className="section-title">{t('maquinas.process_title')}</h2>

            <div className="process-steps">
              {/* Paso 1 */}
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>{t('maquinas.process_step1_title')}</h4>
                  <p>{t('maquinas.process_step1_description')}</p>
                </div>
              </div>

              {/* Paso 2 */}
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>{t('maquinas.process_step2_title')}</h4>
                  <p>{t('maquinas.process_step2_description')}</p>
                </div>
              </div>

              {/* Paso 3 */}
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>{t('maquinas.process_step3_title')}</h4>
                  <p>{t('maquinas.process_step3_description')}</p>
                </div>
              </div>

              {/* Paso 4 */}
              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>{t('maquinas.process_step4_title')}</h4>
                  <p>{t('maquinas.process_step4_description')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Beneficios */}
          <div className="benefits-section">
            <h2 className="section-title">{t('maquinas.benefits_title')}</h2>

            <div className="benefits-grid">
              {/* Beneficio 1 */}
              <div className="benefit-card green-gradient">
                <div>
                  <div className="benefit-icon">
                    <FaRecycle />
                  </div>
                  <h4>{t('maquinas.benefit1_title')}</h4>
                  <p>{t('maquinas.benefit1_description')}</p>
                </div>
              </div>

              {/* Beneficio 2 */}
              <div className="benefit-card dark-green-gradient">
                <div>
                  <div className="benefit-icon">
                    <FaLeaf />
                  </div>
                  <h4>{t('maquinas.benefit2_title')}</h4>
                  <p>{t('maquinas.benefit2_description')}</p>
                </div>
              </div>

              {/* Beneficio 3 */}
              <div className="benefit-card green-gradient">
                <div>
                  <div className="benefit-icon">
                    <FaChartLine />
                  </div>
                  <h4>{t('maquinas.benefit3_title')}</h4>
                  <p>{t('maquinas.benefit3_description')}</p>
                </div>
              </div>

              {/* Beneficio 4 */}
              <div className="benefit-card dark-green-gradient">
                <div>
                  <div className="benefit-icon">
                    <FaShieldAlt />
                  </div>
                  <h4>{t('maquinas.benefit4_title')}</h4>
                  <p>{t('maquinas.benefit4_description')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Llamado a la acción */}
          <div className="cta-container">
            <h3>{t('maquinas.cta_title')}</h3>
            <p>{t('maquinas.cta_subtitle')}</p>
            <a href="https://petgas.com.mx/contacto/" className="cta-button">
              {t('maquinas.cta_button')}
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
