const Student = require('../models/Student');

module.exports = async (username) => {
    return await Student.findOne( { username } );
}