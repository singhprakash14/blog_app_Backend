const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Joi = require("joi");

async function registerUser(name, email, password) {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
  email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ name, email, password });
    if (error) {
      throw new Error(error.details[0].message);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function loginUser(email, password) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
};
