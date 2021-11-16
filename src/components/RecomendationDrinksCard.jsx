import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// requisito 37
function RecomendationDrinksCard() {
  const [drinksRecomendations, setDrinksRecomendations] = useState([]);
  const NUMBER_MAX_DRINKS = 6;

  useEffect(() => { // requisição de recomendações de bebidas
    async function getDrinksRecomendation() {
      const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setDrinksRecomendations(drinks);
    }
    getDrinksRecomendation();
  }, []);

  return (
    <section className="carousel">
      { drinksRecomendations && drinksRecomendations
        .map((drink, index) => {
          if (index < NUMBER_MAX_DRINKS) {
            return (
              <Link
                className="recipe-card"
                data-testid={ `${index}-recomendation-card` }
                to={ `/bebidas/${drink.idDrink}` }
                key={ index }
              >
                <img
                  className="card-img"
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <p className="card-category">{ drink.strCategory }</p>
                <p
                  className="card-title"
                  data-testid={ `${index}-recomendation-title` }
                >
                  {drink.strDrink}
                </p>
              </Link>
            );
          }
          return '';
        })}
    </section>
  );
}

export default RecomendationDrinksCard;
