const express = require('express');
const routes = require('./routes/routes');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const mongoose = require('mongoose');
const passportSetup = require('../config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const { setupWebSocket } = require('../config/webSocket');

const http = require('http');
const app = express();
const server = http.Server(app);
setupWebSocket(server);

require('../config/getEnv');

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge : 24 * 60 * 60 * 1000,
    keys: '[keys.session.cookieKey]',
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_DB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

server.listen(8383);
