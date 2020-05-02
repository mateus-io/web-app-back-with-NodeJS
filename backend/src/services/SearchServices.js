const Student = require('../models/Student');

const ParseStringToArray = require('../utils/ParseStringToArray');

module.exports = {
    async searchStudents(req, res){
        
        const { latitude, longitude, courses } = req.query;

        const coursesArray = ParseStringToArray(courses);

        const students = await Student.find({
            course_of_preference : {
                $in : coursesArray,
            },
            location : {
                $near : {
                    $geometry : {
                        type : 'Point',
                        coordinates : [longitude, latitude],
                    },
                    $maxDistance : 10000,
                },
            },
        });

        return res.json(students);
    }
}