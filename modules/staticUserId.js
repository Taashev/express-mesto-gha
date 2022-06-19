module.exports = (req, res, next) => {
  req.user = {
    _id: '62add566d9ecfdbbd5a972ff',
  };

  next();
};
