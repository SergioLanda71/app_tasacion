const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res, next) => {
  try {
    const { nombre_completo, email_corporativo, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      nombre_completo,
      email_corporativo,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email_corporativo, password } = req.body;
    const user = await User.findOne({ where: { email_corporativo } });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
