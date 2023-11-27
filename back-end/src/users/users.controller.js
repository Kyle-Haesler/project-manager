const usersService = require("./users.service");

// VALIDATION: All validation related functions will be denoted with a "v" followed by a one-word description of where they are used

// vSignUp - General
function allFieldsValid(req, res, next) {
  const { data } = req.body;
  if (
    !data ||
    Object.keys(data).length === 0 ||
    Object.keys(data).length !== 3
  ) {
    return next({
      status: 400,
      message:
        "Data object empty or does not include required fields. These fields are 'user', 'user_name', and 'password'",
    });
  }
  const { name, user_name, password } = data;
  if (!name) {
    return next({
      status: 400,
      message: "Name field is missing or blank",
    });
  }
  if (!user_name) {
    return next({
      status: 400,
      message: "User Name field is missing or blank",
    });
  }
  if (!password) {
    return next({
      status: 400,
      message: "Password field is missing or blank",
    });
  }
  next();
}
// vSignUp - name length
function signUpNameLengthAcceptable(req, res, next) {
  const { name } = req.body.data;
  if (name.length < 2) {
    return next({
      status: 400,
      message: "Name field must be atleast 2 characters in length",
    });
  }
  next();
}
// vSignUp - user_name includes '@' and '.'
function signUpUserNameValid(req, res, next) {
  const { user_name } = req.body.data;
  if (!user_name.includes("@") || !user_name.includes(".")) {
    return next({
      status: 400,
      message:
        "User Name must have valid email address syntax (includes @ and .)",
    });
  }
  next();
}
// vSignUp - user_name is open and available
async function signUpUserNameAvailable(req, res, next) {
  const { user_name } = req.body.data;
  const data = await usersService.read(user_name);
  if (data) {
    return next({
      status: 400,
      message: `User Name: ${user_name} is already in use. Please log in, or sign up with a different account`,
    });
  }
  next();
}
// vSignUp - password is atleast 7 characters
function signUpPasswordLengthAcceptable(req, res, next) {
  const { password } = req.body.data;
  if (password.length < 7) {
    return next({
      status: 400,
      message: "Your password must be atleast 7 characters in length",
    });
  }
  next();
}

// vUserLogin - make sure both the user_name and password are correct
async function validateUserLogin(req, res, next) {
  const { user_name, password } = req.params;
  const data = await usersService.login(user_name, password);
  if (!data) {
    return next({
      status: 400,
      message:
        "Username or password is invalid. Please try again or sign up if you don't have an account",
    });
  }
  res.locals.user = data;
  next();
}
// vRead
async function userNameExists(req, res, next) {
  const { user_name } = req.params;
  const data = await usersService.read(user_name);
  if (!data) {
    return next({
      message: `Username: ${user_name} does not exist`,
      status: 400,
    });
  }
  res.locals.userInfo = data;
  next();
}
// Traditional Middleware functions
function read(req, res, next) {
  const data = res.locals.userInfo;
  res.json({ data });
}
async function login(req, res, next) {
  const data = res.locals.user;
  res.json({ data });
}

async function create(req, res, next) {
  const data = await usersService.create(req.body.data);
  res.json({ data });
}

module.exports = {
  create: [
    allFieldsValid,
    signUpNameLengthAcceptable,
    signUpUserNameValid,
    signUpUserNameAvailable,
    signUpPasswordLengthAcceptable,
    create,
  ],
  read: [userNameExists, read],
  login: [validateUserLogin, login],
};
