const Student = require('../models/Student');

const ParseStringToArray = require('../utils/ParseStringToArray');
const VerifyIfStudentIsPresent = require('../utils/VerifyIfStudentIsPresent');

const axios = require('axios');

module.exports = {
    add : {
        async byGitHub(req, res){
            const { github_username, courses, latitude, longitude } = req.body;
            const coursesArray = ParseStringToArray(courses);
            
            let student = await VerifyIfStudentIsPresent(github_username);//doing search on own database with goal find the user if to find don't add
            if(!student){
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
                const { login, id, avatar_url, bio} = apiResponse.data;
        
                const location = {
                    type : 'Point',
                    coordinates : [longitude, latitude]
                }
        
                //console.log(`login : ${login} id : ${id} avatar : ${avatar_url} bio : ${bio}`);
                student = await Student.create({
                    studentID: id,
                    name: login,
                    username: login,
                    password: "none",
                    bio,
                    avatar_url,
                    github_username : github_username,
                    course_of_preference: coursesArray,
                    location
                });
            }
            return res.json(student);
        },
        bySimpleCredentials(req, res){
            const { username, name, password } = req.body;
            console.log(username);
            new Student({
                studentID: "auto incrementar dps",
                name: name,
                username: username,
                password: password,
                bio: "Insert a little text about you",
                avatar_url: "none",
                github_username: "none",
                course_of_preference: []
            }).save().then( (newStudent) => {
                console.log("new Student created was : " + newStudent);
            });
            return res.json({teste : "deu certo"});
        }
    },
    delete : {
        async oneStudent(req, res) {
            const { username } = req.params;
            const student = await VerifyIfStudentIsPresent(username);
            if(student){
                await Student.deleteOne({
                    username : {
                        $eq : username,
                    }
                });
                return res.status(200).send("Success.");
            }
            return res.status(404).send("Not found");
        }
    },
    update : {
        async oneStudent(req, res){
            const { username } = req.params;
            const { name, bio, avatar_url, courses } = req.body;
            const student = await VerifyIfStudentIsPresent(username);

            const course_of_preference = ParseStringToArray(courses);

            if(student){
                await Student.updateOne( { username } ,{
                    $set : {
                        name,
                        bio,
                        avatar_url,
                        course_of_preference,
                    },
                });
                return res.status(200).json(await VerifyIfStudentIsPresent(username));
            }
            return res.status(404).send('Student not found');
        }
    },
    retrieve : {
        async allStudents(req, res) {
            const students = await Student.find();
            
            return res.json(students);
        },
        async oneStudent(req, res) {
            const { username } = req.params;
            const student = await VerifyIfStudentIsPresent(username);
            if(student){
                return res.status(200).json(student);
            }
            return res.status(404).send("Not found");
        }
    }
};