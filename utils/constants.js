const regexUrl = /(http|https):\/\/([\w.]+\/?)\S*/;

const messageError = {
  userValidationError: 'Переданы некорректные данные пользователя',
  userIdError: 'Некорректный id пользователя',
  cardValidationError: 'Переданы некорректные данные карточки',
  cardIdError: 'Некорректный id карточки',
  authError: 'Необходима авторизация',
};

module.exports = {
  regexUrl,
  messageError,
};
