import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer-container">
      <Link
        type="submit"
        src={ drinkIcon }
        to="/bebidas"
        data-testid="drinks-bottom-btn"
      >
        <img
          src={ drinkIcon }
          alt="drink-icon"
        />
      </Link>
      <Link
        type="submit"
        src={ exploreIcon }
        to="/explorar"
        data-testid="explore-bottom-btn"
      >
        <img
          src={ exploreIcon }
          alt="explore-icon"
        />
      </Link>
      <Link
        type="submit"
        src={ mealIcon }
        to="/comidas"
        data-testid="food-bottom-btn"
      >
        <img
          src={ mealIcon }
          alt="meal-icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
