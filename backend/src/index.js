const express = require('express');
const routes = require('./routes/routes');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const mongoose = require('mongoose');
const passportSetup = require('../config/passport-setup');
const keys = require('../config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = new express();

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge : 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.key, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(3000);