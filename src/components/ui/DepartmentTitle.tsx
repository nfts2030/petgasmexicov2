import React from 'react';
import styled from 'styled-components';
import { getDepartmentColor } from '../../utils/departmentColors';

interface DepartmentTitleProps {
  department: string;
  children: React.ReactNode;
}

const Title = styled.h2<{ $color: string }>`
  text-align: center;
  color: ${props => props.$color};
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 1rem 0.5rem;
  border-bottom: 3px solid ${props => props.$color};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(-50%) scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const DepartmentTitle: React.FC<DepartmentTitleProps> = ({ department, children }) => {
  const color = getDepartmentColor(department);
  
  return (
    <Title $color={color}>
      {children}
    </Title>
  );
};

export default DepartmentTitle;
