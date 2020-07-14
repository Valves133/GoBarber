import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

// Add typagem
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);

  /**
   * useField - é um hook disponível que recebe como parâmetro o nome do campo
   * E retorna as funções:
   * fieldName - pois o unform as vezes altera o nome do campo baseado em algumas condições
   * defaultValue - Permite setar o input com um valor inicial
   * error - Colocar um erro de validação
   * registerField - Recebe o name, ref(para acessar um elemento de forma direta),
   * path - onde está o valor do input
   */
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Fazer o registro quando aparecer em tela
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  /**  Evitar de criar functions dentro dos components pois elas são recriadas
   * quando a função principal é chamada
     Usar o useCallback
  */

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    /* if (inputRef.current?.value) {
      setIsField(true);
    } else {
      setIsField(false);
    }
      OU
      */
    setIsField(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container isField={isField} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        // onBlur={() => setIsFocused(false)}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
