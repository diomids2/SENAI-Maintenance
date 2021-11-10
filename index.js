import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';


import './index.css';

import cadastrarAlunos from './pages/Alunos/cadastrarAluno';
import homeAdm from './pages/Adm/homeAdm';
import cadastrarTurmas from './pages/Turmas/cadastrarTurma'
import cadastrarColaborador from './pages/Colaborador/cadastrarColaborador'
import homeColaborador from './pages/Colaborador/homeColaborador'
import perfil from './pages/Perfil/perfil'
import listarColaboradores from './pages/Colaborador/homeColaborador'
import { parseJwt, usuarioAutenticado } from './services/auth';
import notFound from '../src/pages/NotFound/notFound'

import App from './App';
import reportWebVitals from './reportWebVitals';
import ListarTurmas from './pages/Turmas/listarTurma';

/*FALTA FAZER A PERMISSÃO DE ACESSO AS PÁGINAS DE CADASTRO E HOME DO ADMINISTRADOR */

/*const Permissao = ({ component : Component  }) => (
  <Route 
    render = { props =>
      // Verifica se o usuário está logado e se é Administrador
      usuarioAutenticado() && parseJwt().role === "0" || usuarioAutenticado() && parseJwt().role === "1"  ? 
      // Se sim, renderiza de acordo com a rota solicitada e permitida
      <Component {...props} /> : 
      // Se não, redireciona para a página de login
      <Redirect to = '/' />
    }
  />
);

const PermissaoAdm = ({ component : Component  }) => (
  <Route 
    render = { props =>
      // Verifica se o usuário está logado e se é Administrador
      usuarioAutenticado() && parseJwt().role === "0"   ? 
      // Se sim, renderiza de acordo com a rota solicitada e permitida
      <Component {...props} /> : 
      // Se não, redireciona para a página de login
      <Redirect to = '/' />
    }
  />
);    */

const routing = (
  <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/cadastraraluno" component={cadastrarAlunos} />
          <Route exact path="/adm" component={homeAdm} />
          <Route exact path="/listarcolaboradores" component={listarColaboradores} />
          <Route exact path="/listarturmas" component={ListarTurmas} />
          <Route exact path="/cadastrarturma" component={cadastrarTurmas} />
          <Route exact path="/cadastrarcolaborador" component={cadastrarColaborador} />
          <Route exact path="/colaborador" component={homeColaborador} />
          <Route exact path="/perfil" component={perfil} />
          <Route exact path="/notfound" component={notFound} />

          <Redirect to="/notfound" />
        </Switch>
      </div>
  </BrowserRouter>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
