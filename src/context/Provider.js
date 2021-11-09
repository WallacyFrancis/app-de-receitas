import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';

import {
  fetchMealsName,
  fetchMealsIngredient,
  fetchMealsFirstLetter,
  fetchDrinksName,
  fetchDrinksIngredient,
  fetchDrinksFirstLetter,
} from '../services/fetchAPI';

function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [redirect, setRedirect] useState
  const history = useHistory();

  function showAlert(recipesResult) {
    if (recipesResult === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      setRecipes(recipesResult);
    }
  }

  async function searchMeals(searchInputText, radioFilter) {
    let recipesResult = [];
    if (radioFilter === 'ingredient') {
      recipesResult = await fetchMealsIngredient(searchInputText);
      console.log(recipesResult);
      showAlert(recipesResult);
    }
    if (radioFilter === 'name') {
      recipesResult = await fetchMealsName(searchInputText);
      console.log(recipesResult);
      showAlert(recipesResult);
    }
    if (radioFilter === 'firstLetter') {
      if (searchInputText.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      recipesResult = await fetchMealsFirstLetter(searchInputText);
      console.log(recipesResult);
      showAlert(recipesResult);
    }
    if (recipesResult !== null && recipesResult.length === 1) {
      const id = recipesResult[0].idMeal;
      // history.push(`/comidas/${id}`);
      return (<Redirect to={ `/comidas/${id}` } />);
      // console.log(recipesResult);
      // console.log(id);
      // Arrabiata
    }
  }

  async function searchDrinks(searchInputText, radioFilter) {
    let recipesResult = [];
    if (radioFilter === 'ingredient') {
      recipesResult = await fetchDrinksIngredient(searchInputText);
      console.log(recipesResult);
      showAlert(recipesResult);
    }
    if (radioFilter === 'name') {
      recipesResult = await fetchDrinksName(searchInputText);
      console.log(recipesResult);
      showAlert(recipesResult);
    }
    if (radioFilter === 'firstLetter') {
      if (searchInputText.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      recipesResult = await fetchDrinksFirstLetter(searchInputText);
      console.log(recipesResult);
      showAlert(recipesResult);
    }
    if (recipesResult !== null && recipesResult.length === 1) {
      const { idDrink } = recipesResult;
      history.push(`/bebidas/${idDrink}`);
    }
  }

  function searchRecipes(inputs, pathname) {
    const { searchInputText, radioFilter } = inputs;
    if (pathname.includes('comidas')) {
      searchMeals(searchInputText, radioFilter);
    }
    if (pathname.includes('bebidas')) {
      searchDrinks(searchInputText, radioFilter);
    }
  }

  const contextValue = {
    recipes,
    searchRecipes,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
