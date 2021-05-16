/* eslint-disable linebreak-style */
const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  console.log('1. let payload');
  console.log(payload);
  try {
    console.log('2. process.env');
    console.log(process.env);
    console.log('NODE_ENV, JWT_SECRET');
    console.log(NODE_ENV);
    console.log(JWT_SECRET);
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'}`);
  } catch (err) {
    console.log('3. error');
    console.log(err);
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
