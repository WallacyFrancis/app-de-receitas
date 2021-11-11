import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';

function DetalhesComidas() {
  const { idRecipe } = useContext(Context);
  const [meal, setMeal] = useState('');

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`)
      .then((result) => result.json())
      .then((result) => setMeal(result));
  }, [idRecipe]);

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
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <span data-testid="recipe-category">{ meal.strCategory }</span>
      <span data-testid="0-ingredient-name-and-measure">
        Ingredientes
        <ul>
          { }
        </ul>
      </span>
      <span data-testid="instructions">{ meal.strInstructions }</span>
      <video data-testid="video" src={ meal.srtYoutube }>
        <track default kind="captions" src="" />
      </video>
      <span data-testid="0-recomendation-card">
        Receitas Recomendadas
      </span>
      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </div>
  );
}

export default DetalhesComidas;
