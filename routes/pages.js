const router = require('express').Router();
const express = require('express');

router.get('/find-us', (req, res) => {
  res.render('find-us');
});

router.get('/program-selection', (req, res) => {
  res.render('program-selection');
});

router.get('/find-accom', (req, res) => {
  res.render('find-accom');
});

router.get('/error-page', (req, res) => {
  res.render('error-page');
});

router.get('/pre-depart', (req, res) => {
  res.render('pre-depart');
});

router.get('/visa-guid', (req, res) => {
  res.render('visa-guid');
});

router.get('/appl-guid', (req, res) => {
  res.render('appl-guid');
});

router.use('/assets', express.static('./src/assets'));
router.use('/css', express.static('./src/css'));
router.use('/src', express.static('./src'));

module.exports = router;