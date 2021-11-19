import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Perfil({ history }) {
  function getEmail() {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      return email;
    } return '';
  }

  return (
    <>
      <Header title="Perfil" />
      <h1 data-testid="profile-email">{ getEmail() }</h1>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>

      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/receitas-favoritas') }

      >
        Receitas Favoritas
      </button>

      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          history.push('/');
          localStorage.clear();
        } }
      >
        Sair
      </button>
      <Footer />
    </>
  );
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Perfil;
