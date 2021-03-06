export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then(res => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(res => this._getResponseData(res));
  }

  updateUserInfo(title, subtitle) {
    return fetch(`${this._baseUrl}/users/me`, { 
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: subtitle
      })
    })
      .then(res => this._getResponseData(res));
  }
  
  updateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, { 
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(res => this._getResponseData(res));
  }

  sendNewCard(link, name) {
    return fetch(`${this._baseUrl}/cards`, { 
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  handleError(err) {
    console.error(err);
  }

  updateHeaders() {
    this._headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  }
}
const api = new Api({
  baseUrl: 'https://api.kgnusaryov.mesto.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }
});

export default api;