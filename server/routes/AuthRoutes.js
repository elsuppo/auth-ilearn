const {register, login} = require('../controllers/AuthControllers');

const router = require('express').Router();

router.get('/users');
router.post('/register', register);
router.post('/login', login);

module.exports = router;