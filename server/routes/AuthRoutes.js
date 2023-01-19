const {register, login} = require('../controllers/AuthControllers');
const { checkUser } = require('../middlewares/AuthMiddlewares');
const {getUsers} = require('../controllers/UsersControllers');

const router = require('express').Router();

router.post('/', checkUser);
router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);

module.exports = router;