const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let Counselor = require('../models/model.counselor');

const bodyParser = require('body-parser');
let urlencodedPaser = bodyParser.urlencoded({
  extended: false
});

const express = require('express');
router.use('/assets', express.static('/src/assets'));
router.use('/css', express.static('/src/css'));
router.use('/src', express.static('/src'));

const {
  registerValidation,
  loginValidation
} = require('./counselorValidation');

router.route('/register').post(urlencodedPaser, async (req, res) => {

  const {
    error
  } = registerValidation(req.body);
  if (error)
    return res.status(400).send(error.details[0].message + '.');

  const emailExists = await Counselor.findOne({
    email: req.body.email
  });
  if (emailExists)
    return res.status(400).send('Email already linked with another account.');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newCounselor = new Counselor({
    email: req.body.email,
    username: req.body.username,
    password: hashPassword
  });

  newCounselor.save()
    .then(() => res.json({
      newCounselor: newCounselor._id
    }))
    .catch(err => res.status(400).json('Error: ' + err));
  // Could also use Try-Catch here instead of the Promise.

  // Only Counselor object id returned after succesful registration
  // of a new Counselor. That's because password would be included
  // if the complete object was returned.

});

router.route('/login').post(urlencodedPaser, async (req, res) => {

  const {
    error
  } = loginValidation(req.body);
  if (error)
    return res.render('counselor-login', {
      data: JSON.stringify(error.details[0].message + '.')
    });
  // return res.status(400).send(error.details[0].message);

  const counselorObject = await Counselor.findOne({
    email: req.body.email
  });
  if (!counselorObject)
    return res.render('counselor-login', {
      data: JSON.stringify('Email or password was incorrect.')
    });
  // return res.status(400).send('Email or password is incorrect.');
  // Safer practice when email does not exist.

  const validPassword = await bcrypt.compare(req.body.password, counselorObject.password);
  if (!validPassword)
    return res.render('counselor-login', {
      data: JSON.stringify('Email or password was incorrect.')
    });
  // return res.status(400).send('Email or password is incorrect.');
  // Safer practice when password does not match.

  const token = jwt.sign({
    _id: counselorObject._id
  }, process.env.TOKEN_SECRET);

  res.setHeader('auth-token', token);
  res.render('counselor-in');

  // res.send('Logged In!');

});

// COUNSELOR LOGIN ROUTE
router.route('/login').get((req, res) => {
  res.render('counselor-login', {
    data: JSON.stringify('')
  });
});

module.exports = router;