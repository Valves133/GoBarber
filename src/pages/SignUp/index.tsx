import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
// É uma interface que possue todas as typagens de current em useRef
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
  /* Váriavel para referencial nosso FORM do Unform, se estivessemos
   fazendo manual poderiamos criar um atributo error direto no form.
   Retornar tudo dentro de 'current' no objeto
  */

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      // Set'ando o estado de erros como vazio
      formRef.current?.setErrors({});

      // Validação com YUP
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(
          6,
          'Digite uma senha com o mínimo de 6 dígitos',
        ),
      });
      /**
       * Checar validação,
       * Por padrão o Yup para quando encontra o primeiro erro, por isso agregamos
       * o segundo parâmetro abortEarly como falso para retornar todos os erros
       */
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);

      const errors = getValidationErrors(err);
      // Forma dinâmica
      formRef.current?.setErrors(errors);

      /**
       * Forma Estática
       *
       * formRef.current?.setErrors({
        name: 'Nome obrigatório',
      });
       */
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="logo" />

        <Form
          ref={formRef}
          // initialData={{ name: 'Diego' }}
          onSubmit={handleSubmit}
        >
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="login">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
