import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Context from '../../context/Context';

function ReceitasComidas() {
  const history = useHistory();
  const { recipes, redirect } = useContext(Context);
  const getIdMeal = recipes.map((meal) => meal.idMeal);
  const DOZE_PRIMEIRAS_COMIDAS = 12;

  return (
    <>
      <Header title="Comidas" />
      { redirect ? history.push(`/comidas/${getIdMeal}`) : (
        <div>
          {
            recipes.map((meal, index) => (
              (index < DOZE_PRIMEIRAS_COMIDAS) && (
                <div key={ index }>
                  <div data-testid={ `${index}-recipe-card` }>
                    <img
                      src={ meal.strMealThumb }
                      data-testid={ `${index}-card-img` }
                      alt={ meal.strMeal }
                    />
                  </div>
                  <span data-testid={ `${index}-card-name` }>{ meal.strMeal }</span>
                </div>
              )
            ))
          }
        </div>
      ) }
      <Footer />
    </>
  );
}

export default ReceitasComidas;
