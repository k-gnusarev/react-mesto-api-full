import React from 'react';

function ImagePopup(props) {
  return (    
    <div className={`popup popup_type_viewer ${props.card ? "popup_active" : ""}`}>
      <div className="popup__photo-container">
        <button type="button" className="button popup__close-button" onClick={props.onClose}></button>
        <img className="popup__photo" alt={props.card ? props.card.name : ""} src={props.card ? props.card.link : ""} />
        <p className="popup__photo-title">{props.card ? props.card.name : ""}</p>          
      </div>
    </div>
  );
}

export default ImagePopup;