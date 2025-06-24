import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const PageContainer = styled.div`
  padding: 1rem;
  margin-top: 80px; // Compensar el header fijo
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  box-sizing: border-box;
  
  @media (min-width: 768px) {
    padding: 2rem;
    margin-top: 100px;
  }
`;

const Title = styled.h1`
  color: #0a4b2a;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, className }) => {
  useEffect(() => {
    // Scroll suave al principio de la página
    scroll.scrollToTop({
      duration: 300,
      smooth: true,
    });
  }, []);

  return (
    <PageContainer className={className}>
      {title && <Title>{title}</Title>}
      <Content>{children}</Content>
    </PageContainer>
  );
};

export default PageLayout;
