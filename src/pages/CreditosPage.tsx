import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { FaRecycle, FaHandHoldingUsd, FaFingerprint } from 'react-icons/fa';
import { SiBlockchaindotcom } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext';

// Animation for background gradient
const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const HeroSection = styled.section`
  background: linear-gradient(135deg, #0a4b2a 0%, #0d7a3f 50%, #0a4b2a 100%);
  background-size: 200% 200%;
  padding: 140px 0 100px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  margin-top: 80px;
  animation: ${gradientBG} 15s ease infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 25%);
    z-index: 1;
  }
  
  @keyframes ${gradientBG} {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
  margin-bottom: 2rem;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: #FFD700;
    margin: 1rem auto 0;
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  line-height: 1.6;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  color: #FFEB3B;
  font-weight: 500;
  padding: 0 20px;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0 1rem;
  }
`;

const Section = styled.section<{ $bgColor?: string; $textColor?: string }>`
  padding: 80px 0;
  background-color: ${props => props.$bgColor || '#fff'};
  color: ${props => props.$textColor || '#333'};
  position: relative;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  color: #1a5f2f;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #FFD700, #FFA500);
    margin: 15px auto 0;
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  max-width: 900px;
  margin: 20px auto 0;
  color: #555;
`;

const SolutionCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SolutionIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #1a5f2f, #2ecc71);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 1.8rem;
`;

const CreditStep = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  text-align: center;
  position: relative;
  height: 100%;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: #1a5f2f;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 20px;
`;

const CreditosPage: React.FC = () => {
  const { t } = useLanguage();
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="creditos-page">
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <HeroTitle>{t('creditos.hero_title')}</HeroTitle>
          <HeroSubtitle>
            {t('creditos.hero_subtitle')}
          </HeroSubtitle>
        </Container>
      </HeroSection>

      {/* Soluciones Impactantes Section */}
      <Section $bgColor="#f8f9fa">
        <Container>
          <SectionHeader>
            <SectionTitle>{t('creditos.impact_title')}</SectionTitle>
          </SectionHeader>
          
          <Row className="g-4">
            <Col md={6}>
              <SolutionCard>
                <SolutionIcon>
                  <FaRecycle />
                </SolutionIcon>
                <h3 style={{ color: '#1a5f2f', textAlign: 'center', marginBottom: '15px' }}>{t('creditos.social_impact_title')}</h3>
                <p style={{ lineHeight: '1.7', color: '#555', textAlign: 'center' }}>
                  {t('creditos.social_impact_text')}
                </p>
              </SolutionCard>
            </Col>
            
            <Col md={6}>
              <SolutionCard>
                <SolutionIcon>
                  <FaFingerprint />
                </SolutionIcon>
                <h3 style={{ color: '#1a5f2f', textAlign: 'center', marginBottom: '15px' }}>{t('creditos.reliable_tech_title')}</h3>
                <p style={{ lineHeight: '1.7', color: '#555', textAlign: 'center' }}>
                  {t('creditos.reliable_tech_text')}
                </p>
              </SolutionCard>
            </Col>
          </Row>
        </Container>
      </Section>

      {/* Blockchain Technology Section */}
      <Section $bgColor="linear-gradient(135deg, #1a5f2f 0%, #2e8b57 100%)" $textColor="white">
        <Container>
          <SectionHeader>
            <SectionTitle style={{ color: 'white' }}>{t('creditos.blockchain_title')}</SectionTitle>
            <SectionSubtitle style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              {t('creditos.blockchain_text')}
            </SectionSubtitle>
          </SectionHeader>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '25px 30px', 
            borderRadius: '10px', 
            margin: '0 auto 60px', 
            border: '1px solid rgba(255, 255, 255, 0.2)', 
            maxWidth: '900px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', color: '#FFD700', flexShrink: 0 }}>
              <SiBlockchaindotcom />
            </div>
            <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 500, maxWidth: '800px' }}>
              {t('creditos.blockchain_quote')}
            </p>
          </div>
        </Container>
      </Section>

      {/* How It Works Section */}
      <Section $bgColor="#fff">
        <Container>
          <SectionHeader>
            <SectionTitle>{t('creditos.how_it_works_title')}</SectionTitle>
            <SectionSubtitle>{t('creditos.how_it_works_subtitle')}</SectionSubtitle>
          </SectionHeader>

          <Row className="g-4">
            <Col md={4}>
              <CreditStep>
                <StepNumber>1</StepNumber>
                <div style={{ fontSize: '2.5rem', color: '#1a5f2f', marginBottom: '20px' }}>
                  <FaRecycle />
                </div>
                <h3 style={{ color: '#1a5f2f', marginBottom: '15px' }}>{t('creditos.step1_title')}</h3>
                <p style={{ lineHeight: '1.7', color: '#555' }}>
                  {t('creditos.step1_text')}
                </p>
              </CreditStep>
            </Col>

            <Col md={4}>
              <CreditStep>
                <StepNumber>2</StepNumber>
                <div style={{ fontSize: '2.5rem', color: '#1a5f2f', marginBottom: '20px' }}>
                  <FaHandHoldingUsd />
                </div>
                <h3 style={{ color: '#1a5f2f', marginBottom: '15px' }}>{t('creditos.step2_title')}</h3>
                <p style={{ lineHeight: '1.7', color: '#555' }}>
                  {t('creditos.step2_text')}
                </p>
              </CreditStep>
            </Col>

            <Col md={4}>
              <CreditStep>
                <StepNumber>3</StepNumber>
                <div style={{ fontSize: '2.5rem', color: '#1a5f2f', marginBottom: '20px' }}>
                  <FaFingerprint />
                </div>
                <h3 style={{ color: '#1a5f2f', marginBottom: '15px' }}>{t('creditos.step3_title')}</h3>
                <p style={{ lineHeight: '1.7', color: '#555' }}>
                  {t('creditos.step3_text')}
                </p>
              </CreditStep>
            </Col>
          </Row>
        </Container>
      </Section>

      {/* Partners Section */}
      <Section $bgColor="#f8f9fa">
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '20px 0'
          }}>
            <a href="https://www.empower.eco/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center' }}>
              <img 
                src="/img/creditos/green-horizontal-logo-eco.png" 
                alt={t('creditos.partner_alt')} 
                style={{ maxWidth: '300px', height: 'auto' }}
              />
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default CreditosPage;
