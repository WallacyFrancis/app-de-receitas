import React, { useState, useEffect, useHistory } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  // Funcao retirada de : * Link: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  const validateEmail = (text) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(text);
  };

  const validatePassword = (pass) => {
    const LIMIT_CHARACTER = 6;
    return pass.length > LIMIT_CHARACTER;
  };

  useEffect(() => {
    const validation = validateEmail(email) && validatePassword(password);
    if (validation) setDisabled(false);
    else setDisabled(true);
  }, [email, password]);

  const handleChange = ({ target: { name, value } }) => (
    name === 'email' ? setEmail(value) : setPassword(value)
  );

  const handleClick = () => {
    const user = {
      email,
    };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/comidas');
  };

  return (
    <main>
      <label htmlFor="email">
        Email:
        <input
          value={ email }
          name="email"
          id="email"
          data-testid="email-input"
          onChange={ handleChange }
          type="email"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          value={ password }
          name="password"
          id="password"
          data-testid="password-input"
          type="password"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </main>
  );
}

export default Login;
