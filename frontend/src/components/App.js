import '../index.css';
import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as Auth from '../utils/auth.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import checkIcon from '../images/check-icon.svg';
import failIcon from '../images/fail-icon.svg';

function App() {
  const [currentUser, setCurrentUser] = React.useState();
  // УПРАВЛЕНИЕ ПОПАПАМИ
  const [isUpdateAvatarActive, setUpdateAvatarActive] = React.useState(false);
  const [isEditProfileActive, setEditProfileActive] = React.useState(false);
  const [isAddPlaceActive, setAddPlaceActive] = React.useState(false);  
  const [isInfoTooltipActive, setInfoTooltipActive] = React.useState(false);
  
  // сообщение для информационного окна
  const [message, setMessage] = React.useState({ icon: '', text: '' });
  
  const [selectedCard, setSelectedCard] = React.useState(null);

  // СОСТОЯНИЕ ДЛЯ АВТОРИЗОВАННОГО ПОЛЬЗОВАТЕЛЯ

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);  
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    
    if (isLoggedIn) {
      console.log(api);
      api.getUserData()
        .then(res => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
        
      api.getInitialCards()
        .then(res => {
          setCards(res);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  // ПРОВЕРКА ВАЛИДНОСТИ ТОКЕНА 
  
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      Auth.getContent(token)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.email);
          history.push('/');
        })
        .catch(err => console.log(err));
    }
  }, [history]);

  // Открытие попапов
  function handleUpdateAvatarClick() {
    setUpdateAvatarActive(true);
  };

  function handleEditProfileClick() {
    setEditProfileActive(true);
  };

  function handleAddPlaceClick() {
    setAddPlaceActive(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltipActive() {
    setInfoTooltipActive(true);
  }

  function handleInfoTooltipMessage({ icon, text }) {
    setMessage({
      icon: icon,
      text: text
    });
  }

  // Закрытие попапов

  function closePopups() {
    setUpdateAvatarActive(false);
    setEditProfileActive(false);
    setAddPlaceActive(false);
    setInfoTooltipActive(false);
    setSelectedCard(null);
  }

  // --Закрытие по Esc

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closePopups();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  },
  [])

  // ЗАГРУЗКА И УПРАВЛЕНИЕ КАРТОЧКАМИ

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    const changeLikeCardStatus = isLiked ? api.removeLike(card._id) : api.setLike(card._id);
    changeLikeCardStatus.then(updatedCard => {
      const newCards = cards.map(c => c._id === card._id ? updatedCard : c);
      setCards(newCards);
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(c => c._id !== card._id);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  // ОБНОВЛЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ

  function handleUpdateUser({name, about}) {
    api.updateUserInfo(name, about)
      .then(() => {
        const updatedUser = { ...currentUser };
        updatedUser.name = name;
        updatedUser.about = about;

        setCurrentUser({ ...updatedUser });
        setEditProfileActive(false);
      })
      .catch((err) => console.log(err));
  }

  //ОБНОВЛЕНИЕ АВАТАРА

  function handleUpdateAvatar({avatar}) {
    api.updateAvatar(avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setUpdateAvatarActive(false);
      })
      .catch((err) => console.log(err))
  }

  // ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ

  function handleAddPlace({name, link}) {
    api.sendNewCard(link, name)
      .then(newCard => {
        setCards([newCard, ...cards]);
        setAddPlaceActive(false);
      })
      .catch((err) => console.log(err));
  }

  // РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ

  function handleRegister(email, password) {
    Auth.register(email, password)
      .then((res) => {
        if (res.status === 201) {
          handleInfoTooltipMessage({
            icon: checkIcon,
            text: 'Учётная запись зарегистрирована!'})
          handleInfoTooltipActive();
          setTimeout(history.push, 2500, '/sign-in');
        }

        if (res.status === 400) {          
          handleInfoTooltipMessage({
            icon: failIcon,
            text: 'Пользователь с данным адресом уже зарегистрирован!'})
          handleInfoTooltipActive();
        }
      })
      .catch((err)=> {
        handleInfoTooltipMessage({
          icon: failIcon,
          text: 'Неизвестная ошибка. См. консоль'
        })
        handleInfoTooltipMessage();
        console.log(err)
      })
  }

  function handleLogin(email, password) {
    return Auth.login(email, password)
      .then((data) => {
        if (!data) {
          throw new Error('Неизвестная ошибка');
        }
        console.log('localStorage before handleLogin()');
        console.log(localStorage);
        console.log('data received in handlelogin (to be written to localStorage)');
        console.log(data);
        localStorage.setItem('token', data);
        console.log('localstorage after handleLogin()');
        console.log(localStorage);
        setEmail(email);
        setIsLoggedIn(true);
        handleInfoTooltipMessage({
          icon: checkIcon,
          text: 'Вы успешно авторизовались!'
        })

        handleInfoTooltipActive();
        setTimeout(history.push, 2500, "/");
      })
      .catch((err) => {
        handleInfoTooltipMessage({
          icon: failIcon,
          text: 'Неизвестная ошибка! См. консоль'})
        handleInfoTooltipActive();
        console.log(err)
      })
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setEmail('');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          email={email}
          onLogout={handleLogout}
        />
        <Switch>
          <Route path='/sign-in'>
            <Login
              onLogin={handleLogin}
            />
          </Route>
          <Route path='/sign-up'>
            <Register
              onRegister={handleRegister}
            />
          </Route>
          {currentUser && <ProtectedRoute
            exact
            path='/'
            isLoggedIn={isLoggedIn}
            component={Main}
            onUpdateAvatar={handleUpdateAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}>
          </ProtectedRoute>}
          <Route exact path="*">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route> 
        </Switch>
        <Footer />
        {currentUser && <EditProfilePopup
          isActive={isEditProfileActive}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
        />}
        {currentUser && <AddPlacePopup
          isActive={isAddPlaceActive}
          onClose={closePopups}
          onAddPlace={handleAddPlace}
        />}
        {currentUser && <EditAvatarPopup
          isActive={isUpdateAvatarActive}
          onClose={closePopups}
          onUpdateAvatar={handleUpdateAvatar}
        />}
        <ImagePopup
          card={selectedCard}
          onClose={closePopups}
        />
        {currentUser && <InfoTooltip
          isActive={isInfoTooltipActive} 
          onClose={closePopups} 
          message={message}
        /> 
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
