const Card = require('../models/card');
const { validationError } = require('../middlewares/validationError');
const { messageError } = require('../utils/constants');
const NotFoundError = require('../components/NotFoundError');
const ForbiddenError = require('../components/ForbiddenError');

// get cards
const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => next(validationError(err)));
};

// create card
const createCard = (req, res, next) => {
  const owner = req.user.id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => next(validationError(err, messageError.cardValidationError)));
};

// delete card
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(messageError.cardNotFound));
      }

      const owner = JSON.stringify(card.owner).replaceAll('"', '');
      const userId = req.user.id;

      if (owner !== userId) {
        return next(new ForbiddenError('Нельзя удалить чужую карточку'));
      }

      Card.findByIdAndRemove(cardId)
        // eslint-disable-next-line no-shadow
        .then((card) => {
          res.send(card);
        })
        .catch((err) => next(validationError(err, messageError.cardIdError)));
    })
    .catch((err) => next(validationError(err, messageError.cardIdError)));
};

// like card
const likeCard = (req, res, next) => {
  const UserId = req.user.id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: UserId } },
    { new: true, runValidators: true },
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return next(validationError(new NotFoundError(messageError.cardNotFound)));
      }

      res.send(card);
    })
    .catch((err) => next(validationError(err, messageError.cardIdError)));
};

// dislike card
const dislikeCard = (req, res, next) => {
  const UserId = req.user.id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: UserId } },
    { new: true, runValidators: true },
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return next(validationError(new NotFoundError(messageError.cardNotFound)));
      }

      res.send(card);
    })
    .catch((err) => next(validationError(err, messageError.cardIdError)));
};

// export
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
