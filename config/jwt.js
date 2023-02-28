const jwt = require("jsonwebtoken");
const keys = require("./keys");

const authtoken = (req, res, next) => {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, keys.jwt.ACESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const createtoken = (username) => {
  const nameobj = {
    name: username,
  };
  return (webtoken = jwt.sign(nameobj, keys.jwt.ACESS_TOKEN_SECRET));
};

module.exports = { authtoken, createtoken };
