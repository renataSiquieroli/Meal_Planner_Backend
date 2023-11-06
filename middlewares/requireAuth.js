const jwt = require("jsonwebtoken");
const User = require("../schemas/User");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Not Authorized! Please Login" });
  }
  const token = authorization.split(" ")[1];

  try {
    console.log("$$$$$$$$$", jwt.verify(token, process.env.SECRET));
    const id = jwt.verify(token, process.env.SECRET, function (err, user) {
      if (err) {
        return res.status(403).send("Invalid token");
      }
      return user._id;
    });
    req.user = await User.findOne({ _id: id }).select("_id");
    console.log("USER FROM MIDDLEWARE", req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Not Authorized" });
  }
};

module.exports = requireAuth;
