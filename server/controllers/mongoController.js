
const mongoFunctions = {};
const Q_and_A = require('../models/mongoModel.js');

mongoFunctions.getNewQandA = (req, res, next) => {

  //get one random document from the q_and_as collection 
  //containing a question and an answer
  Q_and_A.findOne((err, prompt) => {
    if (err) res.status(500).send('unable to get question from database')
    else {
      res.locals.newQuestion = prompt;
      next();
    }
  })
  
}

module.exports = mongoFunctions;

