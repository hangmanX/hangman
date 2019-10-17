
const mongoController = {};
const Q_and_A = require('../models/mongoModel.js');

//get one random document from the q_and_as collection
mongoController.getNewQandA = (req, res, next) => {
  
  Q_and_A.countDocuments((err,count) => { 
    if (err) res.status(500).send('random number generating not working')
    
    let randSkip = Math.floor(Math.random() * count); 
    
    Q_and_A.findOne().skip(randSkip).exec(function (err, prompt) {
      
      if (err) res.status(500).send('unable to get question from database')
      else {
        res.locals.newQuestion = prompt;
        next();
      }
    })
  })
}

module.exports = mongoController;

