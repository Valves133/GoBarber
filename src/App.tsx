import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Routes from './routes';

import AppProvider from './hooks';

/**
 * AuthContext.Provider - é um componente que colocamos por volta dos outros
 * componentes que queremos que tenha acesso ao contexto de autenticação

 */

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
