const async = require("async");
// const auth = require("../auth/auth.service");
const util = require("../Utilities/util");
const CongnitoUserDAO = require("../DAO/congnitoUserDAO");

/* API to signup new user */
let signup = async (data, callback) => {
  if (!data.email || !data.phone || !data.password) {
    callback({
      statusCode: util.statusCode.FOUR_ZERO_ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING
    });
    return;
  } else {
    try {
      let userData = {
        name: data.name,
        family_name: data.family_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        address: data.address,
        status: true
      };
      const addUser = await CongnitoUserDAO.createUser(userData);
      if (addUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.USER_REGISTERED_SUCCESSFULLY,
          result : addUser
        });
        return;
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: util.statusMessage.SERVER_BUSY
        });
        return;
      }
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_FOUR,
        statusMessage: error.message
      });
      return;
    }
  }
};
//_
/** API to verify user... */
let verifyUser = async (data, callback) => {
  if (!data.email) {
    callback({
      statusCode: util.statusCode.ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING
    });
    return;
  } else {
    try {
      let userData = {email:data.email,token:data.token}
      const authenticateUser = await CongnitoUserDAO.verifyUser(userData);
      if (authenticateUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.SUCESSFULLY_VERIFIED,
          result: authenticateUser
        });
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: util.statusMessage.ENTER_VALID_PASS
        });
      }
      return;
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: error.message
      });
      return;
    }
  }
};

// /* API to login user */
let login = async (data, callback) => {
  if (!data.email || !data.password) {
    callback({
      statusCode: util.statusCode.ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING
    });
    return;
  } else {
    try {
      let criteria = { Username: data.email, password: data.password };
      const checkUser = await CongnitoUserDAO.fetchUser(criteria);
      if (checkUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.LOGGED_IN,
          result: checkUser
        });
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: util.statusMessage.ENTER_VALID_PASS
        });
      }
      return;
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: error
      });
      return;
    }
  }
};

/** API to Change the user password */
let changePassword = async (data, callback) => {
  if (!data.email) {
    callback({
      statusCode: util.statusCode.ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING
    });
    return;
  } else {
    try {
      let criteria = { username: data.email, newPassword: data.newPassword, oldPassword: data.oldPassword };
      const checkUser = await CongnitoUserDAO.changePassword(criteria);
      if (checkUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.PASSWORD_CHANGED,
          result: checkUser
        });
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: util.statusMessage.ENTER_VALID_PASS
        });
      }
      return;
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: error.message
      });
      return;
    }
  }
};

/**API for forgot password */
let forgotPassword = async (data, callback) => {
  if (!data.email) {
    callback({
      statusCode: util.statusCode.ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING
    });
    return;
  } else {
    try {
      let criteria = { username: data.email };
      const checkUser = await CongnitoUserDAO.forgotPassword(criteria);
      if (checkUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.MAIL_SENT_FORGOT_PASSWORD,
          result: checkUser
        });
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: "FAILED"
        });
      }
      return;
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: error.message
      });
      return;
    }
  }
};

/**API to reset password */
let resetPassword = async (data, callback) => {
  if (!data.email) {
    callback({
      statusCode: util.statusCode.ONE,
      statusMessage: util.statusMessage.PARAMS_MISSING
    });
    return;
  } else {
    try {
      let criteria = { token: data.token,password:data.password,username:data.email };
      const checkUser = await CongnitoUserDAO.resetPassword(criteria);
      if (checkUser) {
        callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.SUCCESS,
          result: checkUser
        });
      } else {
        callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: "FAILED"
        });
      }
      return;
    } catch (error) {
      callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: error.message
      });
      return;
    }
  }
};


module.exports = {
  signup: signup,
  login: login,
  verifyUser:verifyUser,
  changePassword:changePassword,
  forgotPassword:forgotPassword,
  resetPassword : resetPassword
};
