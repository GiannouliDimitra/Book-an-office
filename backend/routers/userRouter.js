const express = require ("express");
const router = express.Router();
const { signUp, login/* , testToken */ } = require ("../controllers/userController");

router.post("/signUp", signUp);
router.post("/login", login);
/* router.get ("/token", verifyToken, testToken); */

module.exports = router;