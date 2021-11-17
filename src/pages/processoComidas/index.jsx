import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

function ProcessoComidas() {
  const [meal, setMeal] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const id = useHistory().location.pathname.split('/')[2];

  useEffect(() => { // requisição meals pelo id
    async function getMealsById() {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      setMeal(meals[0]);
      console.log(meals[0]);
    }
    getMealsById();
  }, [id]);

  // function getIngredientsAndMeasures() {
  //   let ingredients = [];
  //   const NUMBER_OF_INGREDIENTS = 20;
  //   for (let index = 1; index <= NUMBER_OF_INGREDIENTS; index += 1) {
  //     const srtIngred = `strIngredient${index}`;
  //     const strMeasur = `strMeasure${index}`;
  //     const IngredAndMeasur = `${meal[srtIngred]} - ${meal[strMeasur]}`;
  //     ingredients = [...ingredients, IngredAndMeasur];
  //   }
  //   const finalRecipe = ingredients.filter((ingredient) => (
  //     ingredient !== ' -  '
  //     && ingredient !== ' - '
  //     && ingredient !== 'null - null'
  //     && ingredient !== 'undefined - undefined'
  //   ));
  //   return finalRecipe;
  // }

  // const ingredients = getIngredientsAndMeasures();

  function favoriteClick() {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
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
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => favoriteClick() }
      >
        Favoritar
      </button>
      {
        isFavorite ? (<img src="../../images/whiteHeartIcon.svg" alt="Favorite" />)
          : (<img src="../../images/blackHeartIcon.svg" alt="Non favorite" />)
      }
      <br />
      <span data-testid="recipe-category">{ meal.strCategory }</span>
      <br />
      <span data-testid="0-ingredient-name-and-measure">
        Ingredientes:
        {/* { ingredients
          .map((ingredient, index) => (
            <label key={ index }>
              <input
               type="checkbox"
                data-testid={ `${index}-ingredient-name-and-measure` }
            />
              {ingredient}
            </label>))} */}
      </span>
      <span data-testid="instructions">{ meal.strInstructions }</span>
    </div>
  );
}

ProcessoComidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProcessoComidas;
