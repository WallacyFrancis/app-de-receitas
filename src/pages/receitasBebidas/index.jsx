import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Context from '../../context/Context';

function ReceitasBebidas() {
  const history = useHistory();
  const { recipes, redirect } = useContext(Context);
  const getIdDrink = recipes.map((drink) => (drink.idDrink));
  const DOZE_PRIMEIRAS_BEBIDAS = 12;

  return (
    <>
      <Header title="Bebidas" />
      { redirect ? history.push(`/bebidas/${getIdDrink}`) : (
        <div>
          {
            recipes.map((drink, index) => (
              (index < DOZE_PRIMEIRAS_BEBIDAS) && (
                <div key={ index }>
                  <div data-testid={ `${index}-recipe-card` }>
                    <img
                      src={ drink.strDrinkThumb }
                      data-testid={ `${index}-card-img` }
                      alt={ drink.strDrink }
                    />
                  </div>
                  <span data-testid={ `${index}-card-name` }>{ drink.strDrink }</span>
                </div>)
            ))
          }
        </div>
      ) }
      <Footer />
    </>
  );
}

export default ReceitasBebidas;
