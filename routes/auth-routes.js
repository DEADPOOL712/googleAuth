const router = require("express").Router();
const passport = require("passport");

// auth login
router.get("/login", (req, res) => {
  res.render("loginpage", { user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  req.logout();
  res.redirect("/");
  // res.send('logging out');
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// google redirected page
router.get(
  "/google/redirected",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/profile");
    // res.send(req.user);
  }
);
module.exports = router;
