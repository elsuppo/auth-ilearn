const { register, login } = require('../controllers/AuthControllers');
const { checkUser } = require('../middlewares/AuthMiddlewares');
const { getUsers } = require('../controllers/UsersControllers');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', checkUser, getUsers);

module.exports = router;