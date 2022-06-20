const Card = require('../models/card');
const { checkError } = require('../modules/checkError');
const { messageError } = require('../utils/constants');

// get cards
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(checkError(err)));
};

// create card
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => next(checkError(err, messageError.cardValidationError)));
};

// delete card
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((cards) => res.send(cards))
    .catch((err) => next(checkError(err, messageError.cardIdError)));
};

// like card
const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true, runValidators: true },
  )
    .then((card) => res.send(card))
    .catch((err) => next(checkError(err, messageError.cardIdError)));
};

// dislike card
const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true, runValidators: true },
  )
    .then((card) => res.send(card))
    .catch((err) => next(checkError(err, messageError.cardIdError)));
};

// export
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
