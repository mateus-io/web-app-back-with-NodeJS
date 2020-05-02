const mongoose = require('mongoose');

const PointSchema = require("./utils/PointSchema");

const StudentSchema = new mongoose.Schema({
    studentID: String,
    name: String,
    username: String,
    password: String,
    bio: String,
    avatar_url: String,
    github_username: String,
    course_of_preference: [String],
    location: {
        type : PointSchema,
        index : "2dsphere"
    }
});

module.exports = mongoose.model('Student', StudentSchema);