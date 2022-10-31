const express = require('express');
const router = express.Router();
const verifyRoles = require('../../middleware/verifyRoles');
const users = require('../../model/users.json');
const ROLES = require('../../config/ROLES_LIST_CODES');
const usersController = require('../../controllers/usersController');

router.route('/')
    .get(verifyRoles(ROLES.USER), usersController.getAllUsers)
    .delete(verifyRoles(ROLES.EDITOR), usersController.deleteUser)
    .put(verifyRoles(ROLES.ADMIN), usersController.updateUser)

module.exports = router;