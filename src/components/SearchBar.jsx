import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="search-input">
        Pesquisar
        <input type="text" data-testid="search-input" id="search-input" />
      </label>
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          id="ingredient"
          type="radio"
        />
        Ingrediente
      </label>
      <label htmlFor="food-name">
        <input
          data-testid="name-search-radio"
          id="food-name"
          type="radio"
        />
        Nome
      </label>
      <label htmlFor="food-first-letter">
        <input
          data-testid="first-letter-search-radio"
          id="food-first-letter"
          type="radio"
        />
        Primeira Letra
      </label>
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </div>
  );
}

export default SearchBar;
