const express = require('express');

const {test,userRegistration} = require ("../controller/userController")

const router = express.Router();

router.get("/test",test);
router.post("/registration",userRegistration);

module.exports = router;