/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function ReceitasFavoritas() {
  const [favorite, setFavorite] = useState([]);
  const [btnFilter, setBtnFilter] = useState('all');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    function requestFavorites() {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes.length > 0) {
        setRecipes(favoriteRecipes);
      }
    }
    requestFavorites();
  }, []);

  useEffect(() => {
    if (btnFilter === 'all') {
      setFavorite([]);
    }
    if (btnFilter === 'food') {
      const recipesFood = recipes.filter((recipe) => recipe.type === 'meal');
      setFavorite(recipesFood);
    }
    if (btnFilter === 'drink') {
      const recipesDrink = recipes.filter((recipe) => recipe.type === 'drink');
      setFavorite(recipesDrink);
    }
  }, [btnFilter]);

  function renderRecipes() {
    const arrFavorites = [];
    if (favorite.length === 0) {
      arrFavorites.push(...recipes);
    } else {
      arrFavorites.push(...favorite);
    }
    console.log(arrFavorites);
    return (
      arrFavorites.map((recipe, index) => (
        <div key={ index }>
          <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
          { recipe.area !== ''
          && (<p data-testid={ `${index}-horizontal-top-text` }>{recipe.area}</p>) }
          { recipe.alcoholicOrNot !== ''
            && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </p>
            ) }
          <img
            src={ recipe.image }
            alt={ recipe.name }
            width="200px"
            data-testid={ `${index}-horizontal-image` }
          />
          <br />
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ shareIcon } alt={ `Share ${recipe.name}` } />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ blackHeartIcon } alt={ `Non-favorite ${recipe.name}` } />
          </button>
        </div>
      ))
    );
  }

  function handleClick({ target }) {
    setBtnFilter(target.value);
  }

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        value="all"
        data-testid="filter-by-all-btn"
        onClick={ (e) => handleClick(e) }
      >
        All
      </button>
      <button
        type="button"
        value="food"
        data-testid="filter-by-food-btn"
        onClick={ (e) => handleClick(e) }
      >
        Food
      </button>
      <button
        type="button"
        value="drink"
        data-testid="filter-by-drink-btn"
        onClick={ (e) => handleClick(e) }
      >
        Drink
      </button>
      { renderRecipes() }
    </div>
  );
}

export default ReceitasFavoritas;
