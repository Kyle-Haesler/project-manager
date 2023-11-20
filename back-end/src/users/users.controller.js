const usersService = require("./users.service");

// VALIDATION: All validation related functions will be denoted with a "v" followed by a one-word description of where they are used

// vSignUp - General
const fields = ["name", "user_name", "password"];
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
        "Data object empty or includes more than required fields. These fields are 'user', 'user_name', and 'password'",
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

async function read(req, res, next) {
  const { user_name } = req.params;

  const data = await usersService.read(user_name);
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
    create,
  ],
  read,
};
