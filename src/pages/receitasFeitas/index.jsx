import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';

// REQUISITOS 54 ao 59
function ReceitasFeitas({ history }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [message, setMessage] = useState(false);
  const [food, setFood] = useState(false);
  const [drink, setDrink] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }, [doneRecipes]);

  return (
    <section>
      <Header title="Receitas Feitas" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => { setFood(false); setDrink(false); } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => { setFood(true); setDrink(false); } }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => { setFood(false); setDrink(true); } }
        >
          Drinks
        </button>
      </div>
      <main>
        {
          doneRecipes.filter(({ type }) => {
            if (food === true) return type === 'comida';
            if (drink === true) return type === 'bebida';
            return doneRecipes;
          }).map((item, index) => {
            if (item.type === 'comida') {
              return (
                <div key={ item.id }>
                  <img
                    src={ item.image }
                    alt={ item.name }
                    data-testid={ `${index}-horizontal-image` }
                    role="presentation"
                    onClick={ () => history.push(`/comidas/${item.id}`) }
                    width="75%"
                  />
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${item.area} - ${item.category}` }
                  </p>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    role="presentation"
                    onClick={ () => history.push(`/comidas/${item.id}`) }
                  >
                    { item.name }
                  </p>
                  <p>
                    { 'Feita em: ' }
                    <span data-testid={ `${index}-horizontal-done-date` }>
                      { item.doneDate }
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={ () => {
                      navigator.clipboard.writeText(`http://localhost:3000/comidas/${item.id}`);
                      setMessage(true);
                    } }
                  >
                    <img
                      src={ shareIcon }
                      alt="Share Icon"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                  { message && <p>Link copiado!</p>}
                  { item.type === 'comida' && (
                    <div>
                      {item.tags.map((tag) => (
                        <span
                          key={ tag }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          { tag }
                        </span>
                      ))}
                    </div>) }
                </div>
              );
            } return (
              <div key={ item.id }>
                <img
                  src={ item.image }
                  alt={ item.name }
                  data-testid={ `${index}-horizontal-image` }
                  role="presentation"
                  onClick={ () => history.push(`/bebidas/${item.id}`) }
                  width="75%"
                />
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {item.alcoholicOrNot}
                </p>
                <p
                  data-testid={ `${index}-horizontal-name` }
                  role="presentation"
                  onClick={ () => history.push(`/bebidas/${item.id}`) }
                >
                  { item.name }
                </p>
                <p>
                  { 'Feita em: ' }
                  <span data-testid={ `${index}-horizontal-done-date` }>
                    { item.doneDate }
                  </span>
                </p>
                <button
                  type="button"
                  onClick={ () => {
                    navigator.clipboard.writeText(`http://localhost:3000/comidas/${item.id}`);
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt="Share Icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
              </div>
            );
          })
        }
      </main>
    </section>
  );
}

ReceitasFeitas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ReceitasFeitas;
