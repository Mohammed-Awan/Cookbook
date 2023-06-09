const express = require('express');
const router = express.Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  loginUser,
  addRecipe,
  deleteRecipe,
  updateRecipe,
  getAllRecipies,
} = require('../controllers/users');

router.route('/').get(getUsers).post(createUser);
router.route('/login').patch(loginUser);
router.route('/public').get(getAllRecipies);
router
  .route('/:username')
  .get(getSingleUser)
  .post(addRecipe)
  .delete(deleteRecipe)
  .patch(updateRecipe);

module.exports = router;
