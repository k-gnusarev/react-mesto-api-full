import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  console.log('-------------');
  console.log('currentUser');
  console.log(currentUser._id);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;
  console.log('props.card.owner');
  console.log(props.card.owner);
  console.log('is own?');
  console.log(isOwn);

  // классы для кнопки удаления

  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`
  ); 

  // классы для кнопки лайка

  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  );

  function cardClick() {
    props.onCardClick(props.card);
  }

  function cardLike() {
    props.onCardLike(props.card);
  }

  function cardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="card">
      <img className="card__photo" alt={`На фото: ${props.card.name}`} src={props.card.link} onClick={cardClick} />
      <div className="card__menu">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button type="button" className={`button ${cardLikeButtonClassName}`} onClick={cardLike}></button>
          <p className="card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button className={`button ${cardDeleteButtonClassName}`} onClick={cardDelete}></button>
    </div>
  );
}

export default Card;