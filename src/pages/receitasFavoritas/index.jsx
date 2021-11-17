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
        setFavorite(favoriteRecipes);
      }
    }
    requestFavorites();
  }, []);

  console.log(favorite);

  function renderRecipes() {
    return (
      favorite.map((recipe, index) => (
        <div key={ index }>
          <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
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

  console.log(recipes);

  function handleClick({ target }) {
    setBtnFilter(target.value);
    if (btnFilter === 'all') {
      setRecipes(favorite);
      console.log(recipes);
    }
    if (btnFilter === 'food') {
      const recipesFood = favorite.filter((recipe) => {
        return recipe.type === 'meal';
      });
      setRecipes(recipesFood);
    }
  }
  console.log(recipes);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        value="all"
        onClick={ (e) => handleClick(e) }
      >
        All
      </button>
      <button
        type="button"
        value="food"
        onClick={ (e) => handleClick(e) }
      >
        Food
      </button>
      <button
        type="button"
        value="drink"
        onClick={ (e) => handleClick(e) }
      >
        Drink
      </button>
      { renderRecipes() }
    </div>
  );
}

export default ReceitasFavoritas;
