const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

const cors = require('cors');
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use(express.json());

const studentRouter = require('./routes/authStudents');
app.use('/students', studentRouter);

const authRoute = require('./routes/authCounselors');
app.use('/counselors', authRoute);

const dataRoute = require('./routes/studentData');
app.use('/api/data', dataRoute);

// for information-based pages
const pagesRoute = require('./routes/pages');
app.use('/pages', pagesRoute);

// The above two app.use() statements would not work if placed before
// the database connection statement. Remember this. Wasted lots of time.

// DEFINING MAIN PAGE ROUTES
app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/pre-depart', (req, res) => {
  res.render('pre-depart');
});

// END OF MAIN PAGE ROUTES

app.listen(3000);

module.exports = app;