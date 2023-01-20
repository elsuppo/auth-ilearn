const { register, login } = require('../controllers/AuthControllers');
const { checkUser } = require('../middlewares/AuthMiddlewares');
const { getUsers, deleteUsers } = require('../controllers/UsersControllers');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', checkUser, getUsers);
router.delete('/', deleteUsers);

module.exports = router;