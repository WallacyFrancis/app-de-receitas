import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExplorarComidasPorOrigem() {
  const [originFoods, setOriginFoods] = useState([]);
  // const [filterByArea, setFilterByArea] = useState([]);
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
  }, []);

  // function handleChange({ target: value }) {
  //   const filtered = value;

  //   setFilterByArea(name);
  // }

  return (
    <>
      <Header title="Explorar Origem" />
      <select
        name="area"
        data-testid="explore-by-area-dropdown"
      >
        { originFoods.map((food, index) => (
          <option
            key={ index }
            name={ food.strArea }
            value="originFood"
            data-testid={ `${food.strArea}-option` }
            // onChange={ handleChange(console.log('oi') }
          >
            { food.strArea }
          </option>
        )) }
      </select>
      <Footer />
    </>
  );
}

export default ExplorarComidasPorOrigem;
