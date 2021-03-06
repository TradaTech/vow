var express = require('express')
    , router = express.Router()
    , passport = require('passport')
    , session = require('express-session')
    , cookieParser = require('cookie-parser')
    , nodePersist = require('./node-persist')

router.use('/login', require('./authentication'));
router.use('/api/user', require('./user'))
router.use('/api/propose', require('./propose'))
router.use('/api/memory', require('./memory'))
router.use('/api/noti', require('./noti'))
router.use('/api/tag', require('./tag'))

router.use(cookieParser());
router.use(session({
    secret: process.env || null,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 1000 * 60 * 60 * 24 * 7,
        secure: true,
    }
}))

router.get('/api', function (req, res) {
    res.send(`<h3>API list</h3>
  <ul>
    <li>
        <a href='/dump'>/dump (Dump database)</a>
    </li>
    <li>
        <a href='/api/user/details?username=tradatech'>/api/user/details?username=tradatech</a>
    </li>
    <li>
        <a href='/api/user/all'>/api/user/all</a>
    </li>
    <li>
        <a href='/api/propose/details?id=0'>/api/propose/details?id=0</a>
    </li>
    <li>
        <a href='/api/propose/list?username=tradatech'>/api/propose/list?username=tradatech</a>
    </li>
    <li>
        <a href='/api/memory/details?id=0'>/api/memory/details?id=0</a>
    </li>
    <li>
        <a href='/api/memory/list?proposeId=0'>/api/memory/list?proposeId=0</a>
    </li>
    <li>
        POST /api/memory/create
    </li>
    <li>
        <a href='/login/google'>/login/google</a>
    </li>
    <li>
        <a href='/api/user/profile'>/api/user/profile</a>
    </li>
  </ul>`
    );
})

router.route('/api/google/callback')
    .get(passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
        nodePersist.savedata(req.user)
            .then((result) => {
                res.redirect('/api/user/profile');
            })
    })

router.get('/dump', (req, res) => {
    const models = ['user', 'tag', 'noti', 'propose', 'memory']
    const data = models.reduce((collector, item) => {
        collector.push(require(`../models/${item}`).all())
        return collector
    }, [])

    Promise.all(data).then(data => res.json(models.reduce((obj, item, index) => {
        obj[item] = data[index]
        return obj
    }, {})))
})


module.exports = router
