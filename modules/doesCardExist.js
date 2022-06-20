const Card = require('../models/card');
const { checkError } = require('./checkError');
const { NotFoundError } = require('../components/NotFoundError');

const notFoundCard = new NotFoundError('Такой карточки нет');

const doesCardExist = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId, (err, card) => {
    if (card === null) {
      next(checkError(notFoundCard));
      return;
    }

    next();
  });
};

module.exports = {
  doesCardExist,
};
