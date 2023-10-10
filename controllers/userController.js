const usermodel = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await usermodel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await usermodel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    const newtoken = jwt.sign(
      { email: createUser.email, id: createUser._id },
      SECRET_KEY
    );
    res.status(200).json({ user: createUser, token: newtoken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

const signin = (req, res) => {};

module.exports = { signup, signin };
