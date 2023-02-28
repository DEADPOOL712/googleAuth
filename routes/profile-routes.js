const router = require("express").Router();

// this function prevent unauthenticated user to access /profie route
const authcheck = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.redirect("/auth/login");
  }
};

router.get("/", authcheck, (req, res) => {
  res.render("profile", {
    displayName: req.user.username,
    apitoken: req.user.acessToken,
  });
});

module.exports = router;
