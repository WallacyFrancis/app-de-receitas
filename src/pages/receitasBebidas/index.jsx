import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Context from '../../context/Context';
import { fetchCategoriesDrinks, fetchRecipes } from '../../services/fetchAPI';

function ReceitasBebidas() {
  const history = useHistory();
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [btnName, setBtnName] = useState('');
  const { redirect, recipes, setRecipes, setIdRecipe } = useContext(Context);
  const getIdDrink = recipes.map((drink) => (drink.idDrink));
  const DOZE_PRIMEIRAS_BEBIDAS = 12;

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((result) => result.json())
      .then((result) => setDrinks(result.drinks));
  }, []);

  useEffect(() => {
    async function requestCategories() {
      const categoriesList = await fetchCategoriesDrinks();
      setCategories(categoriesList);
    }
    requestCategories();
  }, []);

  if (drinks.length === 0) {
    return <h4>Loading...</h4>;
  }

  async function handleClick({ target: { value } }) {
    setRecipes([]);
    if (btnName === value || value === 'all') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((result) => result.json())
        .then((result) => setDrinks(result.drinks));
    } else {
      setBtnName(value);
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`;
      const drinksRecipes = await fetchRecipes(URL);
      setDrinks(drinksRecipes.drinks);
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

  function renderDrinks() {
    if (recipes.length === 0) {
      return (
        drinks.map((drink, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => {
              history.push(`/bebidas/${drink.idDrink}`);
              setIdRecipe(drink.idDrink);
            } }
          >
            <img
              src={ drink.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ drink.strDrink }
              width="200px"
            />
            <span data-testid={ `${index}-card-name` }>{ drink.strDrink }</span>
          </button>
        )).slice(0, DOZE_PRIMEIRAS_BEBIDAS)
      );
    }
  }

  return (
    <>
      <Header title="Bebidas" />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClick }
        value="all"
      >
        All
      </button>
      { categories !== undefined ? renderFilters() : '' }
      { redirect ? history.push(`/bebidas/${getIdDrink}`) : (
        <div>
          {
            recipes.map((drink, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${index}-recipe-card` }
                onClick={ () => {
                  history.push(`/bebidas/${drink.idDrink}`);
                  setIdRecipe(drink.idDrink);
                } }
              >
                <img
                  src={ drink.strDrinkThumb }
                  data-testid={ `${index}-card-img` }
                  alt={ drink.strDrink }
                  width="200px"
                />
                <span data-testid={ `${index}-card-name` }>{ drink.strDrink }</span>
              </button>
            )).slice(0, DOZE_PRIMEIRAS_BEBIDAS)
          }
        </div>
      ) }
      { renderDrinks() }
      <Footer />
    </>
  );
}

export default ReceitasBebidas;
