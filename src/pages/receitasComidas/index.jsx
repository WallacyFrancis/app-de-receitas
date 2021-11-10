import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Context from '../../context/Context';
import { fetchCategoriesMeals, fetchRecipes } from '../../services/fetchAPI';

function ReceitasComidas() {
  const history = useHistory();
  const { redirect } = useContext(Context);
  const [btnName, setBtnName] = useState('');
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const getIdMeal = meals.map((meal) => meal.idMeal);
  const DOZE_PRIMEIRAS_COMIDAS = 12;

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => setMeals(response.meals));
  }, []);

  useEffect(() => {
    async function requestCategories() {
      const categoriesList = await fetchCategoriesMeals();
      setCategories(categoriesList);
    }
    requestCategories();
  }, []);

  if (meals.length === 0) {
    return <h4>Loading...</h4>;
  }

  async function handleClick({ target: { value } }) {
    if (btnName === value) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((response) => setMeals(response.meals));
    } else {
      setBtnName(value);
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
      const mealsRecipe = await fetchRecipes(URL);
      setMeals(mealsRecipe.meals);
    }
  }

  function renderFilters() {
    const FIVE_NUMBER = 5;
    const fiveCategories = (categories.slice(0, FIVE_NUMBER));
    return (
      fiveCategories.map((category, index) => (
        (
          <button
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            value={ category.strCategory }
            onClick={ handleClick }
          >
            { category.strCategory }
          </button>
        )
      ))
    );
  }

  return (
    <>
      <Header title="Comidas" />
      { categories !== undefined ? renderFilters() : '' }
      { redirect ? history.push(`/comidas/${getIdMeal}`) : (
        <div>
          {
            meals.map((meal, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ meal.strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt={ meal.strMeal }
                  width="200px"
                />
                <span data-testid={ `${index}-card-name` }>{ meal.strMeal }</span>
              </div>
            )).slice(0, DOZE_PRIMEIRAS_COMIDAS)
          }
        </div>
      ) }
      <Footer />
    </>
  );
}

export default ReceitasComidas;
