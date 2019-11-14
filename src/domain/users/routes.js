// Dependencies
const express = require('express');

// DB Connector
const db = require('../../db');
const createUsersService = require('./service');

// Services
const usersService = createUsersService({ db });

const router = express.Router();

// Routes

router.get('/', (req, res) => {
  usersService.findAll()
    .then(users => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });;
});

module.exports = router;
