const { register, login } = require('../controllers/AuthControllers');
const { checkUser } = require('../middlewares/AuthMiddlewares');
const { getUsers, deleteUsers, blockUsers } = require('../controllers/UsersControllers');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', checkUser, getUsers);
router.delete('/', deleteUsers);
router.put('/', blockUsers);

module.exports = router;