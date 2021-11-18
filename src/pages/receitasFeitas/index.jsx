import React, { useState } from 'react';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
// REQUISITOS 54, 55, 56 e 59
function ReceitasFeitas() {
  const [filter, setFilter] = useState('All');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  return (
    <section>
      <Header title="Receitas Feitas" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ ({ target }) => setFilter(target.innerHTML) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ ({ target }) => setFilter(target.innerHTML) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ ({ target }) => setFilter(target.innerHTML) }
        >
          Drinks
        </button>
      </div>
      <div>
        {doneRecipes
          .filter(({ type }) => {
            if (filter === 'All') return true;
            if (filter === 'Food' && type === 'comida') return true;
            return (filter === 'Drinks' && type === 'bebida');
          })
          .map(
            (recipe, index) => (
              <RecipeCard key={ index } recipe={ recipe } index={ index } />),
          )}
      </div>
    </section>
  );
}

export default ReceitasFeitas;
