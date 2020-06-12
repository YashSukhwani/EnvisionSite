const router = require('express').Router();
const Counselor = require('../models/model.counselor');

router.post('/register', (req, res) => {
  const counselor = new Counselor({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })
})