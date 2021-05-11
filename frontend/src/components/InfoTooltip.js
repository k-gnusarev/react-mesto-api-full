function InfoTooltip (props) {
  return (
    <div className={`popup popup_type_infotooltip ${props.isActive ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <img src={props.message.icon} alt="" className="popup__icon" />
        <p className="popup__tooltip-text">{props.message.text}</p>
        <button type="button" className="popup__close-button" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip ;