function protectionMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/');
  }
  return next();
}

module.exports = {protectionMiddleware}
