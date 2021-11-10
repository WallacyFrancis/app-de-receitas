import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/Context';

function SearchBar() {
  const [searchInput, setSearchInput] = useState({
    searchInputText: '',
    radioFilter: '',
  });
  const location = useLocation();

  const { searchRecipes } = useContext(Context);

  function handleChange({ target: { value, name } }) {
    setSearchInput({ ...searchInput, [name]: value });
  }

  return (
    <div>
      <label htmlFor="search-input">
        Pesquisar
        <input
          type="text"
          data-testid="search-input"
          id="search-input"
          name="searchInputText"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          id="ingredient"
          type="radio"
          name="radioFilter"
          value="ingredient"
          onChange={ handleChange }
        />
        Ingrediente
      </label>
      <label htmlFor="food-name">
        <input
          data-testid="name-search-radio"
          id="food-name"
          type="radio"
          name="radioFilter"
          value="name"
          onChange={ handleChange }
        />
        Nome
      </label>
      <label htmlFor="food-first-letter">
        <input
          data-testid="first-letter-search-radio"
          id="food-first-letter"
          type="radio"
          name="radioFilter"
          value="firstLetter"
          onChange={ handleChange }
        />
        Primeira Letra
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => searchRecipes(searchInput, location.pathname) }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
