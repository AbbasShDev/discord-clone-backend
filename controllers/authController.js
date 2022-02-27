const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const userExist = await User.exists({ email: email.toLowerCase() });

    if (userExist) {
      return res.status(409).json({ error: "User is already exists" });
    }

    const hashedPasword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPasword,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return res.status(201).json({
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.status(500).send("Something went wrong!!!");
  }
};

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return res.json({
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.status(500).send("Something went wrong!!!");
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  register,
  login,
  logout,
};
