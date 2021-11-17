import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExplorarBebidasPorIngredientes() {
  const [drinks, setDrinks] = useState([]);
  const NUMBER_MAX = 12;

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then((data) => data.json());
      let drinksList = response.drinks;
      if (drinksList.length > NUMBER_MAX) drinksList = drinksList.splice(0, NUMBER_MAX);
      setDrinks(drinksList);
    }
    fetchAPI();
  }, []);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      {drinks.map((drink, index) => (
        <Link key={ index } to={ `/bebidas/${drink.strIngredient1}` }>
          <div data-testid={ `${index}-ingredient-card` }>
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
              alt={ drink.strIngredient1 }
              data-testid={ `${index}-card-img` }
            />
            <h4 data-testid={ `${index}-card-name` }>{ drink.strIngredient1 }</h4>
          </div>
        </Link>
      ))}
      <Footer />
    </>
  );
}

export default ExplorarBebidasPorIngredientes;
