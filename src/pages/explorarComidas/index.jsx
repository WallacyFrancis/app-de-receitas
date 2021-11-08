import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExplorarComidas({ history }) {
  return (
    <>
      <Header title="Explorar Comidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push('/comidas/52771') }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </>
  );
}

ExplorarComidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExplorarComidas;
