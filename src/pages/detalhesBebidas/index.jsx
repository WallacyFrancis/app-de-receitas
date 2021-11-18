import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import RecomendationMealsCard from '../../components/RecomendationMealCard';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import { saveLocalStorage } from '../../services/localStorageServices';

const copy = require('clipboard-copy');

function DetalhesBebidas({ history }) {
  const [drink, setDrink] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const id = useHistory().location.pathname.split('/')[2];
  const [message, setMessage] = useState('');

  useEffect(() => { // requisição drinks pelo id
    async function getDrinksById() {
      const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      setDrink(drinks[0]);
    }
    getDrinksById();
  }, [id]);

  function getIngredientsAndMeasures() {
    let ingredients = [];
    const NUMBER_OF_INGREDIENTS = 20;
    for (let index = 1; index <= NUMBER_OF_INGREDIENTS; index += 1) {
      const srtIngred = `strIngredient${index}`;
      const strMeasur = `strMeasure${index}`;
      const IngredAndMeasur = `${drink[srtIngred]} - ${drink[strMeasur]}`;
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
      const objDrink = {
        id: drink.idDrink,
        type: 'drink',
        area: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      };
      saveLocalStorage(objDrink);
    }
  }

  function handleShare() {
    setMessage('Link copiado!');
    return copy(`http://localhost:3000/bebidas/${id}`);
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
        width="200px"
      />
      <h3 data-testid="recipe-title">{ drink.strDrink }</h3>
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
      <span data-testid="recipe-category">{ drink.strAlcoholic }</span>
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
      <span data-testid="instructions">{ drink.strInstructions }</span>
      <br />
      <video data-testid="video" src={ drink.srtYoutube } controls width="400">
        <track kind="captions" />
        Seu navegador não suporta o elemento
      </video>
      <br />
      <p>
        Receitas Recomendadas
        <RecomendationMealsCard />
      </p>
      <button
        className="button-start"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
      >
        Iniciar Receita
      </button>
    </div>
  );
}

DetalhesBebidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default DetalhesBebidas;
