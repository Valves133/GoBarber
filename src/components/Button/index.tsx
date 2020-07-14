import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// Criando a typagem de button
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// Children = valor descrito no  button
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
