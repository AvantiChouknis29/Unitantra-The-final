const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require('../middlewares/validate-middleware');
const getAllUsers = require("../Search/search");
const authMiddleware = require("../middlewares/auth-middleware");
//const applied=require("../controllers/application-controller")
router.get("/", authControllers.home);

router.post("/login", validate(loginSchema), authControllers.login);

router.post("/register", validate(signupSchema), authControllers.register);

router.get("/getAllUniversities", getAllUsers);

router.route('/user').get(authMiddleware, authControllers.user);

router.get('/confirm/:token', authControllers.verifyMail);

//router.get("/applied",applied)

module.exports = router;
