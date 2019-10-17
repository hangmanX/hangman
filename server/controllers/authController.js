/**
 * @consoleLog beginning console logs are used for testing controllers to ensure that endpoints
 * are being hit and for debugging purposes. They include the METHOD, ENDPOINT URL, 
 * BODY, LOCALS & DOMAIN
 */
const fetch = require('node-fetch');

const authController = {};

/**
 * @description after a success login via Github's oAuth, Github redirects back to
 * the endpoint '/api/auth/github/callback' where this middleware fires off first
 * and makes a fetch request back to github
 * @response gets a "access_token" after making a fetch request to GitHub
 */
authController.fetchTokenJSON = async (req, res, next) => {
  console.log('\n*********** authController.fetchTokenJSON ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  console.log(`DOMAIN: ${req.headers.host}`);
  const { code } = req.query;

  await fetch(`https://github.com/login/oauth/access_token?client_id=cecbb15649468c524b83&client_secret=7ef8af810a3ed3ce98cde4a29e48205e0cd6fcfc&code=${code}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((parsedResponse) => {
      const { access_token } = parsedResponse;

      if (access_token) {
        // On Succcess
        res.locals.token = access_token;
        return next();
      }
      // Invoke error handler
      const error = {
        log: 'Error authController.fetchTokenJSON: missing access_token',
        message: 'Bad Request',
        status: 400,
      };
      return next(error);
    })
    .catch((err) => {
      // Invoke error handler
      const error = {
        log: `Error authController.fetchTokenJSON: failed fetch request\n${err.message}`,
        message: 'Failed Fetch request',
        status: 500,
      };
      return next(error);
    });
};

/**
 * @description makes a fetch request to Github using the "access_token" required
 * from a successful oAuth login
 * @response a user's profile information
 */
authController.fetchUserProfile = (req, res, next) => {
  console.log('\n*********** authController.fetchUserProfile ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  console.log(`DOMAIN: ${req.headers.host}`);
  const { token } = res.locals;

  fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((userProfile) => {
      // On Success
      const { name, login, avatar_url} = userProfile;
      res.locals.userProfile = { name, login, avatar_url };
      return next();
    })
    .catch((err) => {
      // Invoke error handler
      const error = {
        log: `Error authController.fetchUserProfile: failed fetch request\n${err.message}`,
        message: 'Failed Fetch request',
        status: 500,
      };
      return next(error);
    });
};

module.exports = authController;
