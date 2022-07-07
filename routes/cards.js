const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { regexUrl } = require('../utils/constants');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// get cards
router.get('/', getCards);

// create card
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexUrl),
  }),
}), createCard);

// delete card
router.delete('/:cardId', deleteCard);

// like card
router.put('/:cardId/likes', likeCard);

// dislike card
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
