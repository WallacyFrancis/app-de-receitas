import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Context from '../../context/Context';
import { fetchRecipes } from '../../services/fetchAPI';

function ExplorarComidasPorOrigem() {
  const [originFoods, setOriginFoods] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('American');
  const [noFilter, setNoFilter] = useState('All');
  const { recipes, setRecipes } = useContext(Context);
  const MAX_CARDS = 12;

  useEffect(() => {
    async function fetchAPIOrigin() {
      const getArea = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const resultArea = await getArea.json();
      let foodsByOrigin = resultArea.meals;

      if (foodsByOrigin.length > MAX_CARDS) {
        foodsByOrigin = foodsByOrigin.splice(0, MAX_CARDS);
      }
      setOriginFoods(foodsByOrigin);
    }
    fetchAPIOrigin();
  }, [setRecipes]);

  useEffect(() => {
    async function renderFilter() {
      const filter = await fetchRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedFilter}`);
      setRecipes(filter.meals);
    }
    renderFilter();
  }, [selectedFilter, setRecipes]);

  useEffect(() => {
    async function renderAll() {
      const noFilters = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const responseNoFilters = await noFilters.json();
      setNoFilter(responseNoFilters);
    }
    renderAll();
  }, [setNoFilter]);

  function handleChange({ target: { value } }) {
    setSelectedFilter(value);
    if (value === 'All') {
      // renderAll();
      console.log(noFilter);
    }
  }

  return (
    <>
      <Header title="Explorar Origem" />

      <select
        name="area"
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => handleChange(e) }
      >
        <option value="All" data-testid="All-option">All</option>
        { originFoods.map((food, index) => (
          <option
            key={ index }
            value={ food.strArea }
            data-testid={ `${food.strArea}-option` }
          >
            { food.strArea }
          </option>
        )) }
      </select>

      { recipes.map((recipe, index) => (
        <Link key={ index } to={ `/comidas/${recipe.strArea}` }>
          <div data-testid={ `${index}-ingredient-card` }>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeat }
              data-testid={ `${index}-card-img` }
            />
            <h4 data-testid={ `${index}-card-name` }>
              { recipe.strMeal }
            </h4>
          </div>
        </Link>
      )) }
      <Footer />
    </>
  );
}

export default ExplorarComidasPorOrigem;
