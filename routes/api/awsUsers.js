const express = require("express");
const router = express.Router({ mergeParams: true });
const cognitoUserService = require("../../Services/cognito-login");

/* User Registration. */
router.post("/signup", (req, res) => {
  cognitoUserService.signup(req.body, data => {
    res.send(data);
  });
});

/* User Verification. */
router.post("/verify-user", (req, res) => {
  cognitoUserService.verifyUser(req.body, data => {
    res.send(data);
  });
});

/* User Login. */
router.post("/login", (req, res) => {
  console.log(JSON.stringify (req.body))
  cognitoUserService.login(req.body, data => {
    res.send(data);
  });
});

/* API to change the user password*/
router.put("/change-password", (req, res) => {
  cognitoUserService.changePassword(req.body, data => {
    res.send(data);
  });
});

/**API to send request for forgot password... */
router.post("/forgot-password", (req, res) => {
  cognitoUserService.forgotPassword(req.body, data => {
    res.send(data);
  });
});

router.put("/reset-password", (req, res) => {
  cognitoUserService.resetPassword(req.body, data => {
    res.send(data);
  });
});

module.exports = router;
