import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';

function DetalhesBebidas() {
  const { idRecipe } = useContext(Context);
  const [drink, setDrink] = useState([]);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`)
      .then((result) => result.json())
      .then((result) => setDrink(result.drinks[0]));
  }, [idRecipe]);

  console.log(drink.strDrinkThumb);
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
