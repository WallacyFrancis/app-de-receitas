import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/login';
import ReceitasComidas from '../pages/receitasComidas';

function Rotas() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ ReceitasComidas } />
    </Switch>
  );
}

export default Rotas;
