import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
<<<<<<< HEAD
import { express } from 'axios';
=======
import PropTypes from 'prop-types';
import RecomendationDrinksCard from '../../components/RecomendationDrinksCard';
>>>>>>> ed024b1e2895cbcf373103c8eeb4a79c65bbe8aa

function DetalhesComidas({ history }) {
  const [meal, setMeal] = useState([]);
  const id = useHistory().location.pathname.split('/')[2];

<<<<<<< HEAD
  const app = express();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });

  // console.log(drinksRecomendations);

=======
>>>>>>> ed024b1e2895cbcf373103c8eeb4a79c65bbe8aa
  useEffect(() => { // requisição meals pelo id
    async function getMealsById() {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json());
      setMeal(meals[0]);
    }
    getMealsById();
  }, [id]);

<<<<<<< HEAD
  useEffect(() => { // requisição de recomendações de bebidas
    async function getDrinksRecomendation() {
      const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setDrinksRecomendations(drinks);
      console.log(drinksRecomendations);
    }
    getDrinksRecomendation();
  }, []);

=======
>>>>>>> ed024b1e2895cbcf373103c8eeb4a79c65bbe8aa
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
      <br />
      <video controls src={ meal.strYoutube }>
        <track default kind="captions" />
      </video>
      <br />
      <span data-testid="recipe-category">{ meal.strCategory }</span>
      <br />
      <span data-testid="0-ingredient-name-and-measure">
        Ingredientes
        <ul>
          { }
        </ul>
      </span>
      <span data-testid="instructions">{ meal.strInstructions }</span>
<<<<<<< HEAD
      <video data-testid="video" src={ meal.strYoutube }>
        <track default kind="captions" src="" />
=======
      <video data-testid="video" src={ meal.srtYoutube } controls width="400">
        <track kind="captions" />
        Seu navegador não suporta o elemento
>>>>>>> ed024b1e2895cbcf373103c8eeb4a79c65bbe8aa
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
