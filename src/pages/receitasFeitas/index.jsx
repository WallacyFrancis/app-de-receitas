import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
// REQUISITOS 54, 55, 56 e 59
function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filterDoneRecipes, setFilterDoneRecipes] = useState('');

  localStorage.setItem('doneRecipes', JSON.stringify([]));
  
  function getDoneRecipesByLocalStorage() {
    return JSON.parse(localStorage.getItem('doneRecipes'));
  }

  useEffect(() => {
    setDoneRecipes(getDoneRecipesByLocalStorage());
  }, []);

  function getFilterDoneRecipes(recipes) {
    return (
      recipes
        .filter((recipe) => (
          filterDoneRecipes !== '' ? recipe.type === filterDoneRecipes : recipe))
    );
  }

  return (
    <section>
      <Header title="Receitas Feitas" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterDoneRecipes('') }
          value="all"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilterDoneRecipes('comida') }
          value="comida"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterDoneRecipes('bebida') }
          value="bebida"
        >
          Drinks
        </button>
      </div>
      <div>
        { doneRecipes !== 0
          && getFilterDoneRecipes(doneRecipes)
            .map(
              (recipe, index) => (
                <RecipeCard key={ index } recipe={ recipe } index={ index } />),
            )}
      </div>
    </section>
  );
}

export default ReceitasFeitas;
