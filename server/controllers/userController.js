const userController = {};
const User = require('../models/userModel');

/**
 * @description queries for an existing user in SQL database; if it does
 * not exist, then creates the user using the information provided
 * @requirements a "login" property received from a user's profile upon
 * making a fetch request
 */
userController.getUser = (req, res, next) => {
  console.log('\n*********** userController.getUser ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  console.log(`DOMAIN: ${req.headers.host}`);
  const { userProfile } = res.locals;

  User.findOrCreate({
    where: { login: userProfile.login },
    defaults: userProfile,
  })
    .then(([user, created]) => {
      // user : the user that was found or created in the database
      // created : boolean referring to if user was created or not
      const { id, name, login, avatar_url, wins, losses } = user;
      // overwriting userProfile inside locals
      res.locals.userProfile = {
        ...userProfile,
        id,
        name,
        login,
        avatar_url,
        wins,
        losses,
      };
      return next();
    })
    .catch((err) => {
      // Invoke error handler
      const error = {
        log: `Error userController.getUser: failed query\n${err.message}`,
        message: 'Failed Query',
        status: 500,
      };
      return next(error);
    });
};

module.exports = userController;
