const Card = require('../models/card');

const doesCardExist = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId, (err, card) => {
    if (card === null) {
      res.send({ message: 'Такой карточки нет' });
      return;
    }

    next();
  });
};

module.exports = {
  doesCardExist,
};
