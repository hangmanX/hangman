//copied from mongodb website
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Michael:<password>@cluster0-liyfw.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("q_and_a");
  // perform actions on the collection object
  client.close();
});


const mongoFunctions = {};

//get a new question from the mongo database
mongoFunctions.getNewQandA = (res, req, next) => {
  const newQandA = { question: 'what is this?', answer: 'forty-two' };
  console.log(newQandA);
  //temp return object for testing purposes
  return newQandA;
  next();
}

module.exports = mongoFunctions;

