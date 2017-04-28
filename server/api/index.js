const express = require('express');
const router = express.Router();
const api = require('./controller');
const authRequired = require('../middleware/authRequired');
const appState = require('../middleware/appState');

//movie routes
router.post('/movie', authRequired, appState, api.addMovie);
router.get('/movies', api.getMovies);
router.put('/movies', authRequired, api.removeMovie);
router.put('/movie', authRequired, appState, api.voteForMovie);
router.patch('/movie', authRequired, appState, api.veto);

//user routes
router.post('/register', api.register);
router.post('/login', api.login);
router.get('/users', authRequired, api.getUsers);
router.get('/user', api.getUser);
router.put('/users', authRequired, api.removeUser);
router.put('/user', authRequired, api.updateUser);

//app routes
router.post('/end', authRequired, api.endVoting);
router.post('/restart', authRequired, api.restartVoting);
router.get('/status', api.getStatus);

module.exports = router;
