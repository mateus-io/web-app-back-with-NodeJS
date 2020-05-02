const { Router } = require('express');
const passport = require('passport');

const authRoutes = new Router();

authRoutes.get("/login", (req, res) => {
    res.render("login");
});

authRoutes.get("/logout", (req, res) => {
    // handle with passport
    req.logout();
    //res.redirect('home'); the front end gonna care of this
});

authRoutes.get("/google/redirect", passport.authenticate('google'), (req, res) => {
    res.redirect("/profile/");
});

authRoutes.get("/google", passport.authenticate('google', {
    scope: ['profile']
}));

module.exports = authRoutes;











