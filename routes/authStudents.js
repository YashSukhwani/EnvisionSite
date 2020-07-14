const router = require('express').Router();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let Student = require('../models/student.model');

const bodyParser = require('body-parser');
let urlencodedPaser = bodyParser.urlencoded({
  extended: false
});

router.use('/assets', express.static('./src/assets'));
router.use('/css', express.static('./src/css'));
router.use('/src', express.static('./src'));

const {
  registerValidation,
  loginValidation
} = require('./studentValidation');

// When students navigate to sign-in page but then do not fill the form but instead click the Envision logo in the navbar,
// they should be directed back to the home page.
// However, there is a routing problem, which is why this is not working correctly.
// Fix it quickly.

router.route('/add').post(urlencodedPaser, async (req, res) => {

  const {
    error
  } = registerValidation(req.body);
  if (error)
    return res.render('student-login', {
      data: JSON.stringify(error.details[0].message + '.'),
      data2: JSON.stringify('')
    });
  // return res.status(400).send(error.details[0].message + '.');

  const emailExists = await Student.findOne({
    email: req.body.email
  });
  if (emailExists)
    return res.render('student-login', {
      data: JSON.stringify('Email already linked with another account.'),
      data2: JSON.stringify('')
    });
  // return res.status(400).send('Email already linked with another account.');

  var salt, hashPassword;

  if (req.body.password) {
    salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(req.body.password, salt);
  }

  const fname = req.body.fname;
  const lname = req.body.lname;
  const phone = req.body.phone;
  const country_code = req.body.country_code;

  let name = fname + ' ' + lname;
  let mobile = country_code + ' ' + phone;

  var newStudent;

  if (req.body.password) {
    newStudent = new Student({
      name: name,
      email: req.body.email,
      password: hashPassword,
      mobile: mobile,
      nearest_office: req.body.nearest_office,
      destination: req.body.destination,
      intake: req.body.intake
    });
    newStudent.save()
      .then(() => res.render('need-approval', {
        data: req.body
      }))
      .then(() => {
        if (name != 'undefined undefined')
          console.log('\nAdded ' + name);
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } else {
    newStudent = new Student({
      name: name,
      email: req.body.email,
      mobile: mobile,
      nearest_office: req.body.nearest_office,
      destination: req.body.destination,
      intake: req.body.intake
    });
    newStudent.save()
      .then(() => res.render('index-submit', {
        data: req.body
      }))
      .then(() => {
        if (name != 'undefined undefined')
          console.log('\nAdded ' + name);
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }

});

router.get('/login', (req, res) => {
  res.render('student-login', {
    data: JSON.stringify(''),
    data2: JSON.stringify('')
  });
});

router.post('/login', async (req, res) => {

  const {
    error
  } = loginValidation(req.body);
  if (error)
    return res.render('student-login', {
      data: JSON.stringify(''),
      data2: JSON.stringify(error.details[0].message + '.')
    });
  // return res.status(400).send(error.details[0].message);

  const studentObject = await Student.findOne({
    email: req.body.email
  });
  if (!studentObject)
    return res.render('student-login', {
      data: JSON.stringify(''),
      data2: JSON.stringify('Email or password is incorrect.')
    });
  // return res.status(400).send('Email or password is incorrect.');
  // Safer practice when email does not exist.

  if (studentObject.password == undefined)
    return res.render('student-login', {
      data: JSON.stringify(''),
      data2: JSON.stringify(
        'Envision student account has not yet been setup with this email.')
    });
  // return res.status(400).send('Envision student account has not yet been setup with this email.');
  // this check needs to come before the passwords are compared

  const validPassword = await bcrypt.compare(req.body.password, studentObject.password);
  if (!validPassword)
    return res.render('student-login', {
      data: JSON.stringify(''),
      data2: JSON.stringify('Email or password is incorrect.')
    });

  // return res.status(400).send('Email or password is incorrect.');
  // Safer practice when password does not match.

  const token = jwt.sign({
    _id: studentObject._id
  }, process.env.TOKEN_SECRET);

  res.setHeader('auth-token', token);
  res.render('student-in', {
    data: req.body
  })
});

module.exports = router;