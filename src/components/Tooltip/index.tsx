import React from 'react';

import { Container } from './styles';

/**
 * Passamos o className, pois estamos estilizando o Tooltip desde Input styles...
 * que é um elemento superiot
 */
interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
