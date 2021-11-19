import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Context from '../../context/Context';
import { fetchRecipes } from '../../services/fetchAPI';

function ExplorarComidasPorOrigem() {
  const [originFoods, setOriginFoods] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('American');
  const { recipes, setRecipes } = useContext(Context);
  const MAX_CARDS = 12;

  async function renderNoFiltersMeals() {
    const result = await fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setRecipes(result.meals);
  }

  useEffect(() => {
    async function fetchAPIOrigin() {
      const getArea = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const resultArea = await getArea.json();
      const foodsByOrigin = resultArea.meals;
      setOriginFoods(foodsByOrigin);
    }
    fetchAPIOrigin();
  }, []);

  useEffect(() => {
    if (selectedFilter === 'All') {
      renderNoFiltersMeals();
    }

    async function renderFilter() {
      const filter = await fetchRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedFilter}`);
      setRecipes(filter.meals);
    }

    if (selectedFilter !== 'All') {
      renderFilter();
    }
  }, [selectedFilter]);

  function handleChange({ target: { value } }) {
    setSelectedFilter(value);
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

      { recipes.slice(0, MAX_CARDS).map((recipe, index) => (
        <Link key={ index } to={ `/comidas/${recipe.idMeal}` }>
          <div data-testid={ `${index}-recipe-card` }>
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
