const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const googleKeys = require('./keys');
const Student = require('../src/models/Student');

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    Student.findById(id).then( (user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        callbackURL: "/auth/google/redirect",
        clientID: googleKeys.google.clientID,
        clientSecret: googleKeys.google.clientSecret,
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        //to check if user already exist in our database
        Student.findOne({studentID : profile.id}).then( (currentStudent) => {
            if(currentStudent){
                //already have the user
                console.log("Student is : " + currentStudent);
                done(null, currentStudent);
            }
            else{
                //if not, create a new Student in our db
                new Student({
                    studentID: profile.id,
                    name: profile.name.familyName,
                    username: profile.displayName,
                    bio: "Insert a little text about you",
                    avatar_url: profile.photos[0].value,
                    course_of_preference: [],
                    github_username: "none",
                    password: "none" 
                }).save().then( (newStudent) => {
                    console.log("new Student created was : " + newStudent);
                    done(null, newStudent);
                });
            }
        })
        
    })
);
