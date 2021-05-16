/* eslint-disable linebreak-style */
const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('req');
  console.log(req);
  console.log('authorization:');
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    console.log('!!!token:');
    console.log(token);
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'}`);
  } catch (err) {
    console.log('3. error');
    console.log(err);
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
