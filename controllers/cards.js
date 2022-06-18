const Card = require('../models/card');

// get cards
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => res.send({ message: `Произошла ошибка: ${err}` }));
};

// create card
const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ card }))
    .catch((err) => res.send({ message: `Произошла ошибка: ${err}` }));
};

// delete card
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((cards) => res.send(cards))
    .catch((err) => res.send({ message: `Произошла ошибка: ${err}` }));
};

// like card
const likeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.send({ message: `Произошла ошибка: ${err}` }));
};

// dislike card
const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.send({ message: `Произошла ошибка: ${err}` }));
};

// export
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
