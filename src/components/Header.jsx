import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  function handleClick() {
    setShowSearchBar(!showSearchBar);
  }

  function handleButton() {
    if (title === 'Bebidas' || title === 'Comidas' || title === 'Explorar Origem') {
      return (
        <>
          <button
            type="button"
            onClick={ handleClick }
            data-testid="search-top-btn"
            src={ searchIcon }
          >
            <img src={ searchIcon } alt="icone pesquisar" />
          </button>
          { showSearchBar ? <SearchBar /> : null }
        </>
      );
    }
  }

  return (
    <header>
      <button type="button" data-testid="profile-top-btn" src={ profileIcon }>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="icone do perfil"
          />
        </Link>
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      { handleButton() }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.bool,
}.isRequired;

export default Header;
