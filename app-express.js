const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

require('dotenv').config();


let app = express();
let urlencodedPaser = bodyParser.urlencoded({
  extended: false
});

app.set('view engine', 'ejs');
app.use('/assets', express.static('./src/assets'));
app.use('/css', express.static('./src/css'));
app.use('/src', express.static('./src'));
app.use('/', express.static('./'));

app.post('/index', urlencodedPaser, (req, res) => {
  console.log(req.body);
  res.render('index-submit', {
    data: req.body
  });
});

// TUTORIAL CODE START

const cors = require('cors');

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const studentRouter = require('./routes/students');
app.use('/students', studentRouter);

// TUTORIAL CODE END

// DEFINING PAGE ROUTES
app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/find-us', (req, res) => {
  res.render('find-us');
});

app.get('/program-selection', (req, res) => {
  res.render('program-selection');
});

app.get('/find-accom', (req, res) => {
  res.render('find-accom');
});

app.get('/error-page', (req, res) => {
  res.render('error-page');
});

app.get('/pre-depart', (req, res) => {
  res.render('pred-depart');
});

app.get('/visa-guid', (req, res) => {
  res.render('visa-guid');
});

app.get('/appl-guid', (req, res) => {
  res.render('appl-guid');
});

// END OF PAGE ROUTES

app.listen(3000);