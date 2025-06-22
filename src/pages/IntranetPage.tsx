import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 1rem;
  margin-top: 80px;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #0a4b2a;
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginContainer = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const IntranetPage: React.FC = () => {
  return (
    <PageContainer>
      <Title>Intranet PETGAS</Title>
      <LoginContainer>
        <p>Acceso restringido al personal autorizado</p>
        {/* Formulario de login se agregará aquí */}
      </LoginContainer>
    </PageContainer>
  );
};

export default IntranetPage;
