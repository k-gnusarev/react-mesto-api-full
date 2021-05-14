const BASE_URL = 'https://api.kgnusaryov.mesto.nomoredomains.club';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    if (res.status === 400) {
      throw new Error('Не все поля заполнены');
    } else if (res.status === 401) {
      throw new Error('Email не зарегистрирован');
    } else return res.json();
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data.token;
    }
  })
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then((response) => {
    return response.json()
  })
}