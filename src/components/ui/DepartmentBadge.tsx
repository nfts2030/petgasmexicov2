import React from 'react';
import styled from 'styled-components';

interface DepartmentBadgeProps {
  $color: string;
  children: React.ReactNode;
}

const StyledBadge = styled.div<{ $color: string }>`
  background-color: ${props => props.$color};
  color: #fff;
  font-weight: 500;
  padding: 5px 15px;
  display: inline-block;
  border-radius: 20px;
  margin-top: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  font-size: 0.8rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
`;

const DepartmentBadge: React.FC<DepartmentBadgeProps> = ({ $color, children }) => {
  return (
    <StyledBadge $color={$color}>
      {children}
    </StyledBadge>
  );
};

export default DepartmentBadge;
