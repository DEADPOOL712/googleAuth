const router = require("express").Router();
const jwtconfig = require("../config/jwt");

router.get("/", jwtconfig.authtoken, (req, res) => {
  res.json({ data: "API data", info: req.user });
});

module.exports = router;
