import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { removeLocalStorage } from '../../services/localStorageServices';

const copy = require('clipboard-copy');

function ReceitasFavoritas() {
  const [favorite, setFavorite] = useState([]);
  const [btnFilter, setBtnFilter] = useState('all');
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  useEffect(() => {
    if (btnFilter === 'all') {
      setFavorite([]);
    }
    if (btnFilter === 'food') {
      const recipesFood = recipes.filter((recipe) => recipe.type === 'comida');
      setFavorite(recipesFood);
    }
    if (btnFilter === 'drink') {
      const recipesDrink = recipes.filter((recipe) => recipe.type === 'bebida');
      setFavorite(recipesDrink);
    }
  }, [recipes, btnFilter]);

  function handleShare(item) {
    setMessage('Link copiado!');
    if (item.type === 'comida') {
      return copy(`http://localhost:3000/comidas/${item.id}`);
    }
    if (item.type === 'bebida') {
      return copy(`http://localhost:3000/bebidas/${item.id}`);
    }
  }

  function route(item) {
    if (item.type === 'comida') {
      return `/comidas/${item.id}`;
    }
    if (item.type === 'bebida') {
      return `/bebidas/${item.id}`;
    }
  }

  function renderRecipes() {
    const arrFavorites = [];

    if (favorite.length === 0) {
      arrFavorites.push(...recipes);
    } else {
      arrFavorites.push(...favorite);
    }

    function removeItem(element) {
      const father = document.getElementById('recipe-favorite');
      const childElement = document.getElementById(element.name);

      father.removeChild(childElement);
      removeLocalStorage(element);
    }

    return (
      arrFavorites.map((recipe, index) => (
        <div key={ index } id={ `${recipe.name}` }>
          <Link to={ route(recipe) }>
            <h3 data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </h3>
            { recipe.area !== ''
            && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.area} - ${recipe.category}` }
              </p>
            ) }
            { recipe.alcoholicOrNot !== ''
              && (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${recipe.alcoholicOrNot} - ${recipe.category}` }
                </p>
              ) }
            <img
              src={ recipe.image }
              alt={ recipe.name }
              width="200px"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <br />
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src="shareIcon"
            onClick={ () => handleShare(recipe) }
          >
            <img src={ shareIcon } alt={ `Share ${recipe.name}` } />
          </button>
          { message }
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => removeItem(recipe) }
            src="blackHeartIcon"
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
    <div id="recipe-favorite">
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
