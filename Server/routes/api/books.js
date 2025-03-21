const express = require('express');
const router = express.Router();
const booksController = require('../../controllers/booksController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES = require('../../config/ROLES_LIST_CODES');


//the middleware function can be also put in here, we will use something like this when implementing
//router.get('/', verifyJWT, booksController.getAllBooks);
//user roles, for each route we will have a verification
router.get('/', verifyRoles(ROLES.USER), booksController.getAllBooks);

router.route('/titles').get(booksController.getTitles);

router.get('/authors', booksController.getAuthors);

router.post('/newBook', booksController.postBook);

router.route('/getBook/:isbn').get(booksController.getBook);


module.exports = router;