import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

    function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isActive={props.isActive}
      onClose={props.onClose}
      title="Редактировать профиль"
      name="edit"
      buttonCaption="Сохранить"
      handleSubmit={handleSubmit}
    >
      <section className="popup__section">
        <input
          type="text"
          name="title"
          className="popup__input"
          id="edit-title"
          placeholder="Имя профиля"
          required
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          value={name} />
        <span className="popup__form-error" id="edit-title-error"></span>
      </section>

      <section className="popup__section">
        <input
          type="text"
          name="subtitle"
          className="popup__input"
          id="edit-subtitle"
          placeholder="Описание профиля"
          required
          minLength="2"
          maxLength="200"          
          onChange={handleDescriptionChange}
          value={description} />

        <span className="popup__form-error" id="edit-subtitle-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;