import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// requisito 37
function RecomendationMealsCard() {
  const [mealsRecomendations, setMealsRecomendations] = useState([]);
  const NUMBER_MAX_MEALS = 6;

  useEffect(() => { // requisição de recomendações de comidas
    async function getMealsRecomendation() {
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setMealsRecomendations(meals);
    }
    getMealsRecomendation();
  }, []);

  return (
    <section className="carousel">
      { mealsRecomendations && mealsRecomendations
        .map((meal, index) => {
          if (index < NUMBER_MAX_MEALS) {
            return (
              <Link
                className="recipe-card"
                data-testid={ `${index}-recomendation-card` }
                to={ `/comidas/${meal.idMeal}` }
                key={ index }
              >
                <img
                  className="card-img"
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
                <p className="card-category">{ meal.strCategory }</p>
                <p
                  className="card-title"
                  data-testid={ `${index}-recomendation-title` }
                >
                  {meal.strMeal}
                </p>
              </Link>
            );
          }
          return '';
        })}
    </section>
  );
}

export default RecomendationMealsCard;
