import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background, AnimationContainer } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const history = useHistory();
  /* Váriavel para referencial nosso FORM do Unform, se estivessemos
   fazendo manual poderiamos criar um atributo error direto no form.
   Retornar tudo dentro de 'current' no objeto
  */

  const formRef = useRef<FormHandles>(null);
  /**
   * Opção inicial
   * const { signIn } = useContext(AuthContext);
   */
  const { user, signIn } = useAuth();
  const { addToast } = useToast();

  console.log(user);

  const handleSubmit = useCallback(
    // async (data: object) => {
    async (data: SignInFormData) => {
      try {
        // Set'ando o estado de erros como vazio
        formRef.current?.setErrors({});

        // Validação com YUP
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail incorreto')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha incorreta'),
        });
        /**
         * Checar validação,
         * Por padrão o Yup para quando encontra o primeiro erro, por isso agregamos
         * o segundo parâmetro abortEarly como falso para retornar todos os erros
         */
        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          // Forma dinâmica
          formRef.current?.setErrors(errors);
          return;
          /**
      * Forma Estática
      *
      * formRef.current?.setErrors({
       name: 'Nome obrigatório',
     });
      */
        }
        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na Autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <Link to="signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default SignIn;
