const {register, login} = require('../controllers/AuthControllers');

const router = require('express').Router();

router.get('/');
router.post('/register', register);
router.post('/login', login);

module.exports = router;