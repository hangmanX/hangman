const cookieController = {};
const User = require('../models/userModel');

cookieController.setUserIDCookie = (req, res, next) => {
  const { id } = res.locals.userProfile;
  const { token } = res.locals;
  res.cookie('userid', id, { encode: String, httpOnly: true });
  // Could possibly use the token to autorize users to go in rooms?
  // Rooms would be available to Annonymous Users as well
  res.cookie('token', token, { httpOnly: true });
  return next();
};

cookieController.getInfofromCookie = (req, res, next) => {
  const userID = req.cookies.userid;
  User.findByPk(userID).then((user) => {
    if (user) {
      return next();
    }
    res.redirect('/notloggedin');
  });
};

module.exports = cookieController;
