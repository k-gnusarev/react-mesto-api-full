/* eslint-disable linebreak-style */
const router = require('express').Router();
const { idValidation, cardValidation } = require('../middlewares/requestValidation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', cardValidation, createCard);
router.delete('/:id', idValidation, deleteCard);
router.put('/:id/likes', idValidation, likeCard);
router.delete('/:id/likes', idValidation, unlikeCard);

module.exports = router;
