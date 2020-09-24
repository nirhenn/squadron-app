const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.family_name = !isEmpty(data.family_name) ? data.family_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  
  // Family Name checks
  if (Validator.isEmpty(data.family_name)) {
    errors.family_name = "Family Name field is required";
  }
  
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  
  // Phone checks
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  } else if (!Validator.isPhone(data.phone)) {
    errors.phone = "Phone is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  // Address Name checks
  if (Validator.isEmpty(data.faddress)) {
    errors.faddress = "Address field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};