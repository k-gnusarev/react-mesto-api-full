import React from 'react';

function Login(props) {
  // управление полями ввода

  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  function handleEmailChange(evt) {
    setEmailValue(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPasswordValue(evt.target.value);
  }

  // передача учётных данных

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(emailValue, passwordValue)
  }  

  return (
    <section className="start-section">
      <h1 className="start-section__heading">Вход</h1>
      <form className="start-section__form" onSubmit={handleSubmit}>
        <input
          className="start-section__input"
          name="loginEmail"
          type="email"
          placeholder="Email"
          id="login-email"
          required
          onChange={handleEmailChange}
          value={emailValue}></input>
        <input
          className="start-section__input"
          name="loginPassword"
          type="password"
          placeholder="Пароль"
          id="login-password"
          required
          onChange={handlePasswordChange}
          value={passwordValue}></input>
        <button className="button button_style_white">Войти</button>
      </form>
    </section>
  );
}

export default Login;