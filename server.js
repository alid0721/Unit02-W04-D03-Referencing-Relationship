const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const listingsController=require('./controllers/listing.route.js')
const authController = require('./controllers/auth.js');
const passUserToView=require('./middleware/pass-user-to-view.js')
const isSignedIn=require("./middleware/is-signed-in.js")
const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView)

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});
app.use('/auth', authController);
app.use('/listings', isSignedIn, listingsController);
app.use('/listings', listingsController);
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
