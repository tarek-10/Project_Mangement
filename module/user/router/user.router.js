const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const {
  userSignupSchema,
  userVerifySchema,
  userLoginSchema,
} = require("../joi/user.validation");
const router = express.Router();

//create user
const userSignUpFun = require("../controller/user.controller");
router.post("/signup", handleValidation(userSignupSchema), userSignUpFun);
//end

//verif email
const userVerifyFun = require("../controller/userVerification.controller");
router.get("/verify/:token", handleValidation(userVerifySchema), userVerifyFun);
//end

//login
const userLoginFun = require("../controller/userLogin.controller");
router.post("/login", handleValidation(userLoginSchema), userLoginFun);
//end
module.exports = router;
