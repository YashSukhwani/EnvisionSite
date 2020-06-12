const router = require('express').Router();
let Student = require('../models/student.model');

const bodyParser = require('body-parser');
let urlencodedPaser = bodyParser.urlencoded({
  extended: false
});

router.route('/').get((req, res) => {
  Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
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

router.get('/:StudentId', async (req, res) => {
  try {
    const singleStudent = await Student.findById({
      _id: req.params.StudentId
    });
    res.json(singleStudent);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

router.delete('/:StudentId', async (req, res) => {
  try {
    const removedStudent = await Student.deleteOne({
      _id: req.params.StudentId
    });
    res.json(removedStudent);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

router.patch('/:StudentId', async (req, res) => {
  try {
    const updatedStudent = await Student.updateMany({
      _id: req.params.StudentId
    }, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        nearest_office: req.body.nearest_office,
        destination: req.body.destination,
        intake: req.body.intake
      }
    });
    res.json(updatedStudent);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

module.exports = router;