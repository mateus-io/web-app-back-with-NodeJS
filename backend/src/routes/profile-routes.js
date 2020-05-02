const { Router } = require('express');

const routes = new Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        //if user is not logged in
        res.redirect('/auth/login');
    }
    else{
        //if logged in 
        next();
    }
}

routes.get('/', authCheck, (req, res) => {
    res.send("You are logged in success into website and your user is " + req.user.username);
});

module.exports = routes;