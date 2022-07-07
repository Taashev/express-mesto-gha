const Card = require('../models/card');
const { validationError } = require('./validationError');
const NotFoundError = require('../components/NotFoundError');

const notFoundCard = new NotFoundError('Такой карточки нет');

const doesCardExist = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId, (err, card) => {
    if (!card) {
      next(validationError(notFoundCard));
      return;
    }

    next();
  });
};

module.exports = {
  doesCardExist,
};
