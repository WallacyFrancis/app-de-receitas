import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExplorarComidasPorIngredientes() {
  const [meals, setMeals] = useState([]);
  const NUMBER_MAX = 12;

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        .then((data) => data.json());
      let mealsList = response.meals;
      if (mealsList.length > NUMBER_MAX) mealsList = mealsList.splice(0, NUMBER_MAX);
      setMeals(mealsList);
    }
    fetchAPI();
  }, []);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      {meals.map((meal, index) => (
        <Link key={ index } to={ `/comidas/${meal.strIngredient}` }>
          <div data-testid={ `${index}-ingredient-card` }>
            <img
              src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
              alt={ meal.strIngredient }
              data-testid={ `${index}-card-img` }
            />
            <h4 data-testid={ `${index}-card-name` }>{meal.strIngredient}</h4>
          </div>
        </Link>
      ))}
      <Footer />
    </>
  );
}

export default ExplorarComidasPorIngredientes;
