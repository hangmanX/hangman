// https://socket.io/docs/
const path = require('path');
const express = require('express');
const mongoFunctions = require('./controllers/mongoController');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Michael:check@cluster0-liyfw.mongodb.net/hang_man?retryWrites=true&w=majority");
mongoose.connection.once('open', () => {
  console.log('Connected to mongo database');
});

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// !Original Port was 80
const PORT = process.env.PORT || 3000;

const authController = require('./controllers/authController');
const cookieController = require('./controllers/cookieController');
const userController = require('./controllers/userController');

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/auth/github/callback',
  authController.fetchTokenJSON,
  authController.fetchUserProfile,
  userController.getUser,
  cookieController.setUserIDCookie,
  (req, res) => {
    console.log('**************** end of middleware ****************');
    res.send('User has logged in');
  });

// For Build
// For adding a new remote to heroku : heroku git:remote -a hangmanx-cs
// push the branch adam-rajeeb/heroku-deployment to heroku remote's master
// branch : git push heroku adam-rajeeb/heroku-deployment:master
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get('/newPrompt', mongoFunctions.getNewQandA, (req, res, next) => {
  res.status(300).send(res.locals.newQuestion);
  return next();
});

app.get('/user/profile', cookieController.getInfofromCookie);

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

/**
 * @name GLOBAL ROUTE HANDLER
 * @description handles all bad request sent from frontend
 */
app.all('*', (req, res) => {
  res.status(404).send('Page not found');
});

/**
 * @name GLOBAL ERROR HANDLER
 * @description sending error objects from controllers/routes should be sent as an object with
 * 'status' and 'message' as key.
 * Status value should be a status code & message value should be a string describing the error
 * and location/file in which the error was invoked from
 */
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Error caught by Global Error Handler',
    message: 'Unknown Middleware Error occured',
    status: 500,
  };
  const newError = { ...defaultError, ...err };
  console.log('*********** ERROR **********\n', newError.log);
  res.status(newError.status).send(newError.message);
});

server.listen(PORT, () => {
  // for deployment run on regualar node in NPM START
  console.log('\n** RUNNING ON NODEMON **')
  console.log('Server listening on PORT:', PORT);
  console.log('** FOR DEPLOYMENT, SWITCH TO REGULAR NODE **');
});

const gameRooms = []

io.on('connection', (socket) => {
  socket.on('addRoom', (roomNumber) => {
    gameRooms.push(roomNumber)
    socket.emit('loadRooms', gameRooms)
  })

  socket.emit('loadRooms', gameRooms)
  console.log("SOCKET ID", socket.id)
  socket.on('joinRoom', (roomid) => {
    console.log("ROOMID", roomid)
    socket.join(roomid);
    socket.emit('testsocket',roomid);
  })
  socket.on('clickedLetter', (letter) => {
    console.log('recived', letter);
    io.sockets.emit('clickedLetter', letter);
  });

//   io.of('/').in(room).emit('newUser', 'New Player has joined the ' + room)

  
});

// const manager = io.of("/game").on('connection', function (socket) {
//   socket.on('addRoom', (roomNumber) => {
//     gameRooms.push(roomNumber)
//     socket.emit('loadRooms', gameRooms)
//   })

//   socket.on("joinRoom", function(roomid){
//       socket.join(roomid);
//       manager.to(roomid).emit('testsocket',roomid);
//   })

//   socket.on('clickedLetter', (letter) => {
//     console.log('recived', letter);
//     manager.to(roomid).emit('clickedLetter', letter);
//   });

// })
