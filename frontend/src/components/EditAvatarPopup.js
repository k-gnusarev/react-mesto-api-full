import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    clearForm();
  }

  function clearForm() {
    avatarRef.current.value = null;
  }

  function closePopup() {
    clearForm();
    props.onClose();
  }

  return (
    <PopupWithForm
      isActive={props.isActive}
      onClose={closePopup}
      title="Обновить аватар"
      name="update-avatar"
      buttonCaption="Сохранить"
      handleSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatarLink"
        className="popup__input"
        id="avatar-url"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}/>

      <span
        className="popup__form-error"
        id="avatar-url-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;