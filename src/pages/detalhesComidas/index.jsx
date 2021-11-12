import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function DetalhesComidas() {
  const [meal, setMeal] = useState([]);
  const [drinksRecomendations, setDrinksRecomendations] = useState([]);
  const id = useHistory().location.pathname.split('/')[2];

  console.log(drinksRecomendations);

  useEffect(() => { // requisição meals pelo id
    async function getMealsById() {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      setMeal(meals[0]);
      console.log(meals);
    }
    getMealsById();
  }, [id]);

  useEffect(() => { // requisição de recomendações de bebidas
    async function getDrinksRecomendation() {
      const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setDrinksRecomendations(drinks);
    }
    getDrinksRecomendation();
  }, []);

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
