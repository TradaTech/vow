var express = require('express')
  , router = express.Router()
  , User = require('../models/user')
  , route = require('../helpers/route')
  , session = require('express-session')
  , nodePersist = require('./node-persist');

router.use(session({
  secret: process.env || null,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 1000 * 60 * 60 * 24 * 7,
    secure: true,
  }
}))

router.get('/details', (req, res) => {
  route.tryJson(res, User.one, req.query.username);
})

router.get('/all', (req, res) => {
  route.tryJson(res, User.all);
})

router.route('/profile')
  .get((req, res) => {
    nodePersist.finddata()
    .then((result) => {
      res.send(result);
    });
  })

module.exports = router
