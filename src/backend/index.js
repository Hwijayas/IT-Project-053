const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const app = express();
const passport = require('passport');
require('dotenv').config();
const server = require('http').Server(app);
const userRoutes = require('./routes/userRouter');
const adminRoutes = require('./routes/adminRouter');
const accountRoutes = require('./routes/accountRouter');

// mongoDB connection string
const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.g7t1y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(
  mongoURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    dbName: 'BitsRM',
  },
)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.use('/status', (req, res) => {
  res.status(200).json(
    {
      appName: 'API',
      time: Date.now(),
      status: 'OK',
    },
  );
});

// Must first load the models
require('./models/user');

// https://github.com/zachgoll/express-jwt-authentication-starter/tree/final/
// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SERVER ----------------
 */
server.listen(PORT, (err) => {
  if (err) {
    console.log(`${err}`);
  } else {
    console.log(`\n\nAPI STATUS: OK\nListening on port: ${PORT}\n`);
  }
});

/**
 * -------------- ROUTES ----------------
 */
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/', accountRoutes);

module.exports = app;
