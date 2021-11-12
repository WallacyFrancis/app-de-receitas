import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function DetalhesBebidas() {
  const [drink, setDrink] = useState([]);
  const [mealsRecomendations, setMealsRecomendations] = useState([]);
  const id = useHistory().location.pathname.split('/')[2];

  console.log(mealsRecomendations);

  useEffect(() => { // requisição drinks pelo id
    async function getDrinksById() {
      const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      setDrink(drinks[0]);
      console.log(drinks);
    }
    getDrinksById();
  }, [id]);

  useEffect(() => { // requisição de recomendações de comidas
    async function getMealsRecomendation() {
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setMealsRecomendations(meals);
    }
    getMealsRecomendation();
  }, []);

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
        Ingredientes
        <ul>
          { }
        </ul>
      </span>
      <span data-testid="instructions">{ drink.strInstructions }</span>
      <video data-testid="video" src={ drink.srtYoutube }>
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

export default DetalhesBebidas;
