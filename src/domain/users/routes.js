// Dependencies
const express = require('express');

// DB Connector
const db = require('../../db');

// Services
const createUsersService = require('./service');
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

router.post('/', (req, res) => {
  const { body } = req;
  usersService.create(body)
    .then(user => res.json(user))
    .catch((err) => {
      console.log(req.body)
      console.error(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { params: { id } } = req;
  const { body } = req;
  usersService
    .update(id, body)
    .then(updatedUser => res.json(updatedUser))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  const { params: { id } } = req;
  usersService.deleteById({ id })
    .then(deleteResponse => res.json(deleteResponse))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

module.exports = router;
