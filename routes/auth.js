const router = require('express').Router();
let Counselor = require('../models/model.counselor');

const bodyParser = require('body-parser');
let urlencodedPaser = bodyParser.urlencoded({
  extended: false
});

router.route('/register').post(urlencodedPaser, (req, res) => {
  const newCounselor = new Counselor({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  newCounselor.save()
    .then(() => res.json(newCounselor))
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;