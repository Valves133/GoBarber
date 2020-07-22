import React from 'react';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

// import ToastContainer from './components/ToastContainer';
import AppProvider from './hooks';

/**
 * AuthContext.Provider - é um componente que colocamos por volta dos outros
 * componentes que queremos que tenha acesso ao contexto de autenticação

 */

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
