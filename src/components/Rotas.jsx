import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/login';
import ReceitasComidas from '../pages/receitasComidas';
import ReceitasBebidas from '../pages/receitasBebidas';
import DetalhesComidas from '../pages/detalhesComidas';
import DetalhesBebidas from '../pages/detalhesBebidas';
import ProcessoComidas from '../pages/processoComidas';
import ProcessoBebidas from '../pages/processoBebidas';
import Explorar from '../pages/explorar';
import ExplorarComidas from '../pages/explorarComidas';
import ExplorarBebidas from '../pages/explorarBebidas';
import ExplorarComidasPorIngredientes from '../pages/explorarComidasIngredientes';
import ExplorarBebidasPorIngredientes from '../pages/explorarBebidasIngredientes';
import ExplorarComidasPorOrigem from '../pages/explorarComidasPorOrigem';
import Perfil from '../pages/perfil';
import ReceitasFeitas from '../pages/receitasFeitas';
import ReceitasFavoritas from '../pages/receitasFavoritas';

function Rotas() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ ReceitasComidas } />
      <Route exact path="/bebidas" component={ ReceitasBebidas } />
      <Route exact path="/comidas/:id" component={ DetalhesComidas } />
      <Route exact path="/bebidas/:id" component={ DetalhesBebidas } />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ ProcessoComidas }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ ProcessoBebidas }
      />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExplorarComidasPorIngredientes }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarBebidasPorIngredientes }
      />
      <Route exact path="/explorar/comidas/area" component={ ExplorarComidasPorOrigem } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
    </Switch>
  );
}

export default Rotas;
