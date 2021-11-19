import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import RecomendationDrinksCard from '../../components/RecomendationDrinksCard';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import { saveLocalStorage } from '../../services/localStorageServices';

const copy = require('clipboard-copy');

function DetalhesComidas({ history }) {
  const [meal, setMeal] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const id = useHistory().location.pathname.split('/')[2];
  const [message, setMessage] = useState('');

  useEffect(() => { // requisição meals pelo id
    async function getMealsById() {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      setMeal(meals[0]);
    }
    getMealsById();
  }, [id]);

  function getIngredientsAndMeasures() {
    let ingredients = [];
    const NUMBER_OF_INGREDIENTS = 20;
    for (let index = 1; index <= NUMBER_OF_INGREDIENTS; index += 1) {
      const srtIngred = `strIngredient${index}`;
      const strMeasur = `strMeasure${index}`;
      const IngredAndMeasur = `${meal[srtIngred]} - ${meal[strMeasur]}`;
      ingredients = [...ingredients, IngredAndMeasur];
    }
    const finalRecipe = ingredients.filter((ingredient) => (
      ingredient !== ' -  '
      && ingredient !== ' - '
      && ingredient !== 'null - null'
      && ingredient !== 'undefined - undefined'
    ));
    return finalRecipe;
  }

  const ingredients = getIngredientsAndMeasures();

  function favoriteClick() {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
      const objMeal = {
        id: meal.idMeal,
        type: 'meal',
        area: meal.strArea,
        category: meal.strCategory,
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      };
      saveLocalStorage(objMeal);
    }
  }

  function handleShare() {
    setMessage('Link copiado!');
    return copy(`http://localhost:3000/comidas/${id}`);
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
        width="200px"
      />
      <h3 data-testid="recipe-title">{ meal.strMeal }</h3>
      <button type="button" data-testid="share-btn" onClick={ handleShare }>
        <img src={ shareIcon } alt="share" />
      </button>
      { message }
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => favoriteClick() }
      >
        {
          !isFavorite ? (<img src={ whiteHeartIcon } alt="Favorite" />)
            : (<img src={ blackHeartIcon } alt="Non favorite" />)
        }
      </button>
      <br />
      <span data-testid="recipe-category">{ meal.strCategory }</span>
      <br />
      <span data-testid="0-ingredient-name-and-measure">
        Ingredientes:
        <ul>
          { ingredients
            .map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
              </li>))}
        </ul>
      </span>
      <span data-testid="instructions">{ meal.strInstructions }</span>
      <br />
      <video data-testid="video" src={ meal.srtYoutube } controls width="400">
        <track kind="captions" />
        Seu navegador não suporta o elemento
      </video>
      <br />
      <p>
        Receitas Recomendadas
        <RecomendationDrinksCard />
      </p>
      <button
        className="button-start"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
      >
        Iniciar Receita
      </button>
    </div>
  );
}

DetalhesComidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default DetalhesComidas;
