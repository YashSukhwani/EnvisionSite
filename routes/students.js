const router = require('express').Router();
let Student = require('../models/student.model');

const bodyParser = require('body-parser');
let urlencodedPaser = bodyParser.urlencoded({
  extended: false
});

router.route('/add').post(urlencodedPaser, (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const phone = req.body.phone;
  const country_code = req.body.country_code;
  const nearest_office = req.body.nearest_office;
  const destination = req.body.destination;
  const intake = req.body.intake;

  let name = fname + ' ' + lname;
  let mobile = country_code + ' ' + phone;

  if (name != 'undefined undefined')
    console.log('\nAdded ' + name);

  console.log(req.body);

  const newStudent = new Student({
    name,
    email,
    mobile,
    nearest_office,
    destination,
    intake
  });

  newStudent.save()
    .then(() => res.render('index-submit', {
      data: req.body
    }))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;