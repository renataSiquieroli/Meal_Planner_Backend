const User = require("../schemas/User");
const jwt = require("jsonwebtoken");

//create a token
const createToken = (_id, name) => {
  return jwt.sign({ _id, name }, process.env.SECRET, {
    expiresIn: "1d",
  });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id, user.username);
    const Id = user._id;
    res.status(200).json({ email, token, Id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up user
const signUpUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.signup(email, password, username);
    console.log(user);
    const token = createToken(user._id, user.username);
    const Id = user._id;
    res.status(200).json({ email, token, username, Id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signUpUser };
