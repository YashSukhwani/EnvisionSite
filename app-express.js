var express = require('express');
var bodyParser = require('body-parser');
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

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/find-us', (req, res) => {
    res.render('find-us');
});

app.listen(3000);