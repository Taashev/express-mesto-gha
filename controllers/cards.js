const Card = require('../models/card');
const {
  HttpError,
  NotFound,
} = require('../utils/Errors');

const httpError = new HttpError('Переданы некорректные данные карточки');
const cardNotFound = new NotFound('Такой карточки нет');

// get cards
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

// create card
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(() => next(httpError));
};

// delete card
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((cards) => {
      if (!cards) {
        next(cardNotFound);
        return;
      }
      res.send(cards);
    })
    .catch(() => next(httpError));
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
    .then((card) => {
      if (!card) {
        next(cardNotFound);
        return;
      }
      res.send(card);
    })
    .catch(() => next(httpError));
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
    .then((card) => {
      if (!card) {
        next(cardNotFound);
        return;
      }
      res.send(card);
    })
    .catch(() => next(httpError));
};

// export
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
