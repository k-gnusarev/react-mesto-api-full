import React from 'react';

function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isActive ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <button type="button" className="button popup__close-button" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={props.name} onSubmit={props.handleSubmit} noValidate>
          {props.children}
          <button type="submit" className="button popup__submit-button">{props.buttonCaption}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;