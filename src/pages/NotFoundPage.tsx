import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #0a4b2a;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background-color: #0a4b2a;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0d6a3d;
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Message>Página no encontrada</Message>
      <HomeButton to="/">Volver al Inicio</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
