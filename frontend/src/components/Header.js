import React from 'react';
import { Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="Логотип Mesto Russia" />
      <div className="header__container">
        <Route exact path="/">
          <p className="header__text">{props.email}</p>
          <Link
            className="header__link header__link_type_signout"
            to=""
            onClick={props.onLogout}
          >Выйти</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
      </div>
    </header>
  );
};

export default Header;