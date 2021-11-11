import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Context from '../../context/Context';
import { fetchCategoriesMeals, fetchRecipes } from '../../services/fetchAPI';

function ReceitasComidas() {
  const history = useHistory();
  const { redirect, recipes, setRecipes } = useContext(Context);
  const [btnName, setBtnName] = useState('');
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const getIdMeal = recipes.map((meal) => meal.idMeal);
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
    setRecipes([]);
    if (btnName === value || value === 'all') {
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
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            value={ category.strCategory }
            onClick={ handleClick }
          >
            { category.strCategory }
          </button>
        )
      ))
    );
  }

  function renderMeals() {
    if (recipes.length === 0) {
      return (
        meals.map((meal, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/comidas/${meal.idMeal}`) }
          >
            <img
              src={ meal.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ meal.strMeal }
              width="200px"
            />
            <span data-testid={ `${index}-card-name` }>{ meal.strMeal }</span>
          </button>
        )).slice(0, DOZE_PRIMEIRAS_COMIDAS)
      );
    }
  }
  console.log(recipes);
  console.log(meals);
  return (
    <>
      <Header title="Comidas" />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClick }
        value="all"
      >
        All
      </button>
      { categories !== undefined ? renderFilters() : '' }
      { redirect ? history.push(`/comidas/${getIdMeal}`) : (
        <div>
          {
            recipes.map((meal, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${index}-recipe-card` }
                onClick={ () => history.push(`/comidas/${meal.idMeal}`) }
              >
                <img
                  src={ meal.strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt={ meal.strMeal }
                  width="200px"
                />
                <span data-testid={ `${index}-card-name` }>{ meal.strMeal }</span>
              </button>
            )).slice(0, DOZE_PRIMEIRAS_COMIDAS)
          }
        </div>
      ) }
      { renderMeals() }
      <Footer />
    </>
  );
}

export default ReceitasComidas;
