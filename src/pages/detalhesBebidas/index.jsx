import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import RecomendationMealsCard from '../../components/RecomendationMealCard';

function DetalhesBebidas({ history }) {
  const [drink, setDrink] = useState([]);
  const id = useHistory().location.pathname.split('/')[2];

  useEffect(() => { // requisição drinks pelo id
    async function getDrinksById() {
      const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      setDrink(drinks[0]);
    }
    getDrinksById();
  }, [id]);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
        width="200px"
      />
      <h3 data-testid="recipe-title">{ drink.strDrink }</h3>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <span data-testid="recipe-category">{ drink.strAlcoholic }</span>
      <span data-testid="0-ingredient-name-and-measure">
        Ingredientes:
        <ul>
          { }
        </ul>
      </span>
      <span data-testid="instructions">{ drink.strInstructions }</span>
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
