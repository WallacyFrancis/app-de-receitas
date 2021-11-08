import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="search-input">
        Pesquisar
        <input type="text" data-testid="search-input" id="search-input" />
      </label>
    </div>
  );
}

export default SearchBar;
