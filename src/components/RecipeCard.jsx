import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
// REQUISITOS 54, 55, 56 e 59
const copy = require('clipboard-copy');

function RecipeCard({ recipe, index }) {
  const [message, setMessage] = useState('');
  const {
    id, type, alcoholicOrNot, area, category, name, image, doneDate, tags,
  } = recipe;

  function handleShare() {
    setMessage('Link copiado!');
    return (
      copy(type === 'comida'
        ? `http://localhost:3000/comidas/${id}`
        : `http://localhost:3000/bebidas/${id}`)
    );
  }

  return (
    <section>
      <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ `Foto ${name}` }
        />
      </Link>
      <h5
        data-testid={ `${index}-horizontal-top-text` }
      >
        { type === 'bebida' && alcoholicOrNot }
        { type === 'comida' && `${area} - ${category}` }
      </h5>
      <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
        <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
      </Link>
      <p>
        { 'Feita em: ' }
        <span data-testid={ `${index}-horizontal-done-date` }>
          { doneDate }
        </span>
      </p>
      <button type="button" onClick={ handleShare }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Compartilhar"
        />
      </button>
      { message }
      { type === 'comida' && (
        <div>
          {tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>
          ))}
        </div>) }
    </section>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
