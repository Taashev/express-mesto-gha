const router = require('express').Router();
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
router.post('/', createCard);

// delete card
router.delete('/:cardId', deleteCard);

// like card
router.put('/:cardId/likes', likeCard);

// dislike card
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
