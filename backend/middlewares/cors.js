const cors = require('cors');

const allowedDomains = [
  'http://kgnusaryov.mesto.nomoredomains.club/',
  'https://kgnusaryov.mesto.nomoredomains.club/',
  'http://localhost:3000'
];

const corsOptions = {
  origin(origin, callback) {
    if (allowedDomains.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
};

module.exports = cors(corsOptions);