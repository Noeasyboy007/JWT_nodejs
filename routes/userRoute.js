const express = require('express');

const { test, userRegistration, userLogin } = require("../controller/userController")

const router = express.Router();

router.get("/test", test);
router.post("/registration", userRegistration);
router.post("/login", userLogin);

module.exports = router;