import React from 'react';
import avatarButton from '../images/Edit-Avatar-Icon.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  // ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ

  const currentUser = React.useContext(CurrentUserContext);

  return ( 
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-section" onClick={props.onUpdateAvatar}>
          <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
          <img src={avatarButton} alt="Поставить другой аватар" className="profile__avatar-button" />
        </div>
        <div className="profile__description">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="button profile__edit-button" onClick={props.onEditProfile}></button>
          </div>       
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="button profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="content">
        {
          props.cards.map(card => (
              <Card
                card={card}
                onCardClick={props.onCardClick}
                key={card._id}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))
        }
      </section>
    </main>
  );
}

export default Main;