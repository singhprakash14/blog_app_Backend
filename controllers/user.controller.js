const userService = require("../services/user.service");

exports.register = async (req, res) => {
  try {
    const {name, email, password } = req.body;
    await userService.registerUser(name,email, password);
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
