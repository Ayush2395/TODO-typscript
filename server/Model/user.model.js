const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

userSchema.statics.signup = async function (email, password) {
  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already exists, try to login");
  }

  if (!validator.default.isEmail(email)) {
    throw Error("Invalid Email");
  }

  if (!validator.default.isStrongPassword(password)) {
    throw Error("Your password is too weak");
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("This email id is not registered");
  }

  if (!validator.default.isEmail(email)) throw Error("Invalid email");

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw Error("Wrong password, please try again");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
