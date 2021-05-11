import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  
  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link
    });

    clearForm();
  }

  function clearForm() {
    setName('');
    setLink('');
  }

  function closePopup() {
    clearForm();
    props.onClose();
  }

  return (
    <PopupWithForm
      isActive={props.isActive}
      onClose={closePopup}
      title="Добавить место"
      name="add"
      buttonCaption="Сохранить"
      handleSubmit={handleSubmit}>
      <section className="popup__section">
        <input
          type="text"
          name="placeName"
          className="popup__input"
          id="add-name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          value={name} />
        <span className="popup__form-error" id="add-name-error"></span>
      </section>

      <section className="popup__section">
        <input
          type="url"
          name="placeLink"
          className="popup__input"
          id="add-url"
          placeholder="Ссылка на картинку"
          required
          onChange={handleLinkChange}
          value={link} />
        <span className="popup__form-error" id="add-url-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default AddPlacePopup;